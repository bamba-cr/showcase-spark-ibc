
import { motion } from "framer-motion";
import { Users, Award, BookOpen, Calendar } from "lucide-react";

const stats = [
  { 
    label: "Alunos Atendidos", 
    value: "1000+", 
    icon: Users,
    description: "Jovens impactados por nossos projetos"
  },
  { 
    label: "Projetos Ativos", 
    value: "7", 
    icon: Award,
    description: "Iniciativas em diferentes áreas"
  },
  { 
    label: "Educadores", 
    value: "15+", 
    icon: BookOpen,
    description: "Profissionais qualificados"
  },
  { 
    label: "Anos de História", 
    value: "10+", 
    icon: Calendar,
    description: "Década de transformação social"
  },
];

export const Stats = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary-dark text-white relative overflow-hidden">
      {/* Padrão decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0tNiAwSDB2LTZoMzB2NnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            O Impacto do Nosso Trabalho
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Transformando vidas através do esporte, educação e cultura
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
                
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="text-4xl font-bold font-heading mb-2"
                >
                  {stat.value}
                </motion.div>
                
                <div className="text-lg font-medium mb-2">{stat.label}</div>
                <div className="text-sm text-white/70">{stat.description}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
