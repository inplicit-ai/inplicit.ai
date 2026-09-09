/**
 * createImplicitOrb — vanilla-WebGL port of the dashboard's AgentOrb
 * (inplicit-dashboard/components/AgentOrb.tsx, OGL-based) for the static
 * Astro marketing site. No imports, no build step, no dependencies.
 *
 * GLSL is verbatim from AgentOrb.tsx. The OGL plumbing is replicated exactly:
 *   - WebGL2 context first, WebGL1 fallback (OGL Renderer default, webgl: 2)
 *   - context attrs { alpha: true, premultipliedAlpha: false, antialias: true,
 *     depth: true, stencil: false } (AgentOrb.tsx:204-209 + OGL defaults)
 *   - fullscreen triangle: position (-1,-1)(3,-1)(-1,3), uv (0,0)(2,0)(0,2)
 *     (ogl/src/extras/Triangle.js)
 *   - blending DISABLED at draw time. AgentOrb enables BLEND on the raw
 *     context, but OGL's Program.applyState() disables it again because the
 *     Program is not flagged `transparent` (ogl Program.js:150-151). The
 *     shader's own premultiplied output (col.rgb * col.a) is what produces
 *     the soft edge, composited by the browser as straight alpha.
 *   - backing store = cssSize * dpr * dpr. AgentOrb passes w * dpr into
 *     OGL's setSize, which multiplies by dpr again (AgentOrb.tsx:247 +
 *     ogl Renderer.js:119). The product therefore supersamples at dpr^2;
 *     replicated here for identical edge smoothness.
 *
 * Idle animation (what moves at audio level 0): iTime drives the simplex-
 * noise rim wobble, the color sweep between purple/cyan, and the orbiting
 * highlight; `rot` additionally spins the whole field at 0.3 rad/s
 * (AgentOrb.tsx:269,278). Level only ADDS rotation speed + hover warp.
 *
 * Usage:
 *   const orb = createImplicitOrb(canvas);            // hue 28, level 0
 *   const orb = createImplicitOrb(canvas, { breathe: true }); // preflight look
 *   orb.start(); orb.stop(); orb.destroy();
 *   if (!orb.supported) { show CSS fallback }         // canvas left untouched
 *
 * Size the canvas with CSS (e.g. width/height 160px desktop, 120px mobile —
 * the interview room's ORB_DESKTOP/ORB_MOBILE, InterviewRoom.tsx:67-68).
 */
