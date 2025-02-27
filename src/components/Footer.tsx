
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
          className="fixed bottom-6 right-6 bg-primary hover:bg-primary-light text-white p-3 rounded-full shadow-lg transition-all z-20 animate-bounce"
          aria-label="Voltar ao topo"
        >
          <ArrowUp size={24} />
        </button>
      )}
      
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Sobre */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-heading">Instituto IBC</h3>
            <p className="text-white/70 leading-relaxed">
              Transformando vidas através do esporte e educação desde 2014. Nosso compromisso é criar oportunidades para crianças e jovens realizarem seu potencial completo.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Facebook />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Instagram />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Twitter />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Linkedin />
              </a>
            </div>
          </div>
          
          {/* Links Rápidos */}
          <div>
            <h4 className="text-xl font-semibold mb-6 font-heading">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-white/70 hover:text-white transition-colors flex items-center">
                  <span className="bg-white/10 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Início
                </a>
              </li>
              <li>
                <a href="#projects" className="text-white/70 hover:text-white transition-colors flex items-center">
                  <span className="bg-white/10 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Projetos
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/70 hover:text-white transition-colors flex items-center">
                  <span className="bg-white/10 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Sobre
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-white transition-colors flex items-center">
                  <span className="bg-white/10 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center">
                  <span className="bg-white/10 w-1.5 h-1.5 rounded-full mr-2"></span>
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contato */}
          <div>
            <h4 className="text-xl font-semibold mb-6 font-heading">Contato</h4>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>Av. Paulista, 1000 - Bela Vista, São Paulo - SP</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📞</span>
                <span>(11) 1234-5678</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✉️</span>
                <span>contato@institutoibc.org</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⏰</span>
                <span>Segunda a Sexta: 9h às 18h</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-6 font-heading">Newsletter</h4>
            <p className="text-white/70 mb-4">
              Inscreva-se para receber novidades sobre nossos projetos e eventos.
            </p>
            <form className="space-y-3">
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="px-4 py-3 rounded-l-lg w-full bg-white/10 text-white border-0 focus:ring-2 focus:ring-primary-light focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-light text-white px-4 py-3 rounded-r-lg transition-colors"
                >
                  <ArrowUp className="rotate-90 w-5 h-5" />
                </button>
              </div>
              <p className="text-white/50 text-xs">
                Nós respeitamos sua privacidade. Leia nossa política de privacidade.
              </p>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 mt-8 text-center text-white/60">
          <p className="flex items-center justify-center gap-1">
            &copy; 2024 Instituto IBC. Todos os direitos reservados. Feito com
            <Heart className="text-accent w-4 h-4" />
            por Equipe IBC
          </p>
        </div>
      </div>
    </footer>
  );
};
