import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Instagram, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone,
  ChevronRight,
  Plus
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STUDIO_NAME = "al ARQUITECTURA";

const REAL_CONTENT = {
  slogan: "Arquitectura consciente, diseño que respira.",
  bio: "Ana Llorente Serrano lidera al ARQUITECTURA, un estudio comprometido con la excelencia técnica y la sensibilidad espacial. Con una sólida trayectoria en el sector, Ana transforma necesidades en espacios habitables que dialogan con su entorno, priorizando siempre la calidad constructiva y el bienestar del usuario.",
  history: "Fundado por Ana Llorente Serrano, al ARQUITECTURA nace de la pasión por una arquitectura honesta y funcional. Tras años de experiencia colaborando en proyectos de diversa escala, Ana consolida su propio estudio para ofrecer un servicio personalizado donde el detalle y la innovación son los protagonistas de cada obra.",
  philosophy: [
    { title: "Honestidad Material", description: "Uso de materiales nobles y técnicas constructivas que perduran en el tiempo." },
    { title: "Diálogo con el Entorno", description: "Cada proyecto nace de una lectura profunda del lugar y su luz." },
    { title: "Innovación Técnica", description: "Aplicación de soluciones vanguardistas para optimizar la eficiencia y el confort." }
  ],
  services: ["Arquitectura Residencial", "Rehabilitación de Espacios", "Diseño de Interiores", "Gestión de Obra"]
};

const PROJECTS = [
  {
    id: 1,
    title: "Vivienda Unifamiliar AL",
    category: "Residencial",
    image: "https://picsum.photos/seed/al-arch-1/1000/1333",
    year: "2023"
  },
  {
    id: 2,
    title: "Reforma Integral Centro",
    category: "Interiorismo",
    image: "https://picsum.photos/seed/al-arch-2/1000/1333",
    year: "2022"
  },
  {
    id: 3,
    title: "Espacio de Trabajo al",
    category: "Comercial",
    image: "https://picsum.photos/seed/al-arch-3/1000/1333",
    year: "2023"
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-[#1a1a1a] selection:text-white">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center",
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-black/5 py-4" : "bg-transparent"
      )}>
        <div className="flex items-center gap-2">
          <span className="text-xl md:text-2xl font-serif tracking-widest uppercase">{STUDIO_NAME}</span>
        </div>

        <div className="hidden md:flex gap-12 items-center">
          {['Inicio', 'Proyectos', 'Filosofía', 'Contacto'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-[11px] uppercase tracking-[0.2em] font-medium hover:opacity-50 transition-opacity"
            >
              {item}
            </a>
          ))}
          <button className="px-6 py-2 border border-black/20 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">
            Presupuesto
          </button>
        </div>

        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Inicio', 'Proyectos', 'Filosofía', 'Contacto'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-serif uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/architecture-hero/1920/1080" 
            alt="Architecture Hero" 
            className="w-full h-full object-cover opacity-60 grayscale-[0.3]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f5f2ed]/80"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-semibold mb-6 block text-black/60">
              Estudio de Arquitectura & Diseño
            </span>
            <h1 className="text-6xl md:text-9xl font-serif leading-[0.9] mb-8 tracking-tighter">
              Espacios que <br /> <span className="italic font-light">Inspiran</span>
            </h1>
            <p className="text-sm md:text-lg max-w-xl mx-auto font-light leading-relaxed text-black/70 mb-12">
              {REAL_CONTENT.slogan}
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

      {/* Split About Section */}
      <section className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="oval-mask aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000" 
                alt="Ana Llorente Serrano" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white p-8 rounded-full shadow-2xl flex items-center justify-center text-center hidden md:flex">
              <p className="text-[10px] uppercase tracking-widest font-bold leading-tight">
                10+ Años <br /> de Excelencia
              </p>
            </div>
          </div>
          
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 mb-4 block">Sobre el Estudio</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              Diseño con <br /> <span className="italic">Propósito</span>
            </h2>
            <p className="text-lg font-light leading-relaxed text-black/70 mb-8">
              {REAL_CONTENT.bio}
            </p>
            <p className="text-sm font-light leading-relaxed text-black/50 mb-8 italic">
              {REAL_CONTENT.history}
            </p>
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

      {/* Philosophy / Services */}
      <section id="filosofía" className="bg-[#1a1a1a] text-white py-24 md:py-40 overflow-hidden">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 mb-4 block">Nuestra Filosofía</span>
              <h2 className="text-4xl md:text-7xl font-serif leading-tight">
                Transformando <br /> <span className="italic">Visiones</span> en Realidad
              </h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mb-2">Especialidades</p>
              <div className="flex flex-wrap justify-end gap-x-6 gap-y-2">
                {REAL_CONTENT.services.map(s => (
                  <span key={s} className="text-xs uppercase tracking-widest">{s}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {REAL_CONTENT.philosophy.map((item, idx) => (
              <motion.div 
                key={item.title}
                whileHover={{ y: -10 }}
                className="p-10 border border-white/10 rounded-3xl hover:bg-white/5 transition-colors"
              >
                <span className="text-4xl font-serif text-white/10 mb-6 block">0{idx + 1}</span>
                <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                <p className="text-sm font-light leading-relaxed text-white/60">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="proyectos" className="py-24 md:py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-6xl font-serif">Proyectos <br /> <span className="italic">Destacados</span></h2>
            <button className="hidden md:flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold border-b border-black/20 pb-1">
              Ver Todo el Portfolio
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl mb-6">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
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
              <h2 className="text-4xl md:text-7xl font-serif mb-12 leading-tight">
                Hablemos de tu <br /> <span className="italic">Próximo Espacio</span>
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-[#f5f2ed] rounded-full flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Email</p>
                    <p className="text-lg font-medium">hola@anallorente.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-[#f5f2ed] rounded-full flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Teléfono</p>
                    <p className="text-lg font-medium">+34 912 345 678</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-[#f5f2ed] rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-black/40 mb-1">Estudio</p>
                    <p className="text-lg font-medium">Calle de la Innovación, 42 <br /> 28001 Madrid, España</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#f5f2ed] p-10 md:p-16 rounded-[40px]">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
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
            <span className="text-xl font-serif tracking-widest uppercase block mb-2">{STUDIO_NAME}</span>
            <p className="text-[10px] uppercase tracking-widest text-white/40">© 2024 {STUDIO_NAME}. Todos los derechos reservados.</p>
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
    </div>
  );
}
