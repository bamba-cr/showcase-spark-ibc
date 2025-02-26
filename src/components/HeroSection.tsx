
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1469041797191-50ace28483c3"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Instituto IBC
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          Transformando vidas através do esporte e da educação
        </p>
        <a
          href="#projects"
          className="inline-block bg-white text-primary px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all"
        >
          Ver Projetos
        </a>
      </motion.div>
    </div>
  );
};
