import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar } from '@mui/material';
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleTimerSelect = (minutes: number | null) => {
    if (minutes === null) {
      // 不开启
      setTimerDuration(null);
      setTimerRemaining(null);
      setIsTimerRunning(false);
      setSnackbarMessage(t('timerDisabled'));
      setSnackbarOpen(true);
    } else {
      const seconds = minutes * 60;
      setTimerDuration(seconds);
      setTimerRemaining(seconds);
      setIsTimerRunning(true);
      setSnackbarMessage(t('timerEnabled'));
      setSnackbarOpen(true);
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
        {t('timerClose')}
      </Typography>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '8px' 
      }}>
        <Button
          onClick={() => handleTimerSelect(null)}
          sx={{
            gridColumn: 'span 1',
            borderRadius: '12px',
            color: timerDuration === null ? '#000000' : '#ffffff',
            backgroundColor: timerDuration === null ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            '&:hover': {
              backgroundColor: timerDuration === null ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {t('notEnabled')}
        </Button>
        <Button
          onClick={() => handleTimerSelect(15)}
          sx={{
            gridColumn: 'span 1',
            borderRadius: '12px',
            color: timerDuration === 15 * 60 ? '#000000' : '#ffffff',
            backgroundColor: timerDuration === 15 * 60 ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            '&:hover': {
              backgroundColor: timerDuration === 15 * 60 ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {t('minutes15')}
        </Button>
        <Button
          onClick={() => handleTimerSelect(30)}
          sx={{
            gridColumn: 'span 1',
            borderRadius: '12px',
            color: timerDuration === 30 * 60 ? '#000000' : '#ffffff',
            backgroundColor: timerDuration === 30 * 60 ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            '&:hover': {
              backgroundColor: timerDuration === 30 * 60 ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {t('minutes30')}
        </Button>
        <Button
          onClick={() => handleTimerSelect(60)}
          sx={{
            gridColumn: 'span 1',
            borderRadius: '12px',
            color: timerDuration === 60 * 60 ? '#000000' : '#ffffff',
            backgroundColor: timerDuration === 60 * 60 ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            '&:hover': {
              backgroundColor: timerDuration === 60 * 60 ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {t('minutes60')}
        </Button>
        <Button
          onClick={() => setCustomDialogOpen(true)}
          sx={{
            gridColumn: 'span 2',
            borderRadius: '12px',
            color: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            '&:hover': {
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{
          sx: {
            backgroundColor: 'rgba(34, 34, 34, 0.9)',
            color: '#ffffff',
            backdropFilter: 'blur(10px)',
          },
        }}
      />
    </Box>
  );
};

export default TimerSettings;
