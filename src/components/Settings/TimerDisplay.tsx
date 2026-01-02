import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { AccessTime, Pause, PlayArrow, Refresh } from '@mui/icons-material';
import { useSettings } from '../../context/SettingsContext';
import { useTranslation } from '../../hooks/useTranslation';

const TimerDisplay: React.FC = () => {
  const { timerRemaining, isTimerRunning, isTimerPaused, setIsTimerPaused, timerDuration, setTimerRemaining, setIsTimerRunning } = useSettings();
  const t = useTranslation();

  if (timerRemaining === null || timerRemaining === 0) {
    return null;
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePauseResume = () => {
    if (isTimerPaused) {
      setIsTimerPaused(false);
    } else {
      setIsTimerPaused(true);
    }
  };

  const handleReset = () => {
    if (timerDuration !== null) {
      setTimerRemaining(timerDuration);
      setIsTimerRunning(false);
      setIsTimerPaused(false);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '24px',
        left: '40px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'rgba(34, 34, 34, 0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
        padding: '8px 16px',
      }}
    >
      <IconButton
        size="small"
        sx={{
          color: isTimerRunning ? '#4ade80' : '#ffffff',
          padding: '4px',
        }}
      >
        <AccessTime fontSize="small" />
      </IconButton>
      <Typography
        sx={{
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: 500,
          fontFamily: 'monospace',
        }}
      >
        {formatTime(timerRemaining)}
      </Typography>
      <IconButton
        size="small"
        onClick={handlePauseResume}
        sx={{
          color: '#ffffff',
          padding: '4px',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
        title={isTimerPaused ? t('resume') : t('pause')}
      >
        {isTimerPaused ? <PlayArrow fontSize="small" /> : <Pause fontSize="small" />}
      </IconButton>
      <IconButton
        size="small"
        onClick={handleReset}
        sx={{
          color: '#ffffff',
          padding: '4px',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
        title={t('reset')}
      >
        <Refresh fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default TimerDisplay;
