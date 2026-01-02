import React from 'react';
import { Box, Slider, Typography } from '@mui/material';
import { useSettings } from '../../context/SettingsContext';
import { useTranslation } from '../../hooks/useTranslation';

const VolumeSlider: React.FC = () => {
  const { volume, setVolume } = useSettings();
  const t = useTranslation();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <Typography variant="body2" sx={{ fontSize: '12px', color: '#ffffff' }}>
          {t('volumeSettings')}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '12px', color: '#ffffff', minWidth: '40px', textAlign: 'right' }}>
          {Math.round(volume * 100)}
        </Typography>
      </Box>
      <Slider
        value={volume}
        onChange={(_, value) => setVolume(value as number)}
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
