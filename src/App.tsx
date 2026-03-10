/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronRight, Instagram, Linkedin, Mail, MapPin, Phone, Plus, Menu, X } from 'lucide-react';
import Chatbot from './components/Chatbot';

const data = {
  slogan: "Arquitectura consciente, diseño que respira.",
  aboutText: [
    "Soy Ana Llorente, arquitecta y CEO de al ARQUITECTURA. Diseño y reformo viviendas con una idea muy simple: que se vivan mejor. Me obsesionan la luz natural, las proporciones, el orden y una calma visual que se sostiene en lo importante: decisiones bien tomadas, detalles bien resueltos y un proceso claro (sin sorpresas en obra).",
    "Acompaño a clientes en reformas, rehabilitación y obra nueva, traduciendo lo técnico a un lenguaje entendible: qué conviene, qué no compensa y cómo aterrizar el presupuesto sin perder calidad. Trabajo con una estética neutra y atemporal (piedra, madera clara, tonos arena, negro mate, oliva suave) y soluciones robustas pensadas para durar.",
    "Además, colaboro con inmobiliarias con servicios digitales que convierten un inmueble en algo fácil de entender y fácil de vender: planos, documentación, optimización de distribución y apoyo técnico para presentar con más claridad, generar confianza y acelerar decisiones.",
    "Si quieres un espacio sereno y bien construido —o necesitas apoyo técnico para tu cartera—, hablemos."
  ],
  philosophy: [
    { title: "Honestidad Material", description: "Uso de materiales nobles y técnicas constructivas que perduran en el tiempo." },
    { title: "Diálogo con el Entorno", description: "Cada proyecto nace de una lectura profunda del lugar y su luz." },
    { title: "Innovación Técnica", description: "Aplicación de soluciones vanguardistas para optimizar la eficiencia y el confort." }
  ],
  services: ["Arquitectura Residencial", "Rehabilitación de Espacios", "Diseño de Interiores", "Gestión de Obra"]
};

