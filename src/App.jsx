import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Demo from "./components/Demo";
import CTA from "./components/CTA";

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Features />
      <Demo />
      <CTA />
      <footer className="py-12 text-center text-sm text-gray-500 border-t border-gray-100">
        © {new Date().getFullYear()} beingalive.ai — Breathe. Move. Be.
      </footer>
    </div>
  );
}

export default App;
