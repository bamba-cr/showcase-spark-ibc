
import { useEffect, useState } from "react";
import { Menu, X, Linkedin, Github, Twitter, Facebook, Instagram } from "lucide-react";

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
            <div className="flex space-x-6 mr-8">
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
            
            <div className="flex space-x-4">
              {socialLinks?.linkedin && (
                <a 
                  href={socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={isScrolled ? "text-primary" : "text-white"}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {socialLinks?.github && (
                <a 
                  href={socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={isScrolled ? "text-primary" : "text-white"}
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
              )}
              {socialLinks?.twitter && (
                <a 
                  href={socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={isScrolled ? "text-primary" : "text-white"}
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
              )}
              {socialLinks?.facebook && (
                <a 
                  href={socialLinks.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={isScrolled ? "text-primary" : "text-white"}
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
              )}
              {socialLinks?.instagram && (
                <a 
                  href={socialLinks.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={isScrolled ? "text-primary" : "text-white"}
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              )}
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
              
              <div className="flex space-x-4 py-2">
                {socialLinks?.linkedin && (
                  <a 
                    href={socialLinks.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                {socialLinks?.github && (
                  <a 
                    href={socialLinks.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary"
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </a>
                )}
                {socialLinks?.twitter && (
                  <a 
                    href={socialLinks.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary"
                    aria-label="Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                )}
                {socialLinks?.facebook && (
                  <a 
                    href={socialLinks.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                )}
                {socialLinks?.instagram && (
                  <a 
                    href={socialLinks.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
