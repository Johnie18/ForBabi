"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const images = ["/portrait.jpg", "/images/img2.jpg", "/images/img3.jpg"];
  const [current, setCurrent] = useState(0);
  const [hearts, setHearts] = useState<{ left: string; duration: string; delay: string }[]>([]);
  const [showPopover, setShowPopover] = useState(false); // popover state

  useEffect(() => {
    const arr = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      duration: `${5 + Math.random() * 5}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setHearts(arr);
  }, []);

  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-pink-100 overflow-hidden p-4">

      {/* Background floating hearts */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {hearts.map((heart, i) => (
          <div
            key={i}
            className="absolute text-pink-400 text-3xl animate-float"
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

      {/* Main card */}
      <div className="relative z-10 flex flex-col items-center p-6 bg-white/30 backdrop-blur-md rounded-xl shadow-2xl max-w-3xl text-center">

        <h1 className="text-3xl font-bold text-red-500 mb-4">
          💌 HAPPY VALENTINE'S BABI 💌
        </h1>

        {/* Slider */}
        <div className="relative w-full h-96 overflow-hidden">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? "opacity-100" : "opacity-0"}`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              <p className="font-mono text-xs sm:text-sm md:text-base lg:text-lg leading-snug whitespace-pre-wrap">
                {`HAPPYVALENTINESBABIHAPPYVALENTINESBABI`}
              </p>
            </div>
          ))}

          <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/70 z-20">
            ◀
          </button>
          <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/70 z-20">
            ▶
          </button>
        </div>

        {/* Popover Button */}
        <div className="mt-6 w-full max-w-md flex flex-col gap-3">
          <button
            onClick={() => setShowPopover(!showPopover)}
            className="w-full bg-red-500 text-white font-bold py-2 rounded-md hover:bg-red-600 transition"
          >
            {showPopover ? "Hide Message" : "Show Message"}
          </button>
        </div>

        {/* Popover */}
        {showPopover && (
          <div className="absolute top-40 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg p-4 z-30 max-w-xs text-center animate-fade-in">
            <p className="text-red-500 font-semibold">
              💖 This is the special text you typed! 💖
            </p>
          </div>
        )}

        {/* Floating hearts inside card */}
        <div className="flex flex-wrap justify-center mt-6 gap-2">
          <span className="animate-pulse text-2xl text-red-400">💖</span>
          <span className="animate-pulse text-2xl text-pink-400">💗</span>
          <span className="animate-pulse text-2xl text-pink-500">💘</span>
          <span className="animate-pulse text-2xl text-red-500">💕</span>
        </div>
      </div>

      {/* Footer hearts */}
      <div className="absolute bottom-10 flex gap-2 animate-bounce z-10 text-3xl text-pink-500">
        💖 💕 💘 💗 💓
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(100vh) scale(0.8); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-10vh) scale(1); opacity: 0; }
        }
        .animate-float {
          animation-name: float;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
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
