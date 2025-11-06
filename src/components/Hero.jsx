import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef } from "react";
import Spline from "@splinetool/react-spline";

const ease = [0.22, 1, 0.36, 1];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  // Mouse parallax for content + subtle scene shift (tuned)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const mxSpring = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const mySpring = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });
  const rotateX = useTransform(mySpring, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(mxSpring, [-0.5, 0.5], [-4, 4]);
  const translateX = useTransform(mxSpring, [-0.5, 0.5], [-10, 10]);
  const translateY = useTransform(mySpring, [-0.5, 0.5], [-8, 8]);
  const subtleX = useTransform(mxSpring, [-0.5, 0.5], [-10, 10]);
  const subtleY = useTransform(mySpring, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = useCallback(
    (e) => {
      if (prefersReducedMotion) return;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height; // 0..1
      mx.set(x - 0.5); // -0.5..0.5
      my.set(y - 0.5);
    },
    [mx, my, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const viewport = useMemo(() => ({ once: true, amount: 0.5 }), []);

  // Lightweight particle text background that spells "Beingalive.ai"
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId;
    let particles = [];
    let mouse = { x: 0, y: 0, active: false };

    const resize = () => {
      const el = sectionRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(width, height);
    };

    const initParticles = (width, height) => {
      particles = [];
      if (prefersReducedMotion) {
        ctx.clearRect(0, 0, width, height);
      }
      // Offscreen to rasterize text mask
      const off = document.createElement("canvas");
      const offCtx = off.getContext("2d");
      off.width = Math.max(1, Math.floor(width));
      off.height = Math.max(1, Math.floor(height));
      const isMobile = width < 640;
      const fontSize = Math.min(Math.max(width * 0.12, 44), isMobile ? 78 : 120);
      offCtx.clearRect(0, 0, off.width, off.height);
      offCtx.fillStyle = "#000";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.font = `700 ${fontSize}px Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial`;
      const text = "Beingalive.ai";
      offCtx.fillText(text, off.width / 2, off.height / 2);

      const step = isMobile ? 6 : 5; // sampling grid
      const maxParticles = isMobile ? 600 : 1400;
      const data = offCtx.getImageData(0, 0, off.width, off.height).data;

      const targets = [];
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          const idx = (y * off.width + x) * 4 + 3; // alpha channel
          if (data[idx] > 128) {
            targets.push({ x, y });
          }
        }
      }
      // Sample down to maxParticles evenly
      const stride = Math.max(1, Math.floor(targets.length / maxParticles));
      const chosen = targets.filter((_, i) => i % stride === 0);

      // Initialize particles scattered
      for (let i = 0; i < chosen.length; i++) {
        const t = chosen[i];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: 0,
          tx: t.x,
          ty: t.y,
          size: Math.random() * 1.2 + 0.6,
          hue: 200 + Math.random() * 70, // blue-purple range
        });
      }
      if (prefersReducedMotion) {
        drawStatic(width, height);
      }
    };

    const drawStatic = (width, height) => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, 0.9)`;
        ctx.arc(p.tx, p.ty, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      const el = sectionRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // spring to target
        const ax = (p.tx - p.x) * 0.045;
        const ay = (p.ty - p.y) * 0.045;
        p.vx = (p.vx + ax) * 0.88;
        p.vy = (p.vy + ay) * 0.88;

        // gentle mouse repel/attract
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.max(12, Math.hypot(dx, dy));
          const force = Math.min(120, 2200 / (d * d));
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 6);
        grad.addColorStop(0, `hsla(${p.hue}, 90%, 65%, 0.95)`);
        grad.addColorStop(1, `hsla(${p.hue + 40}, 90%, 55%, 0.0)`);
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.size + 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onPointerLeave = () => (mouse.active = false);

    resize();
    if (!prefersReducedMotion) {
      tick();
      window.addEventListener("resize", resize);
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[86vh] md:h-[92vh] overflow-hidden"
      id="home"
    >
      {/* Full-width Spline background */}
      <motion.div
        style={prefersReducedMotion ? undefined : { x: subtleX, y: subtleY }}
        className="absolute inset-0"
      >
        <Spline
          scene="https://prod.spline.design/QrI46EbSvyxcmozb/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </motion.div>

      {/* Particle text canvas overlay (non-blocking) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none mix-blend-screen"
      />

      {/* Gradient overlays (non-blocking for interactions) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white/40" />
        {/* Aura glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vmin] h-[95vmin] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.26),rgba(59,130,246,0.18)_45%,rgba(147,51,234,0.14)_70%,transparent_76%)] blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          style={prefersReducedMotion ? undefined : { rotateX, rotateY, x: translateX, y: translateY }}
          className="max-w-3xl"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200/60 bg-white/60 backdrop-blur px-3 py-1 text-xs font-medium text-gray-700 shadow-sm"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live 3D • AI-guided practice
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight"
          >
            Bring yoga to life with an AI avatar coach
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 md:mt-6 text-base md:text-xl text-gray-700 max-w-2xl"
          >
            beingalive.ai blends a lifelike 3D model with posture guidance and breath-paced flows, so practice feels intuitive, safe, and deeply human.
          </motion.p>

          <motion.div variants={item} className="mt-7 md:mt-8 flex flex-wrap items-center gap-3">
            <motion.a
              href="#demo"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ ease, duration: 0.2 }}
              className="inline-flex items-center justify-center rounded-full bg-gray-900 text-white px-6 py-3 text-sm font-medium shadow-lg shadow-gray-900/10"
            >
              Watch demo
            </motion.a>
            <motion.a
              href="#cta"
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
              transition={{ ease, duration: 0.2 }}
              className="inline-flex items-center justify-center rounded-full bg-white text-gray-900 px-6 py-3 text-sm font-medium border border-gray-200 shadow-sm"
            >
              Start free
            </motion.a>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs text-gray-500"
            >
              No card required
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Floating badges */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: [0, -8, 0], opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={prefersReducedMotion ? undefined : { x: subtleX, y: subtleY }}
            className="hidden md:flex items-center gap-2 absolute right-[8%] top-[28%] rounded-2xl border border-gray-200 bg-white/80 backdrop-blur px-4 py-3 shadow-md"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-sm text-gray-800 font-medium">Posture aligned</span>
          </motion.div>

          <motion.div
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: [-6, 0, -6], opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            style={prefersReducedMotion ? undefined : { x: subtleX, y: subtleY }}
            className="hidden md:flex items-center gap-2 absolute left-[10%] bottom-[18%] rounded-2xl border border-gray-200 bg-white/80 backdrop-blur px-4 py-3 shadow-md"
          >
            <span className="text-sm text-gray-800 font-medium">Breathe in • 4</span>
          </motion.div>
        </div>

        {/* Circular video spotlight with pulse + responsive placement */}
        <motion.div
          aria-hidden
          className="absolute pointer-events-none left-1/2 -translate-x-1/2 bottom-8 md:bottom-auto md:left-auto md:translate-x-0 md:right-8 md:top-24"
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          style={prefersReducedMotion ? undefined : { x: subtleX, y: subtleY }}
        >
          <motion.div
            className="relative rounded-full shadow-2xl w-40 h-40 md:w-56 md:h-56"
            animate={prefersReducedMotion ? undefined : { y: [0, -14, 0], rotate: [0, -1.2, 0] }}
            transition={prefersReducedMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Soft shadow pulse (beat) */}
            {!prefersReducedMotion && (
              <motion.div
                className="absolute -z-[1] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: "130%", height: "130%", background: "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 35%, transparent 70%)", filter: "blur(12px)" }}
                animate={{ scale: [1, 1.06, 1], opacity: [0.55, 0.8, 0.55] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            {/* Animated ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, #ef4444, #f59e0b, #ef4444)",
                animation: "spin 12s linear infinite",
                WebkitMask: "radial-gradient(circle, black calc(50% - 4px), transparent calc(50% - 3px))",
                mask: "radial-gradient(circle, black calc(50% - 4px), transparent calc(50% - 3px))",
                filter: "blur(0.3px)",
              }}
            />
            {/* Glow */}
            <div className="absolute inset-0 rounded-full blur-xl opacity-60" style={{
              background: "radial-gradient(50% 50% at 50% 50%, rgba(239,68,68,0.35) 0%, rgba(245,158,11,0.25) 40%, rgba(244,114,182,0.2) 70%, transparent 80%)"
            }} />

            {/* Video */}
            <div className="absolute inset-[6px] rounded-full overflow-hidden border border-white/50 shadow-lg">
              <video
                src="https://res.cloudinary.com/dbbqbctgr/video/upload/v1760097408/BeingAlive/runcomfy-20f27764-b7f3-Women-looking-at-cam-1760094414081_gb9wfw.mp4"
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

            {/* Orbiting sparkles */}
            {!prefersReducedMotion && (
              <>
                <motion.span
                  className="absolute left-1/2 top-1/2 -ml-1 -mt-1 h-2 w-2 rounded-full"
                  style={{ background: "radial-gradient(circle, #fff, rgba(255,255,255,0))", boxShadow: "0 0 16px 4px rgba(255,255,255,0.7)", transformOrigin: "-6rem 0" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                />
                <motion.span
                  className="absolute left-1/2 top-1/2 -ml-[2px] -mt-[2px] h-1 w-1 rounded-full"
                  style={{ background: "radial-gradient(circle, #fca5a5, rgba(252,165,165,0))", boxShadow: "0 0 12px 3px rgba(252,165,165,0.8)", transformOrigin: "-8rem 0" }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
              </>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ delay: 1, duration: 0.6, ease }}
          className="flex flex-col items-center text-gray-600"
        >
          <span className="text-xs">Scroll</span>
          <span className="mt-2 inline-block h-6 w-[1px] bg-gray-400/60" />
        </motion.div>
      </div>
    </section>
  );
}
