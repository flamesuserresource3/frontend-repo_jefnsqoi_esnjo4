import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section id="cta" className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold"
            >
              Start your mindful movement journey
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-white/80"
            >
              Join early access to get personalized flows, progress tracking, and a supportive community.
            </motion.p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex w-full max-w-md rounded-full bg-white/10 p-2 backdrop-blur border border-white/10"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 bg-transparent outline-none px-4 text-white placeholder-white/60"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full bg-white text-gray-900 px-5 py-2 font-medium"
              >
                Join waitlist
              </motion.button>
            </form>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-500/20 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl border border-white/10 p-6 bg-white/5 backdrop-blur">
              <div className="grid grid-cols-3 gap-6 text-center">
                {[
                  { label: "Asanas", value: "300+" },
                  { label: "Users", value: "25k" },
                  { label: "Sessions", value: "1.2M" },
                ].map((s) => (
                  <div key={s.label} className="py-6">
                    <div className="text-3xl font-semibold">{s.value}</div>
                    <div className="text-white/70 text-sm mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
