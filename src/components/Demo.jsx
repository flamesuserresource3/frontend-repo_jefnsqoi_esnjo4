import { motion } from "framer-motion";

export default function Demo() {
  return (
    <section id="demo" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-200"
          >
            <video
              src="https://cdn.coverr.co/videos/coverr-girl-practicing-yoga-at-home-4364/1080p.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </motion.div>

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-gray-900"
            >
              See the avatar in motion
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-gray-700"
            >
              Our model demonstrates foundational asanas like Tadasana, Vrikshasana, and Adho Mukha Svanasana with clear transitions and breathing cadence.
            </motion.p>

            <ul className="mt-6 space-y-3 text-gray-700">
              {[
                "Smooth, human-like motion",
                "Clear alignment cues",
                "Breath-timed transitions",
                "Works on any device",
              ].map((item, idx) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
