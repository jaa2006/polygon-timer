import React from 'react';

interface TimerDisplayProps {
  currentTime: number;
  duration: number;
  loopCount: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ currentTime, duration, loopCount }) => {
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const percentage = Math.min(100, (currentTime / duration) * 100);

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="text-5xl font-bold text-red-500 font-mono tracking-wider drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]">
        {formatTime(currentTime)}
      </div>
      
      <div className="w-full bg-gray-800 rounded-full h-2.5">
        <div 
          className="bg-red-600 h-2.5 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.7)]" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between w-full text-gray-400">
        <span>0:00</span>
        <span>{formatTime(duration)}</span>
      </div>
      
      <div className="text-center mt-4">
        <span className="text-gray-300 text-sm">Cycles completed:</span>
        <span className="ml-2 px-3 py-1 bg-red-900/50 text-red-200 rounded-full font-mono">{loopCount}</span>
      </div>
    </div>
  );
};

export default TimerDisplay;