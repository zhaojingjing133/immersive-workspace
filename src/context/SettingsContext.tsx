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
  // Audio Track 2
  audioFile2: File | null;
  setAudioFile2: (file: File | null) => void;
  audioUrl2: string | null;
  setAudioUrl2: (url: string | null) => void;
  isPlaying2: boolean;
  setIsPlaying2: (playing: boolean) => void;
  volume2: number;
  setVolume2: (volume: number) => void;
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
  audioRef2: React.RefObject<HTMLAudioElement>;
  // Video Audio
  videoMuted: boolean;
  setVideoMuted: (muted: boolean) => void;
  videoVolume: number;
  setVideoVolume: (volume: number) => void;
  videoHasAudio: boolean;
  setVideoHasAudio: (hasAudio: boolean) => void;
  videoRef: React.RefObject<HTMLVideoElement>;
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
  // Audio Track 2
  const [audioFile2, setAudioFile2] = useState<File | null>(null);
  const [audioUrl2, setAudioUrl2] = useState<string | null>(null);
  const [isPlaying2, setIsPlaying2] = useState<boolean>(false);
  const [volume2, setVolume2] = useState<number>(0.5);
  const [transparency, setTransparency] = useState<number>(0.3);
  const [isWorkspaceVisible, setIsWorkspaceVisible] = useState<boolean>(true);
  const [timerDuration, setTimerDuration] = useState<number | null>(null);
  const [timerRemaining, setTimerRemaining] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('zh-CN');
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioRef2 = useRef<HTMLAudioElement>(null);
  // Video Audio
  const [videoMuted, setVideoMuted] = useState<boolean>(true);
  const [videoVolume, setVideoVolume] = useState<number>(0.5);
  const [videoHasAudio, setVideoHasAudio] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Load default background and music if not set
  useEffect(() => {
    if (!backgroundImage && !backgroundVideo) {
      setBackgroundVideo('/default-bg.jpg.mp4');
    }
    // Only set default music for track 1, track 2 starts empty
    if (!audioUrl && !audioFile) {
      setAudioUrl('/default-music.wav');
    }
  }, []);

  // Handle audio playback for track 1
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio track 1:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);

  // Handle audio playback for track 2
  useEffect(() => {
    if (audioRef2.current) {
      audioRef2.current.volume = volume2;
      if (isPlaying2) {
        audioRef2.current.play().catch((error) => {
          console.error('Error playing audio track 2:', error);
        });
      } else {
        audioRef2.current.pause();
      }
    }
  }, [isPlaying2, volume2]);

  // Handle video audio
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = videoMuted;
      videoRef.current.volume = videoVolume;
    }
  }, [videoMuted, videoVolume]);

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
        audioFile2,
        setAudioFile2,
        audioUrl2,
        setAudioUrl2,
        isPlaying2,
        setIsPlaying2,
        volume2,
        setVolume2,
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
        audioRef2,
        videoMuted,
        setVideoMuted,
        videoVolume,
        setVideoVolume,
        videoHasAudio,
        setVideoHasAudio,
        videoRef,
      }}
    >
      {children}
      {/* Audio elements moved here to persist across component unmounts */}
      <audio ref={audioRef} src={audioUrl || undefined} loop style={{ display: 'none' }} />
      <audio ref={audioRef2} src={audioUrl2 || undefined} loop style={{ display: 'none' }} />
    </SettingsContext.Provider>
  );
};
