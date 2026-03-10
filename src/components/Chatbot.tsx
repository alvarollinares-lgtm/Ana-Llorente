import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: '¡Hola! Soy el asistente virtual de Ana Llorente. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (!chatRef.current) {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      chatRef.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: 'Eres el asistente virtual de Ana Llorente, arquitecta especializada en Inteligencia Artificial, diseño generativo y paramétrico. Ayudas a los visitantes a entender su trabajo, responder preguntas sobre arquitectura y orientarlos. Sé profesional, conciso y muestra pasión por la innovación tecnológica en la arquitectura.',
        }
      });
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userText });
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: response.text }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: 'Lo siento, ha ocurrido un error de conexión. Por favor, inténtalo de nuevo.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-[#E5E5E5] text-[#050505] p-4 rounded-full shadow-2xl ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[500px] max-h-[calc(100vh-6rem)] bg-[#121212] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-[#1A1A1A] p-4 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <h3 className="font-display font-medium text-[#E5E5E5]">Asistente AI</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#8A8A8A] hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-[#E5E5E5] text-[#050505] rounded-l-xl rounded-tr-xl' 
                        : 'bg-[#2A2A2A] text-[#E5E5E5] rounded-r-xl rounded-tl-xl'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#2A2A2A] text-[#E5E5E5] rounded-r-xl rounded-tl-xl p-3">
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-[#121212]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 bg-[#1A1A1A] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#8A8A8A] border border-transparent transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-[#E5E5E5] text-[#050505] p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
