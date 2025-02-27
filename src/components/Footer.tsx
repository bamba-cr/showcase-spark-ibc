
import { Facebook, Instagram, Linkedin, Twitter, Heart, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-primary-dark text-white relative">
      {/* Botão voltar ao topo */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-primary hover:bg-primary-light text-white p-2 md:p-3 rounded-full shadow-lg transition-all z-20 animate-bounce"
          aria-label="Voltar ao topo"
        >
          <ArrowUp size={20} className="md:w-6 md:h-6" />
        </button>
      )}
      
      <div className="container mx-auto px-4 pt-12 md:pt-16 pb-6 md:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10 md:mb-12">
          {/* Sobre */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-xl md:text-2xl font-bold font-heading">Instituto IBC</h3>
            <p className="text-white/70 leading-relaxed text-sm md:text-base">
              Transformando vidas através do esporte e educação desde 2014. Nosso compromisso é criar oportunidades para crianças e jovens realizarem seu potencial completo.
            </p>
            <div className="flex space-x-3 md:space-x-4 pt-1 md:pt-2">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Facebook size={18} className="md:w-5 md:h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Instagram size={18} className="md:w-5 md:h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Twitter size={18} className="md:w-5 md:h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Linkedin size={18} className="md:w-5 md:h-5" />
              </a>
            </div>
          </div>
          
          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 font-heading">Links Rápidos</h4>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="#home" className="text-white/70 hover:text-white transition-colors flex items-center text-sm md:text-base">
                  <span className="bg-white/10 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Início
                </a>
              </li>
              <li>
                <a href="#projects" className="text-white/70 hover:text-white transition-colors flex items-center text-sm md:text-base">
                  <span className="bg-white/10 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Projetos
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/70 hover:text-white transition-colors flex items-center text-sm md:text-base">
                  <span className="bg-white/10 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Sobre
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-white transition-colors flex items-center text-sm md:text-base">
                  <span className="bg-white/10 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center text-sm md:text-base">
                  <span className="bg-white/10 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contato */}
          <div>
            <h4 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 font-heading">Contato</h4>
            <ul className="space-y-2 md:space-y-3 text-white/70">
              <li className="flex items-start">
                <span className="mr-2 text-sm md:text-base">📍</span>
                <span className="text-sm md:text-base">Av. Paulista, 1000 - Bela Vista, São Paulo - SP</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-sm md:text-base">📞</span>
                <span className="text-sm md:text-base">(11) 1234-5678</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-sm md:text-base">✉️</span>
                <span className="text-sm md:text-base">contato@institutoibc.org</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-sm md:text-base">⏰</span>
                <span className="text-sm md:text-base">Segunda a Sexta: 9h às 18h</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 font-heading">Newsletter</h4>
            <p className="text-white/70 mb-3 md:mb-4 text-sm md:text-base">
              Inscreva-se para receber novidades sobre nossos projetos e eventos.
            </p>
            <form className="space-y-2 md:space-y-3">
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="px-3 md:px-4 py-2 md:py-3 rounded-l-lg w-full bg-white/10 text-white border-0 focus:ring-2 focus:ring-primary-light focus:outline-none text-sm"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-light text-white px-3 md:px-4 py-2 md:py-3 rounded-r-lg transition-colors"
                >
                  <ArrowUp className="rotate-90 w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
              <p className="text-white/50 text-xs">
                Nós respeitamos sua privacidade. Leia nossa política de privacidade.
              </p>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 md:pt-8 mt-6 md:mt-8 text-center text-white/60">
          <p className="flex items-center justify-center gap-1 text-xs md:text-sm">
            &copy; 2024 Instituto IBC. Todos os direitos reservados. Feito com
            <Heart className="text-accent w-3 h-3 md:w-4 md:h-4" />
            por Equipe IBC
          </p>
        </div>
      </div>
    </footer>
  );
};
