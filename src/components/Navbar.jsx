import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/60 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <motion.a
          href="#"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 font-semibold text-gray-900"
        >
          <span className="inline-block w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-blue-600" />
          <span>beingalive.ai</span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a href="#features" className="hover:text-gray-900">Features</a>
          <a href="#demo" className="hover:text-gray-900">Demo</a>
          <a href="#cta" className="hover:text-gray-900">Get Started</a>
        </nav>

        <motion.a
          href="#cta"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center rounded-full bg-gray-900 text-white px-4 py-2 text-sm"
        >
          Try for free
        </motion.a>
      </div>
    </header>
  );
}
