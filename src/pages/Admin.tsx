
import { useState } from "react";
import { toast } from "sonner";

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a placeholder. In a real application, you'd want to implement proper authentication
    if (password === "admin123") {
      setIsAuthenticated(true);
      toast.success("Login realizado com sucesso!");
    } else {
      toast.error("Senha incorreta!");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-ibc-purple mb-6">Área Administrativa</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ibc-purple"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-ibc-purple text-white py-2 rounded-lg hover:bg-opacity-90 transition-all"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-ibc-purple mb-8">Painel Administrativo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Gerenciar Vídeo Principal</h2>
            <input type="file" accept="video/*" className="mb-4" />
            <button className="bg-ibc-purple text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
              Atualizar Vídeo
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Gerenciar Projetos</h2>
            <button className="bg-ibc-green text-ibc-purple px-4 py-2 rounded-lg hover:bg-opacity-90">
              Adicionar Novo Projeto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
