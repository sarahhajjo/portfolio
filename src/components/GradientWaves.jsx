import React, { useEffect, useRef } from 'react';

// =====================================================================
//  خلفية Gradient Waves — موجات متدرجة بألوان الثيم وبتتحرك باستمرار
//  WebGL خام (بدون مكتبات) وبتشتغل بدقة أقل عشان تكون خفيفة جداً
// =====================================================================

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform vec3  uBg;      // لون الخلفية  (Midnight Violet)
uniform vec3  uDeep;    // موجة خلفية    (Dusty Lavender)
uniform vec3  uMid;     // موجة وسطى     (Pink Mist مخفّف)
uniform vec3  uGlow;    // توهج الحواف   (Powder Petal)

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

// موجة واحدة: ارتفاع الخط عند x معين
float waveY(float x, float base, float t, float seed) {
    float y = base;
    y += sin(x * 1.6 + t * 0.35 + seed)        * 0.085;
    y += sin(x * 3.1 - t * 0.28 + seed * 1.7)  * 0.045;
    y += sin(x * 5.3 + t * 0.20 + seed * 2.3)  * 0.018;
    return y;
}

void main() {
    vec2  uv = gl_FragCoord.xy / uRes;
    float aspect = uRes.x / uRes.y;
    float x = uv.x * aspect;
    float t = uTime;

    // خلفية: أغمق شوي من فوق، وبتقرب للون الثيم من تحت
    vec3 col = mix(uBg * 0.72, uBg, pow(1.0 - uv.y, 0.8));

    // ---- الطبقة 1 (الأبعد والأعلى): لافندر هادي ----
    float y1 = waveY(x, 0.34, t, 0.0);
    float d1 = uv.y - y1;
    col = mix(col, uDeep, smoothstep(0.30, -0.25, d1) * 0.30);

    // ---- الطبقة 2 (وسط): وردي ناعم ----
    float y2 = waveY(x * 0.9 + 0.8, 0.22, t * 1.1, 2.4);
    float d2 = uv.y - y2;
    col = mix(col, uMid, smoothstep(0.26, -0.22, d2) * 0.16);

    // ---- الطبقة 3 (الأقرب والأسفل): لافندر أغمق يعطي عمق ----
    float y3 = waveY(x * 1.15 + 1.9, 0.10, t * 0.9, 4.1);
    float d3 = uv.y - y3;
    col = mix(col, uDeep * 0.85, smoothstep(0.20, -0.18, d3) * 0.26);

    // توهج رفيع على حافة كل موجة
    col += uGlow * exp(-abs(d1) * 20.0) * 0.05;
    col += uMid  * exp(-abs(d2) * 16.0) * 0.09;
    col += uGlow * exp(-abs(d3) * 24.0) * 0.04;

    // تهدئة الأعلى عشان النصوص تبقى واضحة
    col = mix(col, uBg * 0.80, smoothstep(0.55, 1.0, uv.y) * 0.35);

    // dithering خفيف لمنع تدرّج الألوان من الظهور بخطوط
    col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) / 160.0;

    gl_FragColor = vec4(col, 1.0);
}
`;

// يحوّل لون hex من متغير CSS لـ [r,g,b] بين 0 و 1 (أو يرجع للون احتياطي)
const cssColor = (name, fallbackHex) => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallbackHex;
    let h = raw.replace('#', '');
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    if (!/^[0-9a-f]{6}$/i.test(h)) h = fallbackHex.replace('#', '');
    const n = parseInt(h, 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const hexToRgb = (hex) => {
    const n = parseInt(hex.replace('#', ''), 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const GradientWaves = ({
                           speed = 1,        // سرعة الحركة (1 = عادي، 0.5 = أبطأ)
                           quality = 0.5,    // دقة الرسم (0.5 = نص الدقة وخفيف، 1 = كاملة)
                       }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
        if (!gl) return; // لو WebGL مو متاح بتظهر خلفية CSS الاحتياطية

        const compile = (type, src) => {
            const s = gl.createShader(type);
            gl.shaderSource(s, src);
            gl.compileShader(s);
            if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
                console.error('[GradientWaves] shader error:', gl.getShaderInfoLog(s));
                gl.deleteShader(s);
                return null;
            }
            return s;
        };

        const vs = compile(gl.VERTEX_SHADER, VERT);
        const fs = compile(gl.FRAGMENT_SHADER, FRAG);
        if (!vs || !fs) return;

        const prog = gl.createProgram();
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.error('[GradientWaves] link error:', gl.getProgramInfoLog(prog));
            return;
        }
        gl.useProgram(prog);

        // مثلث واحد يغطي الشاشة كلها
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, 'aPos');
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

        const u = (n) => gl.getUniformLocation(prog, n);
        const uRes = u('uRes'), uTime = u('uTime');
        // ألوان الثيم: من متغيرات CSS إذا موجودة، وإلا من لوحتك مباشرة
        gl.uniform3fv(u('uBg'),   cssColor('--bg-color', '#1F1A38'));
        gl.uniform3fv(u('uDeep'), cssColor('--accent-dark', '#7B506F'));
        gl.uniform3fv(u('uMid'),  cssColor('--accent-light', '#DD99BB'));
        gl.uniform3fv(u('uGlow'), hexToRgb('#EAD7D1'));

        const resize = () => {
            const w = Math.max(2, Math.floor(canvas.clientWidth * quality));
            const h = Math.max(2, Math.floor(canvas.clientHeight * quality));
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }
            gl.viewport(0, 0, w, h);
            gl.uniform2f(uRes, w, h);
        };
        resize();
        window.addEventListener('resize', resize);

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const start = performance.now();
        let raf;

        const draw = (now) => {
            const t = reduceMotion ? 12 : ((now - start) / 1000) * speed;
            gl.uniform1f(uTime, t);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            if (!reduceMotion) raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            gl.deleteProgram(prog);
            gl.deleteShader(vs);
            gl.deleteShader(fs);
            gl.deleteBuffer(buf);
        };
    }, [speed, quality]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
                display: 'block',
                // خلفية احتياطية (تظهر لو WebGL مو شغال)
                background:
                    'radial-gradient(120% 60% at 50% 105%, rgba(123,80,111,0.55) 0%, transparent 70%), var(--bg-color)',
            }}
        />
    );
};

export default GradientWaves;