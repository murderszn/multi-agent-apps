// A quiet, procedural sunset behind the reader. The CSS background remains the fallback.
(() => {
  const canvas = document.getElementById('ambientCanvas');
  const app = document.getElementById('app');
  const gl = canvas?.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
  if (!gl) { if (canvas) canvas.hidden = true; return; }

  const vertex = `
    attribute vec2 position;
    void main() { gl_Position = vec4(position, 0.0, 1.0); }
  `;
  const fragment = `
    precision mediump float;
    uniform vec2 resolution;
    uniform float time;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                 mix(hash(i + vec2(0.0, 1.0)), hash(i + 1.0), f.x), f.y);
    }
    float fbm(vec2 p) {
      float value = 0.0;
      float weight = .55;
      for (int i = 0; i < 4; i++) {
        value += weight * noise(p);
        p = p * 2.03 + vec2(13.2, 7.4);
        weight *= .5;
      }
      return value;
    }
    float glow(float d, float width) {
      return exp(-pow(d / width, 2.0));
    }
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution;
      float aspect = resolution.x / resolution.y;
      vec2 p = vec2((uv.x - .5) * aspect, uv.y - .5);
      float t = time * .26;

      // Domain warping makes the saturated bands fold and flow like liquid light.
      float fold = fbm(uv * vec2(2.3, 2.0) + vec2(t * .28, -t * .14));
      float detail = fbm(uv * vec2(3.8, 3.0) + vec2(-t * .19, t * .17) + fold * 1.3);
      float wave = uv.y + .24 * (fold - .5) + .085 * sin(uv.x * 7.0 + detail * 5.0 + t);

      vec3 midnight = vec3(.055, .018, .16);
      vec3 violet = vec3(.42, .08, .74);
      vec3 fuchsia = vec3(.98, .075, .45);
      vec3 coral = vec3(1.0, .37, .42);
      vec3 cyan = vec3(.27, .90, 1.0);
      vec3 color = mix(midnight, violet, .36 + .24 * smoothstep(.08, .85, uv.y));

      float sunset = glow(wave - .40, .22);
      color = mix(color, fuchsia, sunset * .88);
      color = mix(color, coral, glow(wave - .32, .095) * .74);
      color = mix(color, violet, glow(wave - .67, .22) * .66);

      // Multiple broad curtains and fine filaments give the glow a sense of depth.
      float curtain = sin((uv.x * 1.6 + wave * 1.2 + fold * .82 - t * .21) * 12.0);
      float luminous = pow(.5 + .5 * curtain, 4.0) * smoothstep(.19, .43, uv.y);
      color += mix(vec3(.44, .05, .60), cyan, smoothstep(.32, .60, detail)) * luminous * .62;
      float filament = sin((wave + detail * .24 + uv.x * .14) * 48.0 - t * .34);
      color += mix(fuchsia, cyan, smoothstep(.36, .8, fold))
             * pow(max(filament, 0.0), 14.0) * .16;
      float cyanSeam = glow(sin((wave + detail * .18) * 17.0 - t * .42) - .93, .07);
      color += cyan * cyanSeam * smoothstep(.46, .83, uv.y) * .13;

      // A winding trace ties the new flow back to the sunset-road inspiration.
      float trailX = .53 - .21 * sin((.41 - uv.y) * 8.0 + fold * .55 + t * .20);
      float trail = glow(uv.x - trailX, .006 + .018 * (1.0 - uv.y))
                  * (1.0 - smoothstep(.28, .54, uv.y));
      color += mix(fuchsia, coral, .52) * trail * .40;

      // Keep the exact reading position quiet, while the color blooms around it.
      float readingZone = exp(-pow(p.x / .52, 2.0) - pow(p.y / .22, 2.0));
      color = mix(color, vec3(.105, .045, .245), readingZone * .88);
      color *= 1.0 - .14 * smoothstep(.38, 1.15, length(vec2(p.x * .8, p.y)));
      color += (hash(gl_FragCoord.xy) - .5) * .010;
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  function shader(type, source) {
    const item = gl.createShader(type);
    gl.shaderSource(item, source);
    gl.compileShader(item);
    if (!gl.getShaderParameter(item, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(item));
    return item;
  }

  try {
    const program = gl.createProgram();
    gl.attachShader(program, shader(gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);
    const corners = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, corners);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, 'resolution');
    const time = gl.getUniformLocation(program, 'time');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let elapsed = 0;
    let last = 0;
    let drawn = 0;

    function frame(now) {
      requestAnimationFrame(frame);
      if (document.hidden) { last = now; return; }
      const moving = !reduceMotion.matches && !app.classList.contains('playing');
      if (moving) elapsed += Math.min((now - (last || now)) / 1000, .1);
      last = now;
      if (now - drawn < (moving ? 50 : 500)) return;
      drawn = now;
      const rect = canvas.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 1.25, 1600 / Math.max(rect.width, 1));
      const width = Math.max(1, Math.round(rect.width * scale));
      const height = Math.max(1, Math.round(rect.height * scale));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      gl.uniform2f(resolution, width, height);
      gl.uniform1f(time, elapsed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    requestAnimationFrame(frame);
  } catch (error) {
    console.warn('Ambient background unavailable:', error);
    canvas.hidden = true;
  }
})();
