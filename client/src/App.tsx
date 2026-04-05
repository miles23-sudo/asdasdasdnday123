import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX, Heart } from "lucide-react";

// --- Components ---

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const createHeart = () => {
      const newHeart = {
        id: Math.random(),
        x: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 2,
      };
      setHearts((prev) => [...prev, newHeart]);
      
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, (newHeart.duration + newHeart.delay) * 1000);
    };

    const interval = setInterval(createHeart, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: "110vh", x: `${heart.x}vw`, opacity: 0, scale: 0 }}
            animate={{ 
              y: "-10vh", 
              x: `${heart.x + (Math.random() * 10 - 5)}vw`,
              opacity: [0, 0.8, 0.8, 0],
              scale: [0, heart.size / 15, heart.size / 15, heart.size / 20]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: heart.duration, 
              delay: heart.delay,
              ease: "linear"
            }}
            className="absolute text-rose-300/60"
            style={{ fontSize: heart.size }}
          >
            <Heart fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const PhotoGrid = () => {
  const images = [
    "/images/slide1.png",
    "/images/slide2.png",
    "/images/slide3.png",
    "/images/slide4.png",
    "/images/slide5.png",
    "/images/slide6.png"
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative aspect-square overflow-hidden rounded-xl shadow-xl group cursor-pointer bg-white p-2 border-4 border-rose-100"
        >
          <motion.img
            src={image}
            alt={`Memory ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </div>
  );
};

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        loop
      />
      <button
        onClick={togglePlay}
        className={`w-14 h-14 rounded-full shadow-xl transition-all duration-500 flex items-center justify-center cursor-pointer border-0 ${
          isPlaying ? "bg-rose-500 hover:bg-rose-600 animate-pulse" : "bg-white text-rose-500 hover:bg-gray-50"
        }`}
      >
        {isPlaying ? <Music className="w-6 h-6 text-white" /> : <VolumeX className="w-6 h-6" />}
      </button>
    </div>
  );
};


// --- Main Page ---

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-serif overflow-x-hidden">
      {/* Audio Toggle */}
      <AudioPlayer />

      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center bg-romantic-gradient overflow-hidden">
        <FloatingHearts />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="z-20 text-center px-4"
        >
          <h1 className="font-cursive text-6xl md:text-8xl lg:text-9xl text-white font-bold tracking-wider animate-glow mb-6 leading-tight">
            Happy Birthday<br />My Love
          </h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <p className="text-rose-100 text-lg md:text-2xl font-serif tracking-widest italic">
              Scroll down for your surprise
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-4 flex justify-center text-rose-200"
            >
              ↓
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Photo Grid Section */}
      <section className="py-24 px-4 bg-background relative">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold italic mb-4">Our Beautiful Memories</h2>
          <div className="w-24 h-1 bg-rose-200 mx-auto rounded-full" />
        </div>
        <PhotoGrid />
      </section>

      {/* Video Section */}
      <section className="py-24 px-4 bg-rose-50/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold italic mb-4">Our Song</h2>
          <div className="w-24 h-1 bg-rose-200 mx-auto rounded-full mb-12" />
          
          <div className="relative p-2 md:p-6 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(225,29,72,0.1)] border border-rose-100">
            <div className="absolute -top-4 -left-4 text-rose-300 transform -rotate-12">
              <Heart className="w-12 h-12" fill="currentColor" />
            </div>
            <div className="absolute -bottom-4 -right-4 text-rose-300 transform rotate-12">
              <Heart className="w-10 h-10" fill="currentColor" />
            </div>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/5">
              <iframe
                src="https://www.youtube.com/embed/450p7goxZqg?autoplay=1&mute=1"
                title="Our Song"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Love Letter Section */}
      <section className="py-32 px-4 relative flex justify-center items-center overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-rose-100/30 blur-3xl pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative max-w-3xl w-full paper-texture p-8 md:p-16 rounded-sm rotate-[-1deg]"
        >
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-[80%] h-px bg-rose-900/10" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[80%] h-px bg-rose-900/10" />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 h-full max-h-[80%] w-px bg-rose-900/10" />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 h-full max-h-[80%] w-px bg-rose-900/10" />

          <h3 className="font-cursive text-4xl text-rose-900/40 text-center mb-8">A Letter For You</h3>
          
          <div className="font-handwriting text-2xl md:text-3xl leading-relaxed md:leading-loose text-slate-800 space-y-6">
            <p>My dearest love,</p>
            <p>
              On this special day, I want you to know how deeply grateful I am to have you in my life. 
              Every moment with you is a treasure, every smile you share lights up my world.
            </p>
            <p>
              You are my greatest adventure, my safest harbor, and my most cherished dream come true. 
              Happy Birthday, my love — may this day be as beautiful as you make every day for me.
            </p>
            <p className="text-right mt-12 pr-8">
              Forever yours,
              <br />
              <Heart className="inline-block w-6 h-6 text-rose-600 mt-2" fill="currentColor" />
            </p>
          </div>
          
          {/* Wax Seal effect */}
          <div className="absolute bottom-8 right-8 w-16 h-16 bg-red-800 rounded-full flex items-center justify-center shadow-lg border-2 border-red-900 rotate-12 mix-blend-multiply opacity-90">
            <Heart className="w-8 h-8 text-red-100" fill="currentColor" />
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-rose-950 text-rose-200 text-center flex flex-col items-center gap-4">
        <Heart className="w-8 h-8 text-rose-400 animate-pulse" fill="currentColor" />
        <p className="font-serif italic text-lg tracking-wide">Made with love, just for you ♥</p>
      </footer>
    </div>
  );
}

export default App;