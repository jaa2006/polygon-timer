import React from 'react';
import { useTimer } from '../hooks/useTimer';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import CircularProgress from './CircularProgress';

interface TimerProps {
  initialDuration?: number;
  loop?: boolean;
  onComplete?: () => void;
}

const Timer: React.FC<TimerProps> = ({
  initialDuration = 60,
  loop = false,
  onComplete,
}) => {
  const {
    currentTime,
    isRunning,
    loopCount,
    duration,
    percentage,
    start,
    pause,
    reset,
    setDuration,
  } = useTimer({
    duration: initialDuration,
    loop,
    onComplete,
  });

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md mx-auto">
      <div className="relative w-full">
        <CircularProgress 
          percentage={percentage} 
          isRunning={isRunning} 
          color={isRunning ? '#3B82F6' : '#9CA3AF'}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <TimerDisplay
            currentTime={currentTime}
            duration={duration}
            loopCount={loopCount}
          />
        </div>
      </div>
      
      <TimerControls
        isRunning={isRunning}
        onStart={start}
        onPause={pause}
        onReset={reset}
        onDurationChange={setDuration}
      />
    </div>
  );
};

export default Timer;