const projects = [
  { id: 1, title: "Vivienda Unifamiliar AL", category: "Residencial", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000", year: "2023" },
  { id: 2, title: "Reforma Integral Centro", category: "Interiorismo", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000", year: "2022" },
  { id: 3, title: "Espacio de Trabajo al", category: "Comercial", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000", year: "2023" }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-[#1a1a1a] selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-black/5 py-4" : "bg-transparent"}`}>
        <div className="flex items-center gap-3">
          <img src="/logo.jpeg" alt="Logo" className="h-8 md:h-10 w-auto object-contain" referrerPolicy="no-referrer" />
          <span className="text-xl md:text-2xl font-serif tracking-widest uppercase">al ARQUITECTURA</span>
        </div>
        <div className="hidden md:flex gap-12 items-center">
          {["Inicio", "Acerca de", "Proyectos", "Filosofía", "Contacto"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-[11px] uppercase tracking-[0.2em] font-medium hover:opacity-50 transition-opacity">
              {item}
            </a>
          ))}
          <button className="px-6 py-2 border border-black/20 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">
            Presupuesto
          </button>
        </div>
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden">
            {["Inicio", "Acerca de", "Proyectos", "Filosofía", "Contacto"].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} onClick={() => setIsMenuOpen(false)} className="text-2xl font-serif uppercase tracking-widest">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop" alt="Architecture Hero" className="w-full h-full object-cover opacity-60 grayscale-[0.3]" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f5f2ed]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f5f2ed]/80"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-semibold mb-6 block text-black/60">
              Estudio de Arquitectura & Diseño
            </span>
            <h1 className="text-6xl md:text-9xl font-serif leading-[0.9] mb-8 tracking-tighter">
              Espacios que <br /> <span className="italic font-light">Inspiran</span>
            </h1>
            <p className="text-sm md:text-lg max-w-xl mx-auto font-light leading-relaxed text-black/70 mb-12">
              {data.slogan}
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button className="group flex items-center gap-4 px-8 py-4 bg-black text-white rounded-full text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                Ver Proyectos <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="text-[11px] uppercase tracking-[0.2em] font-semibold border-b border-black/20 pb-1 hover:border-black transition-colors">
                Nuestra Historia
              </button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-12 left-12 hidden lg:block">
          <div className="vertical-text flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-black/40">Scroll to explore</span>
            <div className="w-[1px] h-24 bg-black/10"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="acerca-de" className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="oval-mask aspect-[4/5] overflow-hidden bg-black/5 flex items-center justify-center">
              <img src="/perfil.jpeg" alt="Ana Llorente Serrano" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white p-8 rounded-full shadow-2xl flex items-center justify-center text-center hidden md:flex">
              <p className="text-[10px] uppercase tracking-widest font-bold leading-tight">10+ Años <br /> de Excelencia</p>
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 mb-4 block">Acerca de</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">Diseño con <br /> <span className="italic">Propósito</span></h2>
            <div className="space-y-6 mb-12">
              {data.aboutText.map((paragraph, index) => (
                <p key={index} className="text-base md:text-lg font-light leading-relaxed text-black/70">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <h4 className="text-2xl font-serif mb-2">150+</h4>
                <p className="text-[10px] uppercase tracking-widest text-black/50">Proyectos Completados</p>
              </div>
              <div>
                <h4 className="text-2xl font-serif mb-2">12</h4>
                <p className="text-[10px] uppercase tracking-widest text-black/50">Premios de Diseño</p>
              </div>
            </div>
            <button className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-bold group">
              Conoce a Ana <Plus size={14} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="filosofía" className="bg-[#1a1a1a] text-white py-24 md:py-40 overflow-hidden">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-4 block">Nuestra Filosofía</span>
              <h2 className="text-4xl md:text-7xl font-serif leading-tight">Transformando <br /> <span className="italic">Visiones</span> en Realidad</h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mb-2">Especialidades</p>
              <div className="flex flex-wrap justify-end gap-x-6 gap-y-2">
                {data.services.map(service => (
                  <span key={service} className="text-xs uppercase tracking-widest">{service}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {data.philosophy.map((item, index) => (
              <motion.div key={item.title} whileHover={{ y: -10 }} className="p-10 border border-white/10 rounded-3xl hover:bg-white/5 transition-colors">
                <span className="text-4xl font-serif text-white/10 mb-6 block">0{index + 1}</span>
                <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                <p className="text-sm font-light leading-relaxed text-white/60">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="py-24 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-6xl font-serif">Proyectos <br /> <span className="italic">Destacados</span></h2>
            <button className="hidden md:flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold border-b border-black/20 pb-1">
              Ver Todo el Portfolio
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <motion.div key={project.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl mb-6">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                      <ChevronRight size={24} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">{project.category}</p>
                    <h4 className="text-xl font-serif">{project.title}</h4>
                  </div>
                  <span className="text-[10px] font-medium text-black/30">{project.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 mb-4 block">Contacto</span>
              <h2 className="text-4xl md:text-7xl font-serif mb-12 leading-tight">Hablemos de tu <br /> <span className="italic">Próximo Espacio</span></h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-[#f5f2ed] rounded-full flex items-center justify-center shrink-0"><Mail size={18} /></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Email</p>
                    <p className="text-lg font-medium">hola@anallorente.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-[#f5f2ed] rounded-full flex items-center justify-center shrink-0"><Phone size={18} /></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Teléfono</p>
                    <p className="text-lg font-medium">+34 912 345 678</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-[#f5f2ed] rounded-full flex items-center justify-center shrink-0"><MapPin size={18} /></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Estudio</p>
                    <p className="text-lg font-medium">Calle de la Innovación, 42 <br /> 28001 Madrid, España</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#f5f2ed] p-10 md:p-16 rounded-[40px]">
              <form className="space-y-8" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Nombre</label>
                    <input type="text" className="w-full bg-transparent border-b border-black/10 py-2 focus:border-black outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Email</label>
                    <input type="email" className="w-full bg-transparent border-b border-black/10 py-2 focus:border-black outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Tipo de Proyecto</label>
                  <select className="w-full bg-transparent border-b border-black/10 py-2 focus:border-black outline-none transition-colors appearance-none">
                    <option>Residencial</option>
                    <option>Comercial</option>
                    <option>Interiorismo</option>
                    <option>Otros</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Mensaje</label>
                  <textarea rows={4} className="w-full bg-transparent border-b border-black/10 py-2 focus:border-black outline-none transition-colors resize-none"></textarea>
                </div>
                <button className="w-full py-6 bg-black text-white rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:scale-[1.02] transition-transform">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <span className="text-xl font-serif tracking-widest uppercase block mb-2">al ARQUITECTURA</span>
            <p className="text-[10px] uppercase tracking-widest text-white/40">© {new Date().getFullYear()} al ARQUITECTURA. Todos los derechos reservados.</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white/50 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-white/50 transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="hover:text-white/50 transition-colors"><Mail size={20} /></a>
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <Chatbot />
    </div>
  );
}
