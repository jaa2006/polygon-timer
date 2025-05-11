import React, { useState } from 'react';
import Timer from './components/Timer';
import SplashScreen from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-4">
        <main className="w-full max-w-lg bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8">
          <Timer initialDuration={180} loop={true} />
        </main>
        
        <footer className="mt-8 text-center text-gray-400 text-sm">
          <p>Click on time presets to change the duration</p>
          <p className="mt-1">The timer will automatically restart when complete</p>
        </footer>
      </div>
    </>
  );
}

export default App;