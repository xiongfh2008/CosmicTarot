
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for ambient music
    audioRef.current = new Audio();
    // Note: In a real implementation, you'd host these audio files
    // For now, we'll use a placeholder that won't actually play
    audioRef.current.src = '/ambient-music.mp3';
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Handle promise rejection gracefully for browsers that block autoplay
        audioRef.current.play().catch(() => {
          console.log('Audio playback prevented by browser');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleMusic, volume, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
