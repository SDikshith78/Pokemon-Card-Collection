import React, { useEffect, useState } from 'react';
import "./loader.css"

export default function Loader() {
  const [showImage, setShowImage] = useState(false);
  const [showHomePage, setShowHomePage] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowImage(true);
    }, 5000); // Show image after 5 seconds

    const timer2 = setTimeout(() => {
      setShowHomePage(true);
    }, 8000); // Show home page after 3 more seconds

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (showHomePage) return null;

  return (
    <div className="loader-container h-screen w-screen flex justify-center items-center bg-black">
      {!showImage ? (
        <div className="relative w-96 h-24 bg-black border-4 border-green-500 rounded-md p-4 overflow-hidden shadow-lg">
          <div className="text-center mb-4 text-green-500 font-mono text-xl relative">
            <span data-text="Initializing..." className="text-glitch">Initializing...</span>
          </div>
          <div className="relative w-full h-2 bg-green-900 rounded overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-green-500 bar-fill"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-green-300 to-transparent bg-size-200 bg-pos-0 bar-glitch"></div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {[...Array(5)].map((_, index) => (
              <div key={index} className={`absolute w-2 h-2 bg-green-500 rounded-full opacity-0 animate-particle-${index + 1}`}></div>
            ))}
          </div>
        </div>
      ) : (
        <img className="animate-scale-up w-100 h-64 object-cover" src="/images/pokemonLoader.png" alt="Loading Complete" />
      )}
    </div>
  );
}
