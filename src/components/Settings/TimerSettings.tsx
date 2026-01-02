import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useSettings } from '../../context/SettingsContext';
import { useTranslation } from '../../hooks/useTranslation';

const TimerSettings: React.FC = () => {
  const {
    timerDuration,
    setTimerDuration,
    setTimerRemaining,
    setIsTimerRunning,
  } = useSettings();
  const t = useTranslation();
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [customMinutes, setCustomMinutes] = useState('');

  const handleTimerSelect = (minutes: number | null) => {
    if (minutes === null) {
      // 不开启
      setTimerDuration(null);
      setTimerRemaining(null);
      setIsTimerRunning(false);
    } else {
      const seconds = minutes * 60;
      setTimerDuration(seconds);
      setTimerRemaining(seconds);
      setIsTimerRunning(true);
    }
  };

  const handleCustomTimer = () => {
    const minutes = parseInt(customMinutes);
    if (minutes > 0) {
      handleTimerSelect(minutes);
      setCustomDialogOpen(false);
      setCustomMinutes('');
    }
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ marginBottom: '16px', fontSize: '12px', color: '#ffffff' }}>
        {t('timerClose')}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Button
          variant={timerDuration === null ? 'contained' : 'outlined'}
          onClick={() => handleTimerSelect(null)}
          sx={{
            width: '100%',
            color: timerDuration === null ? '#222222' : '#ffffff',
            backgroundColor: timerDuration === null ? '#ffffff' : 'transparent',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            '&:hover': {
              backgroundColor: timerDuration === null ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {t('notEnabled')}
        </Button>
        <Button
          variant={timerDuration === 15 * 60 ? 'contained' : 'outlined'}
          onClick={() => handleTimerSelect(15)}
          sx={{
            width: '100%',
            color: timerDuration === 15 * 60 ? '#222222' : '#ffffff',
            backgroundColor: timerDuration === 15 * 60 ? '#ffffff' : 'transparent',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            '&:hover': {
              backgroundColor: timerDuration === 15 * 60 ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {t('minutes15')}
        </Button>
        <Button
          variant={timerDuration === 30 * 60 ? 'contained' : 'outlined'}
          onClick={() => handleTimerSelect(30)}
          sx={{
            width: '100%',
            color: timerDuration === 30 * 60 ? '#222222' : '#ffffff',
            backgroundColor: timerDuration === 30 * 60 ? '#ffffff' : 'transparent',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            '&:hover': {
              backgroundColor: timerDuration === 30 * 60 ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {t('minutes30')}
        </Button>
        <Button
          variant={timerDuration === 60 * 60 ? 'contained' : 'outlined'}
          onClick={() => handleTimerSelect(60)}
          sx={{
            width: '100%',
            color: timerDuration === 60 * 60 ? '#222222' : '#ffffff',
            backgroundColor: timerDuration === 60 * 60 ? '#ffffff' : 'transparent',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            '&:hover': {
              backgroundColor: timerDuration === 60 * 60 ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {t('minutes60')}
        </Button>
        <Button
          variant="outlined"
          onClick={() => setCustomDialogOpen(true)}
          sx={{
            width: '100%',
            color: '#ffffff',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {t('custom')}
        </Button>
      </Box>
      <Dialog
        open={customDialogOpen}
        onClose={() => setCustomDialogOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(34, 34, 34, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '8px',
          },
        }}
      >
        <DialogTitle sx={{ color: '#ffffff' }}>{t('customTime')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            type="number"
            label={t('minutes')}
            value={customMinutes}
            onChange={(e) => setCustomMinutes(e.target.value)}
            fullWidth
            sx={{
              marginTop: '8px',
              '& .MuiOutlinedInput-root': {
              color: '#ffffff',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setCustomDialogOpen(false)}
            sx={{ color: '#a1a1aa' }}
          >
            {t('cancel')}
          </Button>
          <Button
            onClick={handleCustomTimer}
            sx={{
                color: '#ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            {t('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TimerSettings;
