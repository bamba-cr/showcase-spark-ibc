
import { motion } from "framer-motion";

const stats = [
  { label: "Alunos Atendidos", value: "1000+" },
  { label: "Projetos Ativos", value: "7" },
  { label: "Professores", value: "15+" },
  { label: "Anos de História", value: "10+" },
];

export const Stats = () => {
  return (
    <div className="relative py-16 bg-primary">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] opacity-70" />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="text-4xl md:text-5xl font-bold text-secondary mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
