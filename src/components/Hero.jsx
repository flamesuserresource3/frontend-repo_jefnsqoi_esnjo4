import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section className="relative h-[88vh] md:h-[92vh] overflow-hidden" id="home">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Gradient overlays (non-blocking for interactions) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white/40" />
        {/* Aura glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vmin] h-[90vmin] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.25),rgba(59,130,246,0.18)_45%,rgba(251,146,60,0.12)_70%,transparent_75%)] blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-gray-200/60 bg-white/60 backdrop-blur px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
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
            className="mt-6 text-lg md:text-xl text-gray-700"
          >
            beingalive.ai blends a lifelike 3D model with posture guidance and breath-paced flows, so practice feels intuitive, safe, and deeply human.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <motion.a
              href="#demo"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full bg-gray-900 text-white px-6 py-3 text-sm font-medium shadow-lg shadow-gray-900/10"
            >
              Watch demo
            </motion.a>
            <motion.a
              href="#cta"
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
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
            animate={{ y: [0, -8, 0], opacity: 1 }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:flex items-center gap-2 absolute right-[8%] top-[28%] rounded-2xl border border-gray-200 bg-white/80 backdrop-blur px-4 py-3 shadow-md"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-sm text-gray-800 font-medium">Posture aligned</span>
          </motion.div>

          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: [-6, 0, -6], opacity: 1 }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="hidden md:flex items-center gap-2 absolute left-[10%] bottom-[18%] rounded-2xl border border-gray-200 bg-white/80 backdrop-blur px-4 py-3 shadow-md"
          >
            <span className="text-sm text-gray-800 font-medium">Breathe in • 4</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center text-gray-600"
        >
          <span className="text-xs">Scroll</span>
          <span className="mt-2 inline-block h-6 w-[1px] bg-gray-400/60" />
        </motion.div>
      </div>
    </section>
  );
}
