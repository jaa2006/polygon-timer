import React, { useEffect, useState, useRef } from 'react';
import anime from 'animejs';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const polygonRef = useRef<SVGPolygonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = anime.timeline({
      complete: () => {
        setIsAnimating(false);
        setTimeout(onComplete, 300);
      }
    });

    timeline
      .add({
        targets: polygonRef.current,
        points: [
          '64 68.64 8.574 100 63.446 67.68 64 4 64.554 67.68 119.426 100',
          '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96'
        ],
        duration: 2000,
        easing: 'easeInOutQuad',
        loop: 2,
        direction: 'alternate'
      })
      .add({
        targets: '.splash-text',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: anime.stagger(200),
        easing: 'easeOutQuad',
      })
      .add({
        targets: containerRef.current,
        opacity: 0,
        duration: 800,
        easing: 'easeInOutQuad',
        delay: 1000
      });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 bg-gray-900 flex flex-col items-center justify-center transition-opacity duration-300 ${
        !isAnimating ? 'pointer-events-none' : ''
      }`}
    >
      <div className="relative w-48 h-48 mb-8">
        <svg width="100%" height="100%" viewBox="0 0 128 128" className="text-red-600">
          <polygon
            ref={polygonRef}
            points="64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96"
            className="fill-red-600/30 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]"
          />
        </svg>
      </div>
      <h1 className="splash-text text-3xl font-extrabold italic text-red-500 font-['Orbitron'] tracking-wider drop-shadow-[0_0_8px_rgba(220,38,38,0.5)] mb-2 opacity-0">
        POLYGON TIMER
      </h1>
      <p className="splash-text text-red-400/80 font-['Orbitron'] tracking-wide text-sm font-bold italic drop-shadow-[0_0_5px_rgba(220,38,38,0.3)] opacity-0">
        by fixcode studio
      </p>
    </div>
  );
};

export default SplashScreen;