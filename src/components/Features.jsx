import { motion } from "framer-motion";
import { Sparkles, Heart, Activity, Shield } from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Real-time Posture Guidance",
    desc: "Computer vision tracks your alignment and gently suggests corrections.",
  },
  {
    icon: Sparkles,
    title: "Lifelike 3D Avatar",
    desc: "A human-like guide performs each pose with smooth motion and clarity.",
  },
  {
    icon: Heart,
    title: "Motivation that Sticks",
    desc: "Daily streaks, affirmations, and mindful breathing keep you consistent.",
  },
  {
    icon: Shield,
    title: "Safe & Inclusive",
    desc: "Adaptive difficulty and safety cues for all bodies and experience levels.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-gray-900 text-center"
        >
          Yoga guidance that feels human
        </motion.h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl border border-gray-200 p-6 bg-gradient-to-b from-white to-gray-50 shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <f.icon size={22} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
