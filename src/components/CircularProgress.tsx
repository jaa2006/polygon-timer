import React, { useRef, useEffect } from 'react';
import anime from 'animejs';
import AnimatedBackground from './AnimatedBackground';

interface CircularProgressProps {
  percentage: number;
  isRunning: boolean;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  isRunning,
  color = '#dc2626',
  size = 250,
  strokeWidth = 10,
}) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const halfSize = size / 2;

  useEffect(() => {
    if (circleRef.current) {
      const offset = circumference - (percentage / 100) * circumference;
      
      anime({
        targets: circleRef.current,
        strokeDashoffset: offset,
        easing: 'easeInOutQuad',
        duration: isRunning ? 800 : 400,
      });
    }
  }, [percentage, circumference, isRunning]);

  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatedBackground />
      </div>
      <svg
        className="transform -rotate-90 relative z-10"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={halfSize}
          cy={halfSize}
          r={radius}
          fill="none"
          stroke="#374151"
          strokeWidth={strokeWidth}
        />
        
        <circle
          ref={circleRef}
          cx={halfSize}
          cy={halfSize}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          className="drop-shadow-[0_0_10px_rgba(220,38,38,0.7)]"
        />
      </svg>
    </div>
  );
};

export default CircularProgress;