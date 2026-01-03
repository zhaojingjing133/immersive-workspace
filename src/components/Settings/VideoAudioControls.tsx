import React from 'react';
import { Box, IconButton, Slider, Typography } from '@mui/material';
import { VolumeOff, VolumeUp } from '@mui/icons-material';
import { useSettings } from '../../context/SettingsContext';
import { useTranslation } from '../../hooks/useTranslation';

const VideoAudioControls: React.FC = () => {
  const {
    backgroundVideo,
    videoHasAudio,
    videoMuted,
    setVideoMuted,
    videoVolume,
    setVideoVolume,
  } = useSettings();
  const t = useTranslation();

  // 只在有背景视频且视频包含音频时显示
  if (!backgroundVideo || !videoHasAudio) {
    return null;
  }

  const handleMuteToggle = () => {
    setVideoMuted(!videoMuted);
  };

  return (
    <Box>
      <Typography 
        variant="body2" 
        sx={{ 
          marginBottom: '16px', 
          fontSize: '12px', 
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#ffffff' 
        }}
      >
        {t('videoAudio')}
      </Typography>
      
      {/* Mute/Unmute Button */}
      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
        <IconButton
          onClick={handleMuteToggle}
          sx={{
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {videoMuted ? <VolumeOff /> : <VolumeUp />}
        </IconButton>
        <Typography variant="body2" sx={{ fontSize: '12px', color: '#ffffff', flex: 1 }}>
          {videoMuted ? t('videoAudioMuted') : t('videoAudioUnmuted')}
        </Typography>
      </Box>

      {/* Volume Slider */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <Typography variant="body2" sx={{ fontSize: '12px', color: '#ffffff' }}>
            {t('videoVolume')}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '12px', color: '#ffffff', minWidth: '40px', textAlign: 'right' }}>
            {Math.round(videoVolume * 100)}
          </Typography>
        </Box>
        <Slider
          value={videoVolume}
          onChange={(_, value) => setVideoVolume(value as number)}
          min={0}
          max={1}
          step={0.01}
          disabled={videoMuted}
          sx={{
            color: '#ffffff',
            '& .MuiSlider-thumb': {
              '&:hover': {
                boxShadow: '0 0 0 8px rgba(255, 255, 255, 0.16)',
              },
            },
            '& .MuiSlider-track': {
              backgroundColor: '#ffffff',
            },
            '& .MuiSlider-rail': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
            '& .Mui-disabled': {
              color: 'rgba(255, 255, 255, 0.3)',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default VideoAudioControls;

