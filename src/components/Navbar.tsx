
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Instagram, Facebook, Linkedin, Mail } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Início", href: "#home" },
    { label: "Projetos", href: "#projects" },
    { label: "Sobre", href: "#about" },
    { label: "Contato", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/95 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a 
            href="#" 
            className={`text-xl md:text-2xl font-bold font-heading transition-colors ${
              isScrolled || isMobileMenuOpen ? "text-primary" : "text-white"
            }`}
          >
            Instituto IBC
          </a>

          {/* Social Icons */}
          <div className="hidden md:flex items-center space-x-3">
            <a 
              href="#" 
              className={`p-2 rounded-full transition-colors ${
                isScrolled 
                  ? "text-primary hover:bg-primary/10" 
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Instagram size={18} />
            </a>
            <a 
              href="#" 
              className={`p-2 rounded-full transition-colors ${
                isScrolled 
                  ? "text-primary hover:bg-primary/10" 
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Facebook size={18} />
            </a>
            <a 
              href="#" 
              className={`p-2 rounded-full transition-colors ${
                isScrolled 
                  ? "text-primary hover:bg-primary/10" 
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Linkedin size={18} />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isScrolled 
                    ? "text-gray-700 hover:text-primary" 
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isScrolled
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "bg-white text-primary hover:bg-white/90"
              }`}
            >
              Contato
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-full ${
              isScrolled || isMobileMenuOpen ? "text-primary" : "text-white"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? "auto" : 0,
        }}
        className="md:hidden bg-white shadow-lg overflow-hidden"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4 pb-4">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-primary transition-colors py-3 border-b border-gray-100 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex space-x-4 pt-2 justify-center">
              <a href="#" className="text-primary hover:text-primary-dark transition-colors p-2">
                <Instagram size={22} />
              </a>
              <a href="#" className="text-primary hover:text-primary-dark transition-colors p-2">
                <Facebook size={22} />
              </a>
              <a href="#" className="text-primary hover:text-primary-dark transition-colors p-2">
                <Linkedin size={22} />
              </a>
              <a href="#" className="text-primary hover:text-primary-dark transition-colors p-2">
                <Mail size={22} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};
