
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  title?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

export const Navbar = ({ 
  title = "Instituto IBC",
  socialLinks = {}
}: NavbarProps) => {
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
    { label: "Estatísticas", href: "#stats" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled || isMobileMenuOpen ? "bg-white/95 shadow-lg" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#" className={isScrolled || isMobileMenuOpen ? "text-primary" : "text-white"}>
            {title}
          </a>

          <div className="hidden md:flex items-center">
            <div className="flex space-x-6">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={isScrolled ? "text-gray-700" : "text-white"}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <button
            className={`md:hidden p-2 ${isScrolled || isMobileMenuOpen ? "text-primary" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

