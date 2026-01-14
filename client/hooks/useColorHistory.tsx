import { useState } from 'react';

export const useColorHistory = (initialColors: any, updateColor: (key: string, value: string) => void) => {
  const [history, setHistory] = useState([initialColors]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleUndo = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const prevColors = history[prevIndex];

      Object.entries(prevColors).forEach(([key, value]) => {
        updateColor(key as any, value as string);
      });

      setCurrentIndex(prevIndex);
    }
  };

  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextColors = history[nextIndex];

      Object.entries(nextColors).forEach(([key, value]) => {
        updateColor(key as any, value as string);
      });

      setCurrentIndex(nextIndex);
    }
  };

  const saveToHistory = (colors: any) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(colors);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  return {
    handleUndo,
    handleRedo,
    saveToHistory,
    canUndo,
    canRedo,
  };
};
