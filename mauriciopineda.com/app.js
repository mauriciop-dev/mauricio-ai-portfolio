import React, { useState, useRef, useEffect } from 'react';
import { Play, Globe, MessageCircle, Database, Server, Bot, Code } from 'lucide-react';

// RUTAS DE VIDEO REALES (Asume que están en la carpeta public/videos)
const VIDEOS = {
    idle: '/videos/idle.mp4',
    intro_es: '/videos/intro_es.mp4',
    intro_en: '/videos/intro_en.mp4',
    reaction: '/videos/reaction.mp4'
};

export default function Portfolio() {
    const [currentState, setCurrentState] = useState('idle'); // idle, intro_es, intro_en, reaction
    const videoRef = useRef(null);

    // --- LÓGICA DE REPRODUCCIÓN DE VIDEO ---
    useEffect(() => {
        if (videoRef.current) {
            const video = videoRef.current;

            // 1. Asigna la nueva fuente (URL)
            video.src = VIDEOS[currentState];

            // 2. Configura atributos dinámicamente
            video.muted = currentState === 'idle' || currentState === 'reaction'; // Silenciamos Idle y Reacción
            video.loop = currentState === 'idle'; // Solo el Idle es bucle

            // 3. Carga y reproduce el nuevo video
            // Usamos .load() para asegurar que la nueva fuente se cargue
            video.load();
            // Usamos .play() y catch para manejar la política de Autoplay de los navegadores
            video.play().catch(error => {
                // En caso de que falle el autoplay (por no haber interacción), mostramos un mensaje.
                if (currentState !== 'idle') {
                    console.log("Autoplay bloqueado. Haz clic en el video o en un botón para empezar.");
                }
            });
        }
    }, [currentState]);

    // Manejo de fin de video (Intro)
    const handleVideoEnd = () => {
        // Si termina una intro, volvemos automáticamente al bucle 'idle'
        if (currentState === 'intro_es' || currentState === 'intro_en') {
            setCurrentState('idle');
        }
    };

    // Función para activar intros
    const playIntro = (lang) => {
        setCurrentState(lang === 'es' ? 'intro_es' : 'intro_en');
    };

    // Funciones para Hover en botones (activar video reacción)
    const handleMouseEnter = () => {
        // Solo reacciona si está en idle (para no cortar la intro si está hablando)
        if (currentState === 'idle') {
            setCurrentState('reaction');
        }
    };

    const handleMouseLeave = () => {
        if (currentState === 'reaction') {
            setCurrentState('idle');
        }
    };

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center font-sans text-white">

            {/* --- CONTENEDOR DE VIDEO --- */}
            <div className="absolute inset-0 z-0 w-full h-full">
                {/* TRUCO VIBE CODER: scale-105 hace un ligero zoom para sacar 
           la marca de agua de HeyGen fuera de la pantalla.
        */}
                <video
                    ref={videoRef}
                    onEnded={handleVideoEnd}
                    // La fuente (src) se maneja en el useEffect
                    className="w-full h-full object-cover transition-opacity duration-500 opacity-100 transform scale-[1.05]"
                />

                {/* Overlay Gradiente para que los botones se lean bien */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none"></div>
            </div>

            {/* --- INTERFAZ DE USUARIO (UI) --- */}

            {/* Header: Selector de Idioma */}
            <div className="absolute top-8 z-20 flex gap-4">
                <button
                    onClick={() => playIntro('es')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-md transition-all duration-300 border ${currentState === 'intro_es' ? 'bg-blue-600/80 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.5)]' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
                >
                    <span className="text-2xl">🇨🇴</span>
                    <span className="font-medium">Hola, soy Mauricio</span>
                </button>

                <button
                    onClick={() => playIntro('en')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-md transition-all duration-300 border ${currentState === 'intro_en' ? 'bg-purple-600/80 border-purple-400 shadow-[0_0_20px_rgba(147,51,234,0.5)]' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
                >
                    <span className="text-2xl">🇺🇸</span>
                    <span className="font-medium">Hi, I'm AI-Mauricio</span>
                    <Bot size={18} className="text-purple-300" />
                </button>
            </div>

            {/* Footer: Botonera de Proyectos (Tu boceto) */}
            <div className="absolute bottom-12 z-20 w-full max-w-4xl px-6">
                <p className="text-center text-white/60 mb-6 text-sm uppercase tracking-widest">Explora mi portafolio</p>

                <div className="flex flex-wrap justify-center gap-4 md:gap-6">

                    {/* Botón 1: Landing Pages */}
                    <ProjectButton
                        icon={<Globe size={24} />}
                        label="Web Apps"
                        sub="Next.js + Supabase"
                        onEnter={handleMouseEnter}
                        onLeave={handleMouseLeave}
                    />

                    {/* Botón 2: WhatsApp Bots */}
                    <ProjectButton
                        icon={<MessageCircle size={24} />}
                        label="WhatsApp API"
                        sub="Meta Developer"
                        color="hover:bg-green-600/80 hover:border-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                        onEnter={handleMouseEnter}
                        onLeave={handleMouseLeave}
                    />

                    {/* Botón 3: Power Platform */}
                    <ProjectButton
                        icon={<Database size={24} />}
                        label="Power Apps"
                        sub="Microsoft Fabric"
                        color="hover:bg-pink-600/80 hover:border-pink-400 hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]"
                        onEnter={handleMouseEnter}
                        onLeave={handleMouseLeave}
                    />

                    {/* Botón 4: PAIC Platform */}
                    <ProjectButton
                        icon={<Server size={24} />}
                        label="PAIC.com.co"
                        sub="SaaS Completo"
                        color="hover:bg-blue-600/80 hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                        onEnter={handleMouseEnter}
                        onLeave={handleMouseLeave}
                    />

                    {/* Botón 5: n8n Automation */}
                    <ProjectButton
                        icon={<Code size={24} />}
                        label="n8n Workflows"
                        sub="Automation"
                        color="hover:bg-orange-600/80 hover:border-orange-400 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"
                        onEnter={handleMouseEnter}
                        onLeave={handleMouseLeave}
                    />

                    {/* Botón 6: AutoGen */}
                    <ProjectButton
                        icon={<Bot size={24} />}
                        label="AutoGen Agents"
                        sub="Multi-Agent Systems"
                        color="hover:bg-indigo-600/80 hover:border-indigo-400 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                        onEnter={handleMouseEnter}
                        onLeave={handleMouseLeave}
                    />

                </div>
            </div>
        </div>
    );
}

// Componente de Botón Reutilizable
function ProjectButton({ icon, label, sub, onEnter, onLeave, color = "hover:bg-white/20" }) {
    return (
        <button
            className={`group relative flex flex-col items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md transition-all duration-300 ${color} hover:-translate-y-2`}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            <div className="mb-2 text-white/90 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <span className="font-bold text-sm text-white">{label}</span>
            <span className="text-[10px] text-white/60 mt-1">{sub}</span>

            {/* Indicador de 'Click' visual */}
            <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/30 transition-all duration-500"></div>
        </button>
    );
}