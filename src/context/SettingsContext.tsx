import React, { createContext, useContext, useState, useRef, ReactNode, useEffect } from 'react';

export type Language = 'zh-CN' | 'en' | 'ru';

interface SettingsContextType {
  backgroundImage: string | null;
  setBackgroundImage: (image: string | null) => void;
  backgroundVideo: string | null;
  setBackgroundVideo: (video: string | null) => void;
  audioFile: File | null;
  setAudioFile: (file: File | null) => void;
  audioUrl: string | null;
  setAudioUrl: (url: string | null) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
  transparency: number;
  setTransparency: (transparency: number) => void;
  isWorkspaceVisible: boolean;
  setIsWorkspaceVisible: (visible: boolean) => void;
  timerDuration: number | null;
  setTimerDuration: (duration: number | null) => void;
  timerRemaining: number | null;
  setTimerRemaining: (remaining: number | null) => void;
  isTimerRunning: boolean;
  setIsTimerRunning: (running: boolean) => void;
  isTimerPaused: boolean;
  setIsTimerPaused: (paused: boolean) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [backgroundVideo, setBackgroundVideo] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [transparency, setTransparency] = useState<number>(0.3);
  const [isWorkspaceVisible, setIsWorkspaceVisible] = useState<boolean>(true);
  const [timerDuration, setTimerDuration] = useState<number | null>(null);
  const [timerRemaining, setTimerRemaining] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('zh-CN');
  const audioRef = useRef<HTMLAudioElement>(null);

  // Load default background and music if not set
  useEffect(() => {
    if (!backgroundImage && !backgroundVideo) {
      setBackgroundVideo('/default-bg.jpg.mp4');
    }
    if (!audioUrl && !audioFile) {
      setAudioUrl('/default-music.wav');
    }
  }, []);

  // Handle audio playback
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);

  // Timer countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && !isTimerPaused && timerRemaining !== null && timerRemaining > 0) {
      interval = setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev === null || prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerRunning, isTimerPaused, timerRemaining]);

  return (
    <SettingsContext.Provider
      value={{
        backgroundImage,
        setBackgroundImage,
        backgroundVideo,
        setBackgroundVideo,
        audioFile,
        setAudioFile,
        audioUrl,
        setAudioUrl,
        isPlaying,
        setIsPlaying,
        volume,
        setVolume,
        transparency,
        setTransparency,
        isWorkspaceVisible,
        setIsWorkspaceVisible,
        timerDuration,
        setTimerDuration,
        timerRemaining,
        setTimerRemaining,
        isTimerRunning,
        setIsTimerRunning,
        isTimerPaused,
        setIsTimerPaused,
        language,
        setLanguage,
        audioRef,
      }}
    >
      {children}
      {/* Audio element moved here to persist across component unmounts */}
      <audio ref={audioRef} src={audioUrl || undefined} loop style={{ display: 'none' }} />
    </SettingsContext.Provider>
  );
};
