import { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [messages, setMessages] = useState([
    { id: 1, text: '¡Hola! Bienvenido a AgroDistribuciones. ¿En qué puedo ayudarte hoy?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const botResponses = {
    'hola': '¡Hola! Bienvenido a AgroDistribuciones del Valle. ¿Qué necesitas hoy?',
    'productos': 'Contamos con 20 productos diferentes de agroquímicos, fertilizantes, semillas y más. ¿Te gustaría ver nuestro catálogo?',
    'precio': 'Nuestros precios varían según el producto. Los puedes ver en el catálogo. ¿Hay algún producto específico que te interese?',
    'envío': 'Ofrecemos envío a nivel local. El costo es de S/ 50 y está incluido en tu compra.',
    'pago': 'Aceptamos pagos por Yape, Plin, transferencia bancaria, tarjeta y pago contra entrega.',
    'stock': 'Puedes ver la disponibilidad de cada producto en nuestro catálogo. Los productos con stock bajo aparecen marcados.',
    'carrito': 'Puedes agregar productos al carrito haciendo clic en el botón "Agregar al carrito" en cada producto.',
    'ayuda': 'Estoy aquí para ayudarte con preguntas sobre nuestros productos, precios, envíos y pagos. ¿Qué necesitas?',
    'default': 'No tengo información sobre eso, pero puedo ayudarte con nuestros productos, precios y envíos. ¿Hay algo más que quieras saber?'
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    // Agregar mensaje del usuario
    const newMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    };
    setMessages([...messages, newMessage]);

    // Generar respuesta del bot
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let botResponse = botResponses.default;

      // Buscar coincidencias en las respuestas
      for (const [key, response] of Object.entries(botResponses)) {
        if (key !== 'default' && lowerInput.includes(key)) {
          botResponse = response;
          break;
        }
      }

      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return mounted ? (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-agro-primary hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-bounce"
          title="Abre el ChatBot"
        >
          <MessageCircle size={28} />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-2xl w-96 max-w-full h-96 flex flex-col border-2 border-agro-primary">
          {/* Header */}
          <div className="bg-agro-primary text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">🤖 AgroBot Asistente</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-600 p-1 rounded"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-agro-primary text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-gray-300 p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-agro-primary text-sm"
            />
            <button
              onClick={handleSend}
              className="bg-agro-primary hover:bg-blue-600 text-white p-2 rounded-lg transition"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  ) : null;
}
