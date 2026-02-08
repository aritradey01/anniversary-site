import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const App = () => {
  // --- STATE ---
  const [showSummons, setShowSummons] = useState(true); 
  const [isLocked, setIsLocked] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [hasAgreed, setHasAgreed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ top: '0px', left: '0px' });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrollOpen, setIsScrollOpen] = useState(false);
  const [isRoseRevealed, setIsRoseRevealed] = useState(false);
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [flippedIndex, setFlippedIndex] = useState(null);

  const audioRef = useRef(null);

  // --- CONFIGURATION ---
  const CORRECT_PASSWORD = "1902"; 
  const ANNIVERSARY_DATE = new Date(2023, 2, 19, 0, 0, 0); //

  // --- CELEBRATION LOGIC ---
  const triggerCelebration = () => {
    const end = Date.now() + (5 * 1000);
    const colors = ['#FF69B4', '#FFB6C1', '#FFFFFF'];
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors: colors, zIndex: 9999 });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors: colors, zIndex: 9999 });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  // --- LIVE COUNTER ---
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

  const moveNoButton = () => {
    const randomX = Math.floor(Math.random() * 240) - 120;
    const randomY = Math.floor(Math.random() * 120) - 60;
    setNoButtonPos({ top: `${randomY}px`, left: `${randomX}px` });
  };

  const memories = [
    { url: "/pic1.jpg", caption: "Where it Began", date: "Feb 19, 2023", memory: "My life didn't brighten with a sunrise, but with your smile. I realized I wasn't walking alone anymore—the world wasn't an obstacle, but a map for us to explore together. 🧭✨" },
    { url: "/pic2.jpg", caption: "Durga Puja", date: "Oct 2024", memory: "Nothing beats the memory of our first Puja. Seeing you in that saree for the first time... you looked breathtaking. 🦚✨🙏" },
    { url: "/pic3.jpg", caption: "First Picnic", date: "Dec 29, 2024", memory: "Looking back at the moments that felt like nothing at the time, but mean everything now. Simple, sweet, and unforgettable. 🍯🧸✨" },
    { url: "/pic4.jpg", caption: "Saraswati Puja", date: "Feb 14, 2025", memory: "Celebrated our love and traditions together. There’s nothing more special than sharing these roots with you. 🪔❤️✨" },
    { url: "/pic5.jpg", caption: "Birthday Surprise", date: "July 11, 2025", memory: "The happiness on your face was my best gift. Seeing you that joyful made the whole celebration perfect. 🎁🥺❤️" },
    { url: "/pic6.jpg", caption: "Long Distance", date: "Sept 18, 2025", memory: "Distance is just a test to see how far love can travel. No matter the miles, we're always under the same sky. ✈️🌍❤️" },
    { url: "/pic7.jpg", caption: "New Year 2026", date: "Jan 1, 2026", memory: "Starting another year with my favorite person. Here’s to more adventures, more laughter, and more 'us.' 🥂✨❤️." },
    { url: "/pic8.jpg", caption: "Puja 2025", date: "Sept 28, 2025", memory: "Side by side, taking in all the lights and laughter. Enjoying the festivities together. 🎇🧡🧿" },
    { url: "/pic9.jpg", caption: "Cafe Date", date: "Jan 2026", memory: "Simple mornings/evenings. Coffee, conversations, and you. Perfect. ✨☕💭" },
  ];

  // 1. SUMMONS SCREEN
  if (showSummons) {
    return (
      <div className="h-screen bg-[#f3e5ab] flex items-center justify-center p-6 font-serif">
        <div className="max-w-md w-full bg-white p-8 shadow-2xl border-t-[20px] border-pink-500 relative">
          <h2 className="text-center font-bold text-gray-800 underline mb-6 uppercase tracking-widest italic">Court Summons</h2>
          <div className="text-xs space-y-4 text-gray-700 uppercase tracking-tighter">
            <p><strong>Case:</strong> ARITRA_SANTANA_2023</p>
            <p><strong>To:</strong> Advocate Santana</p>
            <p className="normal-case italic border-l-4 border-pink-200 pl-4 py-2">"You are hereby commanded to review the digital evidence of the last 3 years."</p>
            <button onClick={() => setShowSummons(false)} className="w-full mt-8 bg-pink-500 text-white py-3 font-bold hover:bg-pink-600 shadow-lg">RESPOND TO SUMMONS</button>
          </div>
        </div>
      </div>
    );
  }

  // 2. VAULT LOGIN
  if (isLocked) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FFF0F5] p-4 font-serif">
        <div className="bg-white p-10 rounded-[50px] shadow-2xl border-4 border-pink-100 text-center max-w-sm w-full">
          <div className="text-6xl mb-6 animate-bounce">🔐</div>
          <h2 className="text-3xl font-bold text-pink-500 mb-2 italic">Evidence Vault</h2>
          <form onSubmit={handleUnlock} className="space-y-8 mt-6">
            <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Vault Key (DDMM)" className="w-full text-center border-b-2 border-pink-200 outline-none text-2xl pb-2 text-pink-400 bg-transparent" />
            <button className="w-full py-4 rounded-full bg-pink-400 text-white font-bold hover:bg-pink-500 shadow-lg">UNLOCK VAULT</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-[#FFF0F5] font-serif text-gray-800 overflow-x-hidden selection:bg-pink-100">
      <audio ref={audioRef} loop src="/aapki_nazron.mp3" />

      {/* Floating Music Toggle */}
      <button onClick={() => { if(isPlaying) audioRef.current.pause(); else audioRef.current.play(); setIsPlaying(!isPlaying); }} 
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-pink-500 text-white shadow-2xl flex items-center justify-center transform active:scale-90 transition-all">
        {isPlaying ? "⏸" : "▶"}
      </button>

      {/* Hero Header */}
      <header className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-6xl md:text-8xl font-bold text-pink-500 mb-4 drop-shadow-sm font-bold">Aritra & Santana</h1>
        <p className="text-pink-400 italic text-xl mb-12">"Apki Nazron ne Samjha, Pyaar ke kabil humein..."</p>
        <div className="flex flex-wrap justify-center gap-4 bg-white/70 p-6 rounded-[40px] shadow-inner border-2 border-white backdrop-blur-sm">
          {Object.entries(timeTogether).map(([label, value]) => (
            <div key={label} className="flex flex-col min-w-[65px]">
              <span className={`text-3xl md:text-5xl font-bold text-pink-600 ${label==='seconds'?'animate-pulse':''}`}>{value}</span>
              <span className="text-[10px] uppercase text-pink-400 font-bold tracking-widest">{label}</span>
            </div>
          ))}
        </div>
        <div className="w-64 h-64 md:w-80 md:h-80 mt-12 rounded-[50px] border-[10px] border-white shadow-2xl overflow-hidden rotate-2 transition-transform hover:rotate-0 duration-500">
          <img src="/hero.jpg" alt="Us" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* 3D Flip Memory Gallery */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 py-20">
        {memories.map((m, i) => (
          <div key={i} className="perspective-1000 h-[450px] cursor-pointer" onClick={() => setFlippedIndex(flippedIndex === i ? null : i)}>
            <div className={`preserve-3d transition-transform duration-700 w-full h-full relative ${flippedIndex === i ? 'rotate-y-180' : ''}`}>
              {/* Front Face */}
              <div className="backface-hidden bg-white p-4 shadow-xl border-2 border-white w-full h-full">
                <div className="w-full h-[85%] overflow-hidden bg-pink-50">
                   <img src={m.url} alt={m.caption} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="text-center mt-4">
                  <span className="text-[10px] text-pink-300 font-bold uppercase">{m.date}</span>
                  <h3 className="text-pink-600 font-bold">{m.caption}</h3>
                </div>
              </div>
              {/* Back Face */}
              <div className="backface-hidden rotate-y-180 bg-pink-50 p-8 shadow-xl border-4 border-white flex flex-col items-center justify-center text-center w-full h-full">
                <div className="text-4xl mb-4">✍️</div>
                <h3 className="text-xl text-pink-600 font-bold mb-4 italic underline">{m.caption}</h3>
                <p className="text-gray-700 text-lg italic font-bold leading-relaxed">"{m.memory}"</p>
                <span className="mt-8 text-pink-300 text-[10px] font-bold uppercase tracking-widest">Tap to flip back</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Rose Day Special */}
     <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-white/50 backdrop-blur-sm p-10 rounded-[50px] border-2 border-pink-100 shadow-xl relative">
          <h3 className="text-2xl font-bold text-pink-600 mb-8 uppercase tracking-widest italic font-bold">🌹 Rose Day Special 🌹</h3>
          {!isRoseRevealed ? (
            <button onClick={() => setIsRoseRevealed(true)} className="group transition-transform hover:scale-110 active:scale-95">
              <div className="text-8xl animate-pulse">💐</div>
              <p className="mt-4 text-pink-400 font-bold animate-bounce text-sm uppercase">Tap for a surprise</p>
            </button>
          ) : (
            <div className="animate-fade-in flex flex-col items-center">
              <div className="text-9xl mb-6">🌹</div>
              <div className="max-w-md space-y-6">
                <p className="text-2xl font-serif text-pink-600 italic leading-relaxed">"Happy Rose Day, jaan 🌹

                  Ei rose ta just ekta phool na… eta proof je amar girlfriend officially full “golap level beautiful” 😌. Seriously bolchi — tumi amar life-e eshe puro vibe change kore diyecho. Age life chilo normal, ekhon full HD colorful version, shudhu tomar jonno.

                  Tomar smile ta deklei amar mood auto refresh hoy — literally no WiFi needed 😄. Aar haan, jodi konodin amader jhogra hoy (which obviously tomar fault hobe… kidding 😂), tokhon o ami tomakei choose korbo, karon amar favourite problem tao tumi.

                  Tumi amar shanti, amar paglamo, amar best friend, aar amar daily happiness dose. Tai ei Rose Day-te ekta promise — jotoi thorns asuk life-e, ami tomar sathei thakbo… aar tomake irritate o korbo lifetime free service 😜❤️

                  Love you always, amar shona golap 🌹"</p>
                <div className="p-6 bg-pink-50 rounded-2xl border-l-4 border-pink-400 text-left italic font-serif leading-relaxed">"Like this rose, my love for you grows more beautiful every day"</div>
                <p className="text-[10px] text-pink-400 font-bold uppercase tracking-widest font-bold">Status: Rose encrypted and legally delivered.</p>
                <button onClick={() => setIsRoseRevealed(false)} className="text-pink-300 text-xs underline mt-4">Close</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* THE "MISS ME" SCROLL (RESTORED) */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        {!isScrollOpen ? (
          <button onClick={() => setIsScrollOpen(true)} className="bg-white p-12 rounded-[40px] shadow-lg border-2 border-dashed border-pink-300 group hover:border-pink-500 transition-colors">
            <span className="text-6xl block mb-4 transition-transform group-hover:scale-110">✉️</span>
            <p className="font-bold text-pink-500 uppercase tracking-widest italic">Open it when you miss me</p>
          </button>
        ) : (
          <div className="bg-[#fdf5e6] shadow-2xl mx-auto border-x-[20px] border-[#d2b48c] rounded-lg py-12 px-10 animate-fade-in relative max-w-lg">
             <button onClick={() => setIsScrollOpen(false)} className="absolute top-4 right-4 text-pink-300 text-3xl hover:text-pink-500">×</button>
             <h4 className="text-3xl font-bold text-pink-600 mb-6 italic text-left underline">My Dearest Manai,</h4>
             <div className="text-left text-gray-700 space-y-6 text-xl italic leading-relaxed font-bold">
               <p>Hey… jodi tumi eta porcho because tumi amake miss korcho, tahole ekta kotha mone rekho — ami-o probably tomake miss korchi. Life e distance, busy time, ba little misunderstandings thakte pare, but tar mane ei na je feelings change hoye geche. Amader je chhoto chhoto memories, random calls, hasi-maja, late night talks — ogulo ekhono amar kache special.

                Tumi jodi ekhon ektu lonely feel koro, please nijeke ekdom alone mone koro na. Ami always tomar bhalo chai, tomar happiness amar kache important chilo, ache, aar thakbe. Jokhon amar kotha mone porbe, sad hoyo na — smile koro, karon amader moments gulo happy chilo.

                Take a deep breath, relax koro… everything thik hoye jabe. And haan, jodi possible hoy, ekta chhoto smile dio — amar jonno. 🙂
                </p>
               <p className="font-bold text-pink-500 text-right mt-10">— Forever Yours, Babai</p>
             </div>
          </div>
        )}
      </section>

      {/* FINAL PROPOSAL & CELEBRATION */}
      <footer className="mt-20 text-center px-4 pb-32">
        <div className="inline-block bg-white/80 backdrop-blur-md p-8 md:p-20 rounded-[60px] border-2 border-pink-100 shadow-2xl max-w-2xl w-full">
          {!hasAgreed ? (
            <>
              <p className="text-2xl md:text-4xl text-pink-600 leading-relaxed italic mb-12 font-bold px-4">
                "তিনটি বছর, অজস্র স্মৃতি। তোমাকে ছাড়া আমার পৃথিবীটা অসম্পূর্ণ। <br /> Will you grow old with me?"
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative min-h-[160px]">
                <button 
                  onClick={() => { setHasAgreed(true); setTimeout(() => triggerCelebration(), 200); }} 
                  className="bg-pink-500 text-white px-16 py-5 rounded-full font-bold shadow-xl z-10 w-full sm:w-auto hover:bg-pink-600 transition-all text-xl"
                >
                  Yes!
                </button>
                <button 
                  onMouseEnter={moveNoButton} 
                  onTouchStart={moveNoButton}
                  style={{ position: 'relative', top: noButtonPos.top, left: noButtonPos.left }}
                  className="bg-gray-100 text-gray-400 px-16 py-5 rounded-full font-bold w-full sm:w-auto transition-all text-xl"
                >
                  No
                </button>
              </div>
            </>
          ) : (
            <div className="animate-fade-in py-10">
              <h2 className="text-6xl text-pink-600 font-bold mb-8 italic">Yay! ❤️</h2>
              <p className="text-3xl text-pink-500 italic font-bold">Forever yours — Babai</p>
              <div className="text-8xl mt-10 animate-bounce">👨‍💻❤️👩‍⚖️</div>
              <p className="mt-12 text-[10px] text-pink-300 uppercase tracking-[0.4em] font-bold">Encrypted Legacy Secured</p>
            </div>
          )}
        </div>
        <div className="mt-24 opacity-40 text-[10px] text-pink-400 uppercase tracking-[0.2em] font-bold">
          <p>© 2023-{new Date().getFullYear()} © 2023–2026 ARITRA & SANTANA | All Rights Reserved | Designed with ❤️</p>
        </div>
      </footer>
    </div>
  );
};

export default App;