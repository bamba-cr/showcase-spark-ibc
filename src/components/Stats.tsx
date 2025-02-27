
import { Users, Award, BookOpen, Calendar } from "lucide-react";

const stats = [
  { label: "Alunos", value: "1000+", icon: Users },
  { label: "Projetos", value: "7", icon: Award },
  { label: "Educadores", value: "15+", icon: BookOpen },
  { label: "Anos", value: "10+", icon: Calendar }
];

export const Stats = () => {
  return (
    <section className="py-12 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white/10 rounded-xl p-4 text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-base">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
