
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Placeholder for video background - will be managed through admin panel */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 flex items-center justify-center h-full text-white px-4">
        <div className={`text-center transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Instituto IBC</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Transformando vidas através da educação e do esporte
          </p>
        </div>
      </div>
    </div>
  );
};
