import React, { useState } from 'react';
import { Box, IconButton, Drawer, Divider } from '@mui/material';
import { Settings as SettingsIcon, Close as CloseIcon } from '@mui/icons-material';
import SizeSelector from './SizeSelector';
import BackgroundUpload from './BackgroundUpload';
import MusicUpload from './MusicUpload';
import VolumeSlider from './VolumeSlider';
import TransparencySlider from './TransparencySlider';
import LanguageSelector from './LanguageSelector';
import TimerSettings from './TimerSettings';
import { useTranslation } from '../../hooks/useTranslation';

const SettingsPanel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslation();

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          top: '24px',
          right: '40px',
          zIndex: 1000,
          color: '#ffffff',
          backgroundColor: 'rgba(34, 34, 34, 0.6)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: 'rgba(34, 34, 34, 0.8)',
          },
        }}
      >
        <SettingsIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '280px', sm: '320px' },
            backgroundColor: 'rgba(34, 34, 34, 0.95)',
            backdropFilter: 'blur(20px)',
            padding: '24px',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Box sx={{ fontSize: '18px', fontWeight: 600, color: '#ffffff' }}>{t('settings')}</Box>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ color: '#ffffff', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <LanguageSelector />
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
          <BackgroundUpload />
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
          <MusicUpload />
          <VolumeSlider />
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
          <TimerSettings />
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
          <TransparencySlider />
          <SizeSelector />
        </Box>
      </Drawer>
    </>
  );
};

export default SettingsPanel;
