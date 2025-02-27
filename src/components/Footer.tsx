
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Instituto IBC</h3>
          <p className="text-white/70 text-sm">
            Transformando vidas através do esporte e educação
          </p>
        </div>
        
        <div className="border-t border-white/10 pt-4 text-white/60">
          <p className="flex items-center justify-center gap-1 text-xs">
            &copy; 2024 Instituto IBC. Feito com
            <Heart className="text-accent w-3 h-3" />
            por IBC
          </p>
        </div>
      </div>
    </footer>
  );
};
