import React from 'react';
import { Box, Slider, Typography, Switch } from '@mui/material';
import { useSettings } from '../../context/SettingsContext';
import { useTranslation } from '../../hooks/useTranslation';

const TransparencySlider: React.FC = () => {
  const { transparency, setTransparency, isWorkspaceVisible, setIsWorkspaceVisible } = useSettings();
  const t = useTranslation();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Typography variant="body2" sx={{ fontSize: '12px', color: '#ffffff' }}>
          {t('workspaceSettings')}
        </Typography>
        <Switch
          checked={isWorkspaceVisible}
          onChange={(e) => setIsWorkspaceVisible(e.target.checked)}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#ffffff',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#ffffff',
            },
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <Typography variant="body2" sx={{ fontSize: '12px', color: '#ffffff' }}>
          {t('transparency')}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '12px', color: '#ffffff', minWidth: '40px', textAlign: 'right' }}>
          {Math.round(transparency * 100)}
        </Typography>
      </Box>
      <Slider
        value={transparency}
        onChange={(_, value) => setTransparency(value as number)}
        min={0}
        max={1}
        step={0.01}
        disabled={!isWorkspaceVisible}
        sx={{
          color: '#ffffff',
          '& .MuiSlider-thumb': {
            '&:hover': {
              boxShadow: '0 0 0 8px rgba(255, 255, 255, 0.16)',
            },
          },
          '& .Mui-disabled': {
            opacity: 0.3,
          },
        }}
      />
    </Box>
  );
};

export default TransparencySlider;
