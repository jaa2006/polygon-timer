import React from 'react';
import { Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onDurationChange: (seconds: number) => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
  onDurationChange,
}) => {
  const presetTimes = [
    { label: '1m', seconds: 60 },
    { label: '3m', seconds: 180 },
    { label: '5m', seconds: 300 },
    { label: '10m', seconds: 600 },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-center space-x-4">
        <button
          onClick={isRunning ? onPause : onStart}
          className={`p-4 rounded-full ${
            isRunning 
              ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
              : 'bg-red-600 hover:bg-red-700 text-white'
          } transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button
          onClick={onReset}
          className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          aria-label="Reset timer"
        >
          <RotateCcw size={24} />
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {presetTimes.map((preset) => (
          <button
            key={preset.label}
            onClick={() => onDurationChange(preset.seconds)}
            className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium transition-colors duration-300 flex items-center"
          >
            <TimerIcon size={16} className="mr-1" />
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimerControls;