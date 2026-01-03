import React from 'react';
import { Box, Slider, Typography } from '@mui/material';
import { useSettings } from '../../context/SettingsContext';
import { useTranslation } from '../../hooks/useTranslation';

interface VolumeSliderProps {
  track: 1 | 2;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ track }) => {
  const { volume, setVolume, volume2, setVolume2 } = useSettings();
  const t = useTranslation();

  // 根据 track 选择对应的状态
  const currentVolume = track === 1 ? volume : volume2;
  const setCurrentVolume = track === 1 ? setVolume : setVolume2;
  const volumeLabel = track === 1 ? t('volumeSettings1') : t('volumeSettings2');

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <Typography variant="body2" sx={{ fontSize: '12px', color: '#ffffff' }}>
          {volumeLabel}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '12px', color: '#ffffff', minWidth: '40px', textAlign: 'right' }}>
          {Math.round(currentVolume * 100)}
        </Typography>
      </Box>
      <Slider
        value={currentVolume}
        onChange={(_, value) => setCurrentVolume(value as number)}
        min={0}
        max={1}
        step={0.01}
        sx={{
          color: '#ffffff',
          '& .MuiSlider-thumb': {
            '&:hover': {
              boxShadow: '0 0 0 8px rgba(255, 255, 255, 0.16)',
            },
          },
        }}
      />
    </Box>
  );
};

export default VolumeSlider;
