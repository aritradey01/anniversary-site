import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const App = () => {
  // --- STATE ---
  const [isLocked, setIsLocked] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [hasAgreed, setHasAgreed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ top: '0px', left: '0px' });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrollOpen, setIsScrollOpen] = useState(false);
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const audioRef = useRef(null);

  // --- CONFIGURATION ---
  const CORRECT_PASSWORD = "1902"; 
  const ANNIVERSARY_DATE = new Date(2023, 1, 19, 0, 0, 0); 

  // --- CELEBRATION LOGIC (THE MISSING PIECE) ---
  const triggerCelebration = () => {
    const end = Date.now() + (4 * 1000); // 4 seconds of confetti
    const colors = ['#FF69B4', '#FFB6C1', '#FFFFFF'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
        zIndex: 9999 // Ensures it shows over the white boxes
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
        zIndex: 9999
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  // --- LIVE COUNTER LOGIC ---
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = now - ANNIVERSARY_DATE.getTime();
      setTimeTogether({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- MEMORIES DATA ---
  const memories = [
    { url: "/pic1.jpg", caption: "Where it Began", date: "Feb 19", memory: "The day my life got a lot brighter." },
    { url: "/pic2.jpg", caption: "Durga Puja", date: "Oct 20", memory: "First Puja Together" },
    { url: "/pic3.jpg", caption: "Picnic", date: "Dec 29", memory: "First Picnic date" },
    { url: "/pic4.jpg", caption: "Saraswati Puja", date: "Feb 14", memory: "First Saraswati Puja and Valentine's Day Together" },
    { url: "/pic5.jpg", caption: "Birthday Surprise", date: "July 11", memory: "Happiness after the surprise Birthday present" },
    { url: "/pic6.jpg", caption: "Start of long distance", date: "Sept 18", memory: "Long distance Starts" },
    { url: "/pic7.jpg", caption: "Happy New Year", date: "Jan 1", memory: "First New Year Together" },
    { url: "/pic8.jpg", caption: "Puja 2k25", date: "Sept 28", memory: "Enjoying Puja with You" },
    { url: "/pic9.jpg", caption: "Cafe Date", date: "Jan 1", memory: "Random Cafe Date" },
  ];

  const moveNoButton = () => {
    const maxWidth = window.innerWidth > 640 ? 240 : 120;
    const maxHeight = window.innerHeight > 640 ? 160 : 80;
    const randomX = Math.floor(Math.random() * maxWidth) - (maxWidth / 2);
    const randomY = Math.floor(Math.random() * maxHeight) - (maxHeight / 2);
    setNoButtonPos({ top: `${randomY}px`, left: `${randomX}px` });
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passwordInput === CORRECT_PASSWORD) {
      setIsLocked(false);
      setIsPlaying(true);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, zIndex: 9999 });
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    } else { setPasswordInput(''); }
  };

  if (isLocked) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FFF0F5] font-serif p-4">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl text-center max-w-sm w-full border-4 border-pink-100">
          <div className="text-5xl mb-6 animate-bounce text-pink-500">🌸</div>
          <h2 className="text-2xl font-bold mb-6 text-pink-500 italic">Memories of Us</h2>
          <form onSubmit={handleUnlock} className="space-y-6">
            <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter Our Date (DDMM)" className="w-full text-center border-b-2 border-pink-200 focus:border-pink-500 outline-none text-2xl pb-2 text-pink-400 bg-transparent" />
            <button className="w-full py-4 rounded-full bg-pink-400 text-white font-bold hover:bg-pink-500 transition-all shadow-lg">Unlock Memories</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-[#FFF0F5] font-serif text-gray-800 selection:bg-pink-200 overflow-x-hidden">
      <audio ref={audioRef} loop src="/aapki_nazron.mp3" />

      {/* Floating Music Player */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <div className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-2xl border-2 border-pink-100 flex items-center gap-4 transition-all hover:pr-8">
          <button onClick={() => { if(isPlaying) audioRef.current.pause(); else audioRef.current.play(); setIsPlaying(!isPlaying); }} 
            className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center hover:bg-pink-600 shadow-lg">
            {isPlaying ? "⏸" : "▶"}
          </button>
          <div className="hidden group-hover:block animate-fade-in whitespace-nowrap">
            <p className="text-xs font-bold text-pink-600">Aapko Nazron Ne Samjha</p>
          </div>
        </div>
      </div>

      {/* Hero & Counter Section */}
      <header className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-white/60 to-transparent">
        <h1 className="text-5xl md:text-8xl font-bold text-pink-500 mb-4 tracking-tighter drop-shadow-sm">Aritra & Santana</h1>
        <p className="text-pink-400 italic text-xl mb-12">"Apki Nazron ne Samjha, Pyaar ke kabil humein..."</p>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 bg-white/70 p-6 rounded-[40px] shadow-inner backdrop-blur-md border-2 border-white">
          {Object.entries(timeTogether).map(([label, value]) => (
            <div key={label} className="flex flex-col min-w-[55px]">
              <span className={`text-3xl md:text-6xl font-bold text-pink-600 ${label === 'seconds' ? 'animate-pulse' : ''}`}>{value}</span>
              <span className="text-[10px] uppercase text-pink-400 font-bold tracking-widest">{label}</span>
            </div>
          ))}
        </div>

        <div className="relative group">
          <div className="w-56 h-56 md:w-80 md:h-80 rounded-[50px] border-[8px] border-white shadow-2xl overflow-hidden rotate-2 transition-all group-hover:rotate-0 duration-700">
            <img src="/hero.jpg" alt="Us" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -top-4 -right-4 bg-white p-4 rounded-full shadow-lg animate-bounce text-2xl">💖</div>
        </div>
      </header>

      {/* Memory Gallery */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-20">
        {memories.map((m, i) => (
          <div key={i} className="bg-white p-4 pb-10 shadow-xl transform transition hover:scale-105 -rotate-1 group">
            <div className="aspect-[4/5] overflow-hidden mb-6 bg-pink-50">
              <img src={m.url} alt={m.caption} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="px-2 text-center">
              <span className="text-[10px] font-bold text-pink-300 uppercase tracking-widest">{m.date}</span>
              <h3 className="text-xl text-pink-600 mb-2 font-bold">{m.caption}</h3>
              <p className="text-gray-500 text-sm italic">"{m.memory}"</p>
            </div>
          </div>
        ))}
      </section>

      {/* Scroll Letter Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        {!isScrollOpen ? (
          <button onClick={() => setIsScrollOpen(true)} className="bg-white border-2 border-dashed border-pink-300 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all group">
            <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform">✉️</span>
            <h3 className="text-xl font-bold text-pink-500 uppercase tracking-widest italic font-serif">Open it when you miss me</h3>
          </button>
        ) : (
          <div className="overflow-hidden bg-[#fdf5e6] shadow-2xl mx-auto border-x-[15px] border-[#d2b48c] rounded-lg py-12 px-10 animate-fade-in relative max-w-lg">
            <button onClick={() => setIsScrollOpen(false)} className="absolute top-4 right-4 text-pink-300 hover:text-pink-500 text-3xl">×</button>
            <h4 className="text-3xl font-bold text-pink-600 mb-6 italic text-left">My Dearest Santana,</h4>
            <div className="text-left text-gray-700 space-y-4 text-lg italic leading-relaxed">
              <p>Since Feb 19, 2023, you've made my life a masterpiece. When things get tough, remember this page and how much I love you.</p>
              <p>You are the most beautiful bug I've ever had to debug—and trust me, I never want to fix it. Stay with me forever.</p>
              <p className="font-bold text-pink-500 text-right">— Forever Yours, Babai</p>
            </div>
          </div>
        )}
      </section>

      {/* Secret Question Footer */}
      <footer className="mt-20 text-center px-4 pb-10">
        <div className="inline-block bg-white/80 backdrop-blur-md p-8 md:p-16 rounded-[40px] border-2 border-pink-100 shadow-2xl max-w-2xl w-full">
          {!hasAgreed ? (
            <>
              <p className="text-xl md:text-3xl text-pink-600 leading-relaxed italic mb-10">
                "তিনটি বছর, অজস্র স্মৃতি। তোমাকে ছাড়া আমার পৃথিবীটা অসম্পূর্ণ। <br />
                Will you grow old with me and be my favorite person to 
                <span className="font-bold"> resolve every conflict and debug life </span> with forever?"
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[140px]">
                <button 
                  onClick={() => { 
                    setHasAgreed(true); 
                    setTimeout(() => {
                      triggerCelebration(); 
                    }, 200);
                  }} 
                  className="bg-pink-500 text-white px-12 py-4 rounded-full font-bold shadow-lg z-10 w-full sm:w-auto"
                >
                  Yes!
                </button>
                <button onMouseEnter={moveNoButton} onTouchStart={moveNoButton} style={{ position: 'relative', top: noButtonPos.top, left: noButtonPos.left }}
                  className="bg-gray-100 text-gray-400 px-12 py-4 rounded-full font-bold w-full sm:w-auto transition-all">No</button>
              </div>
            </>
          ) : (
            <div className="animate-fade-in py-10">
              <h2 className="text-5xl text-pink-600 font-bold mb-6">Yay! ❤️</h2>
              <p className="text-2xl text-pink-500 italic">You made the right choice! I love you so much.<br/>Forever yours — Babai</p>
              <div className="text-6xl mt-6">👨‍💻❤️👩‍⚖️</div>
            </div>
          )}
        </div>

        {/* --- LEGAL & TECH DISCLAIMER --- */}
        <div className="mt-20 opacity-40 text-[10px] text-pink-400 uppercase tracking-[0.2em] font-bold">
          <p>Warning: This love is protected by infinite encryption</p>
          <p>and is legally binding for a lifetime.</p>
          <p className="mt-2">© 2023-{new Date().getFullYear()} Aritra & Santana | All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default App;