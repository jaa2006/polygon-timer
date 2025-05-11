import { useState, useEffect, useRef } from 'react';
import anime from 'animejs';

interface TimerOptions {
  duration: number;
  loop?: boolean;
  autoStart?: boolean;
  onComplete?: () => void;
}

interface TimerState {
  currentTime: number;
  isRunning: boolean;
  loopCount: number;
  duration: number;
  percentage: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setDuration: (seconds: number) => void;
}

export const useTimer = ({
  duration = 60,
  loop = false,
  autoStart = false,
  onComplete,
}: TimerOptions): TimerState => {
  const [currentTime, setCurrentTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [loopCount, setLoopCount] = useState(0);
  const [timerDuration, setTimerDuration] = useState(duration);
  const animeInstance = useRef<anime.AnimeInstance | null>(null);

  const percentage = (currentTime / timerDuration) * 100;

  // Function to initialize or update the timer animation
  const setupTimer = () => {
    // If there's an existing animation, pause it
    if (animeInstance.current) {
      animeInstance.current.pause();
    }

    // Create the new animation
    animeInstance.current = anime({
      duration: currentTime * 1000, // Convert seconds to milliseconds
      easing: 'linear',
      update: (anim) => {
        // Calculate remaining time based on animation progress
        const progress = anim.progress / 100;
        const timeRemaining = timerDuration * (1 - progress);
        setCurrentTime(Math.max(0, timeRemaining));
      },
      complete: () => {
        if (loop) {
          setLoopCount((prev) => prev + 1);
          reset();
          start();
        } else {
          setIsRunning(false);
          onComplete?.();
        }
      },
      autoplay: false,
    });
  };

  // Initialize the timer when the component mounts or duration changes
  useEffect(() => {
    setupTimer();
    
    return () => {
      // Clean up animation on unmount
      if (animeInstance.current) {
        animeInstance.current.pause();
      }
    };
  }, [timerDuration]);

  // Handle play/pause based on isRunning state
  useEffect(() => {
    if (isRunning && animeInstance.current) {
      animeInstance.current.play();
    } else if (animeInstance.current) {
      animeInstance.current.pause();
    }
  }, [isRunning]);

  const start = () => {
    // If timer reached zero, reset before starting
    if (currentTime <= 0) {
      reset();
    }
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setCurrentTime(timerDuration);
    setupTimer();
  };

  const setDuration = (seconds: number) => {
    setTimerDuration(seconds);
    setCurrentTime(seconds);
    setIsRunning(false);
    setupTimer();
  };

  return {
    currentTime,
    isRunning,
    loopCount,
    duration: timerDuration,
    percentage,
    start,
    pause,
    reset,
    setDuration,
  };
};