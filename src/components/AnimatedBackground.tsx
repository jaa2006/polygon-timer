import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimatedBackground: React.FC = () => {
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const polygonRef = useRef<SVGPolygonElement>(null);

  useEffect(() => {
    anime({
      targets: [turbulenceRef.current, displacementRef.current],
      baseFrequency: [0.05, 0],
      scale: [15, 1],
      duration: 4000,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true
    });

    anime({
      targets: polygonRef.current,
      points: [
        '64 68.64 8.574 100 63.446 67.68 64 4 64.554 67.68 119.426 100',
        '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96'
      ],
      duration: 3000,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg width="100%" height="100%" viewBox="0 0 128 128" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="displacementFilter">
            <feTurbulence
              ref={turbulenceRef}
              type="turbulence"
              numOctaves="2"
              baseFrequency="0"
              result="turbulence"
            />
            <feDisplacementMap
              ref={displacementRef}
              in2="turbulence"
              in="SourceGraphic"
              scale="1"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <polygon
          ref={polygonRef}
          points="64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96"
          className="fill-red-600/30 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]"
          filter="url(#displacementFilter)"
        />
      </svg>
    </div>
  );
};

export default AnimatedBackground;