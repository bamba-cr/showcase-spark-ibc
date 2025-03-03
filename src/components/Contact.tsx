
import { Send, MapPin, Phone, Mail } from "lucide-react";

interface ContactProps {
  email?: string;
  phone?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export const Contact = ({ 
  email = "contato@ibc.org", 
  phone = "(11) 1234-5678",
  socialLinks = {}
}: ContactProps) => {
  return (
    <section id="contact" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Contato</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Informações de contato */}
          <div className="bg-primary rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Informações</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium">Endereço</h4>
                  <p className="text-white/80 text-sm">São Paulo - SP</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium">Telefone</h4>
                  <p className="text-white/80 text-sm">{phone}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-white/80 text-sm">{email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de contato */}
          <form className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold mb-4">Mensagem</h3>
            
            <div className="space-y-4">
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-gray-300"
                placeholder="Nome"
              />
              
              <input
                type="email"
                className="w-full px-3 py-2 rounded-lg border border-gray-300"
                placeholder="Email"
              />
              
              <textarea
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-gray-300"
                placeholder="Mensagem"
              />
            </div>
            
            <button
              type="submit"
              className="mt-4 w-full bg-primary text-white py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <span>Enviar</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
