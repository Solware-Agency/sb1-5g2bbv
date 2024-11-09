import React, { useState, useEffect, useCallback } from 'react';
import { Timer, Pause, Play, RotateCcw } from 'lucide-react';

function App() {
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [inputMinutes, setInputMinutes] = useState<string>('');

  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning && timeInSeconds > 0) {
      interval = setInterval(() => {
        setTimeInSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timeInSeconds === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeInSeconds]);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handleStart = () => {
    const minutes = parseFloat(inputMinutes);
    if (minutes > 0) {
      setTimeInSeconds(Math.floor(minutes * 60));
      setIsRunning(true);
      setInputMinutes('');
    }
  };

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeInSeconds(0);
    setInputMinutes('');
  };

  const progress = timeInSeconds > 0 ? (timeInSeconds / (parseFloat(inputMinutes) * 60 || timeInSeconds)) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Timer className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800 ml-2">Minimal Timer</h1>
        </div>

        <div className="relative mb-8">
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="text-center mb-8">
          <span className="font-mono text-6xl font-bold text-gray-800">
            {formatTime(timeInSeconds)}
          </span>
        </div>

        {!isRunning && timeInSeconds === 0 ? (
          <div className="flex items-center gap-2 mb-6">
            <input
              type="number"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              placeholder="Enter minutes"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              min="0"
              step="0.5"
            />
            <button
              onClick={handleStart}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
            >
              Start
            </button>
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            <button
              onClick={toggleTimer}
              className="p-4 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
            >
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={resetTimer}
              className="p-4 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;