function createImplicitOrb(canvas, options) {
  "use strict";
  var opts = options || {};
  // Defaults mirror AgentOrb props (AgentOrb.tsx:179-186).
  var hue = typeof opts.hue === "number" ? opts.hue : 28;
  var maxRotationSpeed =
    typeof opts.maxRotationSpeed === "number" ? opts.maxRotationSpeed : 1.2;
  var maxHoverIntensity =
    typeof opts.maxHoverIntensity === "number" ? opts.maxHoverIntensity : 0.8;
  // Pinned idle audio level. 0 = interview room at rest. With
  // { breathe: true } the level replicates the pre-call "alive & ready"
  // breathe: 0.12 + 0.05 * sin(t / 900) (PreflightCard.tsx:24).
  var constantLevel = typeof opts.level === "number" ? opts.level : 0;
  var breathe = opts.breathe === true;

  var BASE_ROTATION = 0.3; // rad/s, AgentOrb.tsx:269

  var VERT = [
    "precision highp float;",
    "attribute vec2 position;",
    "attribute vec2 uv;",
    "varying vec2 vUv;",
    "void main() {",
    "  vUv = uv;",
    "  gl_Position = vec4(position, 0.0, 1.0);",
    "}",
  ].join("\n");

  // Verbatim fragment shader from AgentOrb.tsx:32-166.
  var FRAG = [
    "precision highp float;",
    "",
    "uniform float iTime;",
    "uniform vec3 iResolution;",
    "uniform float hue;",
    "uniform float hover;",
    "uniform float rot;",
    "uniform float hoverIntensity;",
    "varying vec2 vUv;",
    "",
    "vec3 rgb2yiq(vec3 c) {",
    "  float y = dot(c, vec3(0.299, 0.587, 0.114));",
    "  float i = dot(c, vec3(0.596, -0.274, -0.322));",
    "  float q = dot(c, vec3(0.211, -0.523, 0.312));",
    "  return vec3(y, i, q);",
    "}",
    "vec3 yiq2rgb(vec3 c) {",
    "  float r = c.x + 0.956 * c.y + 0.621 * c.z;",
    "  float g = c.x - 0.272 * c.y - 0.647 * c.z;",
    "  float b = c.x - 1.106 * c.y + 1.703 * c.z;",
    "  return vec3(r, g, b);",
    "}",
    "vec3 adjustHue(vec3 color, float hueDeg) {",
    "  float hueRad = hueDeg * 3.14159265 / 180.0;",
    "  vec3 yiq = rgb2yiq(color);",
    "  float cosA = cos(hueRad);",
    "  float sinA = sin(hueRad);",
    "  float i = yiq.y * cosA - yiq.z * sinA;",
    "  float q = yiq.y * sinA + yiq.z * cosA;",
    "  yiq.y = i;",
    "  yiq.z = q;",
    "  return yiq2rgb(yiq);",
    "}",
    "vec3 hash33(vec3 p3) {",
    "  p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));",
    "  p3 += dot(p3, p3.yxz + 19.19);",
    "  return -1.0 + 2.0 * fract(vec3(",
    "    p3.x + p3.y, p3.x + p3.z, p3.y + p3.z",
    "  ) * p3.zyx);",
    "}",
    "float snoise3(vec3 p) {",
    "  const float K1 = 0.333333333;",
    "  const float K2 = 0.166666667;",
    "  vec3 i = floor(p + (p.x + p.y + p.z) * K1);",
    "  vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);",
    "  vec3 e = step(vec3(0.0), d0 - d0.yzx);",
    "  vec3 i1 = e * (1.0 - e.zxy);",
    "  vec3 i2 = 1.0 - e.zxy * (1.0 - e);",
    "  vec3 d1 = d0 - (i1 - K2);",
    "  vec3 d2 = d0 - (i2 - K1);",
    "  vec3 d3 = d0 - 0.5;",
    "  vec4 h = max(0.6 - vec4(",
    "    dot(d0, d0), dot(d1, d1), dot(d2, d2), dot(d3, d3)",
    "  ), 0.0);",
    "  vec4 n = h * h * h * h * vec4(",
    "    dot(d0, hash33(i)),",
    "    dot(d1, hash33(i + i1)),",
    "    dot(d2, hash33(i + i2)),",
    "    dot(d3, hash33(i + 1.0))",
    "  );",
    "  return dot(vec4(31.316), n);",
    "}",
    "vec4 extractAlpha(vec3 c) {",
    "  float a = max(max(c.r, c.g), c.b);",
    "  return vec4(c.rgb / (a + 1e-5), a);",
    "}",
    "",
    "const vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);",
    "const vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);",
    "const vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);",
    "const float innerRadius = 0.6;",
    "const float noiseScale = 0.65;",
    "",
    "float light1(float intensity, float attenuation, float dist) {",
    "  return intensity / (1.0 + dist * attenuation);",
    "}",
    "float light2(float intensity, float attenuation, float dist) {",
    "  return intensity / (1.0 + dist * dist * attenuation);",
    "}",
    "",
    "vec4 draw(vec2 uv) {",
    "  vec3 color1 = adjustHue(baseColor1, hue);",
    "  vec3 color2 = adjustHue(baseColor2, hue);",
    "  vec3 color3 = adjustHue(baseColor3, hue);",
    "",
    "  float ang = atan(uv.y, uv.x);",
    "  float len = length(uv);",
    "  float invLen = len > 0.0 ? 1.0 / len : 0.0;",
    "",
    "  float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;",
    "  float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);",
    "  float d0 = distance(uv, (r0 * invLen) * uv);",
    "  float v0 = light1(1.0, 10.0, d0);",
    "  v0 *= smoothstep(r0 * 1.05, r0, len);",
    "  float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;",
    "",
    "  float a = iTime * -1.0;",
    "  vec2 pos = vec2(cos(a), sin(a)) * r0;",
    "  float d = distance(uv, pos);",
    "  float v1 = light2(1.5, 5.0, d);",
    "  v1 *= light1(1.0, 50.0, d0);",
    "",
    "  float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);",
    "  float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);",
    "",
    "  vec3 col = mix(color1, color2, cl);",
    "  col = mix(color3, col, v0);",
    "  col = (col + v1) * v2 * v3;",
    "  col = clamp(col, 0.0, 1.0);",
    "  return extractAlpha(col);",
    "}",
    "",
    "vec4 mainImage(vec2 fragCoord) {",
    "  vec2 center = iResolution.xy * 0.5;",
    "  float size = min(iResolution.x, iResolution.y);",
    "  vec2 uv = (fragCoord - center) / size * 2.0;",
    "",
    "  float angle = rot;",
    "  float s = sin(angle);",
    "  float c = cos(angle);",
    "  uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);",
    "",
    "  uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);",
    "  uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);",
    "",
    "  return draw(uv);",
    "}",
    "",
    "void main() {",
    "  vec2 fragCoord = vUv * iResolution.xy;",
    "  vec4 col = mainImage(fragCoord);",
    "  gl_FragColor = vec4(col.rgb * col.a, col.a);",
    "}",
  ].join("\n");

  // Inert stub: leaves the canvas untouched (transparent) so the caller's
  // CSS fallback can take over.
  function unsupportedStub() {
    return {
      supported: false,
      running: false,
      start: function () {},
      stop: function () {},
      destroy: function () {},
    };
  }

  if (!canvas || typeof canvas.getContext !== "function") {
    return unsupportedStub();
  }

  // Same context attributes OGL's Renderer builds from AgentOrb's options
  // (alpha/antialias/premultipliedAlpha explicit; depth true, stencil false,
  // preserveDrawingBuffer false are OGL defaults).
  var attrs = {
    alpha: true,
    depth: true,
    stencil: false,
    antialias: true,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    powerPreference: "default",
  };

  var gl = null;
  try {
    gl = canvas.getContext("webgl2", attrs);
    if (!gl) gl = canvas.getContext("webgl", attrs);
    if (!gl) gl = canvas.getContext("experimental-webgl", attrs);
  } catch (e) {
    gl = null;
  }
  if (!gl) return unsupportedStub();

  function compile(type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      var log = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error("Orb shader compile failed: " + log);
    }
    return shader;
  }

  var program = null;
  var positionBuffer = null;
  var uvBuffer = null;
  var loc = null;

  try {
    var vs = compile(gl.VERTEX_SHADER, VERT);
    var fs = compile(gl.FRAGMENT_SHADER, FRAG);
    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    // Shader objects can be flagged for deletion once linked.
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error("Orb program link failed: " + gl.getProgramInfoLog(program));
    }
    gl.useProgram(program);

    // Fullscreen triangle, exactly OGL's Triangle geometry.
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    var positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 0, 2, 0, 0, 2]),
      gl.STATIC_DRAW
    );
    var uvLoc = gl.getAttribLocation(program, "uv");
    if (uvLoc !== -1) {
      gl.enableVertexAttribArray(uvLoc);
      gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);
    }

    loc = {
      iTime: gl.getUniformLocation(program, "iTime"),
      iResolution: gl.getUniformLocation(program, "iResolution"),
      hue: gl.getUniformLocation(program, "hue"),
      hover: gl.getUniformLocation(program, "hover"),
      rot: gl.getUniformLocation(program, "rot"),
      hoverIntensity: gl.getUniformLocation(program, "hoverIntensity"),
    };

    // GL state exactly as OGL leaves it at draw time (Program.applyState):
    // depth test on (LEQUAL, mask on), back-face culling on (CCW front),
    // blending OFF — the shader's premultiplied output is the transparency.
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.depthMask(true);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    gl.disable(gl.BLEND);
  } catch (e) {
    if (typeof console !== "undefined" && console.error) {
      console.error("Implicit orb init failed:", e);
    }
    try {
      if (program) gl.deleteProgram(program);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (uvBuffer) gl.deleteBuffer(uvBuffer);
      var lose = gl.getExtension("WEBGL_lose_context");
      if (lose) lose.loseContext();
    } catch (e2) {
      /* ignore cleanup failure */
    }
    return unsupportedStub();
  }

  function clamp01(n) {
    if (typeof n !== "number" || n !== n || !isFinite(n)) return 0;
    if (n < 0) return 0;
    if (n > 1) return 1;
    return n;
  }

  function currentLevel() {
    if (breathe) {
      // PreflightCard.tsx:24 — pre-call idle breathe.
      return clamp01(0.12 + 0.05 * Math.sin(performance.now() / 900));
    }
    return clamp01(constantLevel);
  }

  function resize() {
    var cssW = canvas.clientWidth;
    var cssH = canvas.clientHeight;
    if (cssW === 0 || cssH === 0) return;
    var dpr = window.devicePixelRatio || 1;
    // Faithful to the product: AgentOrb passes w*dpr to OGL setSize, which
    // multiplies by dpr again — dpr^2 supersampling (see header comment).
    var w = Math.round(cssW * dpr * dpr);
    var h = Math.round(cssH * dpr * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, w, h);
    gl.useProgram(program);
    gl.uniform3f(loc.iResolution, w, h, w / h);
  }

  var rafId = 0;
  var running = false;
  var destroyed = false;
  var currentRot = 0;
  var lastTime = null; // null → first frame after (re)start contributes dt = 0

  function tick(t) {
    if (!running) return;
    rafId = requestAnimationFrame(tick);

    var dt = lastTime === null ? 0 : (t - lastTime) * 0.001;
    lastTime = t;

    // Level→uniform mapping verbatim from AgentOrb.tsx:277-288.
    var level = currentLevel();
    var rotSpeed = BASE_ROTATION + level * maxRotationSpeed * 2.0;
    currentRot += dt * rotSpeed;

    gl.useProgram(program);
    gl.uniform1f(loc.iTime, t * 0.001);
    gl.uniform1f(loc.hue, hue);
    gl.uniform1f(loc.rot, currentRot);
    gl.uniform1f(loc.hover, Math.min(level * 2.0, 1.0));
    gl.uniform1f(
      loc.hoverIntensity,
      Math.min(level * maxHoverIntensity * 0.8, maxHoverIntensity)
    );

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function onResize() {
    resize();
  }

  var ro = null;
  if (typeof ResizeObserver !== "undefined") {
    ro = new ResizeObserver(onResize);
    ro.observe(canvas);
  }
  window.addEventListener("resize", onResize);
  resize();

  return {
    supported: true,
    get running() {
      return running;
    },
    /** Start (or resume) the render loop. Safe to call repeatedly. */
    start: function () {
      if (destroyed || running) return;
      running = true;
      lastTime = null; // avoid a rotation jump across a pause
      resize();
      rafId = requestAnimationFrame(tick);
    },
    /** Pause the render loop (e.g. when scrolled off screen). */
    stop: function () {
      if (!running) return;
      running = false;
      cancelAnimationFrame(rafId);
    },
    /** Tear everything down and release the GL context. */
    destroy: function () {
      if (destroyed) return;
      destroyed = true;
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      if (ro) ro.disconnect();
      try {
        gl.deleteProgram(program);
        gl.deleteBuffer(positionBuffer);
        gl.deleteBuffer(uvBuffer);
        var lose = gl.getExtension("WEBGL_lose_context");
        if (lose) lose.loseContext();
      } catch (e) {
        /* ignore cleanup failure */
      }
    },
  };
}

export { createImplicitOrb };
