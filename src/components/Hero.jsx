import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

export default function Hero() {
  return (
    <section className="relative h-[80vh] md:h-[88vh] overflow-hidden" id="home">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/6xPqJMGs8V9p7qvE/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900"
          >
            Bring Yoga to Life with an AI Human Avatar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-6 text-lg md:text-xl text-gray-700"
          >
            beingalive.ai turns your screen into a mindful coach. Our lifelike 3D avatar demonstrates asanas, corrects posture, and keeps you motivated.
          </motion.p>
          <motion.div
            className="mt-8 flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-full bg-gray-900 text-white px-6 py-3 text-sm font-medium"
            >
              Watch demo
            </a>
            <a
              href="#cta"
              className="inline-flex items-center justify-center rounded-full bg-white text-gray-900 px-6 py-3 text-sm font-medium border border-gray-200 shadow-sm"
            >
              Start free
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
