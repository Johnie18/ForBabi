"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const images = [
    "/image1.jpg","/image2.jpeg","/image3.jpeg","/image4.jpeg","/image5.jpeg",
    "/image6.jpeg","/image7.jpeg","/image8.jpeg","/image9.jpeg","/image10.jpeg",
    "/image11.jpeg","/image12.jpeg","/image13.jpeg","/image14.jpeg","/image15.jpeg",
    "/image16.jpeg","/image17.jpeg","/image18.jpeg","/image19.jpeg","/image20.jpeg",
    "/image21.jpeg",
  ];

  const [current, setCurrent] = useState(0);
  const [hearts, setHearts] = useState<any[]>([]);
  const [cardHearts, setCardHearts] = useState<any[]>([]);
  const [showPopover, setShowPopover] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [musicStarted, setMusicStarted] = useState(false);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setMusicStarted(true);
    }
  };

  useEffect(() => {
    const arr = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      duration: `${5 + Math.random() * 5}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setHearts(arr);

    const card = [...Array(25)].map(() => ({
      left: `${Math.random() * 100}%`,
      duration: `${4 + Math.random() * 4}s`,
      delay: `${Math.random() * 4}s`,
      size: `${16 + Math.random() * 16}px`,
    }));
    setCardHearts(card);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-pink-100 overflow-hidden p-4">

      {!musicStarted && (
        <div
          onClick={startMusic}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white text-center cursor-pointer"
        >
          <div>
            <h1 className="text-3xl font-bold mb-4">💖 Tap Here BABI! 💖</h1>
            <p className="opacity-80">Enjoy the show…</p>
          </div>
        </div>
      )}

      <audio ref={audioRef} loop>
        <source src="/romantic.mp3" type="audio/mpeg" />
      </audio>

      {/* background hearts */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {hearts.map((heart, i) => (
          <div
            key={i}
            className="absolute text-pink-400 text-3xl animate-float pointer-events-none"
            style={{
              left: heart.left,
              animationDuration: heart.duration,
              animationDelay: heart.delay,
            }}
          >
            💖
          </div>
        ))}
      </div>

      {/* CARD */}
      <div className="relative z-10 flex flex-col items-center p-4 sm:p-6 bg-pink rounded-xl shadow-2xl w-full max-w-5xl text-center overflow-hidden">

        {/* card hearts */}
        <div className="absolute inset-0 pointer-events-none">
          {cardHearts.map((heart, i) => (
            <div
              key={i}
              className="absolute animate-float2 text-pink-300 pointer-events-none"
              style={{
                left: heart.left,
                fontSize: heart.size,
                animationDuration: heart.duration,
                animationDelay: heart.delay,
              }}
            >
              💗
            </div>
          ))}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-red-500 mb-4 relative z-10">
          💌 HAPPY VALENTINE'S BABI 💌
        </h1>

        {/* slider */}
        <div className="relative w-full h-[50vh] sm:h-[70vh] max-h-[650px] overflow-hidden rounded-lg z-10">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          ))}
        </div>

        {/* controls */}
        <div className="flex gap-4 mt-4 z-10">
          <button
            onClick={prevImage}
            className="bg-white/70 rounded-full px-5 py-3 hover:bg-white text-lg"
          >
            ◀
          </button>
          <button
            onClick={nextImage}
            className="bg-white/70 rounded-full px-5 py-3 hover:bg-white text-lg"
          >
            ▶
          </button>
        </div>

        {/* message button */}
        <div className="mt-6 w-full max-w-md z-20">
          <button
            onClick={() => setShowPopover(true)}
            className="w-full bg-red-500 text-white font-bold py-3 rounded-md hover:bg-red-600 active:scale-95 transition text-lg"
          >
            Open The Message!
          </button>
        </div>

        <div className="flex flex-wrap justify-center mt-6 gap-2 z-10 text-xl">
          💖 💗 💘 💕
        </div>
      </div>

      {/* modal */}
      {showPopover && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 text-center animate-fade-in">
            <p className="text-red-500 font-semibold leading-relaxed text-lg">
              💖 Happy Valentines Babi. Thankyou gd babi sa tanan nga sacrifice kg pagpalangga. Pag atipan sakon kg pag inchindi baii Pakabakod lang babi. Godbless and Goodluck sa Board Exam mo babi ari lang kodi para simo para updan ka sng mga rants kg stress mo.. tunga tungon tlg ang Problema ah hahahaha sige lg after pila ka months ma permahan Babi maka bakal2 nmn ta kag ka bawi nako simo Babi Thank You gid babi. Iloveyousomuch Babi Thankyou sa tanan2. Lets to dis ah Kabay pa tanan ta nga plans makwa ta. Amat2 lang babi. HAPPY VALENTINE'S BABI ILOVEYOU ALWAYS 💖
              <br />BY: DENVER DEV
            </p>

            <button
              onClick={() => setShowPopover(false)}
              className="mt-4 w-full bg-red-500 text-white font-bold py-3 rounded-md hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(100vh); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-10vh); opacity: 0; }
        }

        @keyframes float2 {
          0% { transform: translateY(110%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-10%); opacity: 0; }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-float2 {
          animation: float2 linear infinite;
        }

        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
