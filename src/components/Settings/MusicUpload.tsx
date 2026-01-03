import React, { useRef, useState } from 'react';
import { Box, Button, Typography, IconButton, Snackbar } from '@mui/material';
import { CloudUpload, PlayArrow, Pause } from '@mui/icons-material';
import { useSettings } from '../../context/SettingsContext';
import { readFileAsDataURL, isValidAudioFile } from '../../utils/fileHandlers';
import { useTranslation } from '../../hooks/useTranslation';

interface MusicUploadProps {
  track: 1 | 2;
}

const MusicUpload: React.FC<MusicUploadProps> = ({ track }) => {
  const {
    audioFile,
    setAudioFile,
    audioUrl,
    setAudioUrl,
    isPlaying,
    setIsPlaying,
    audioFile2,
    setAudioFile2,
    audioUrl2,
    setAudioUrl2,
    isPlaying2,
    setIsPlaying2,
  } = useSettings();
  const t = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // 根据 track 选择对应的状态
  const currentAudioFile = track === 1 ? audioFile : audioFile2;
  const currentAudioUrl = track === 1 ? audioUrl : audioUrl2;
  const currentIsPlaying = track === 1 ? isPlaying : isPlaying2;
  const setCurrentAudioFile = track === 1 ? setAudioFile : setAudioFile2;
  const setCurrentAudioUrl = track === 1 ? setAudioUrl : setAudioUrl2;
  const setCurrentIsPlaying = track === 1 ? setIsPlaying : setIsPlaying2;
  const uploadLabel = track === 1 ? t('uploadMusic1') : t('uploadMusic2');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isValidAudioFile(file)) {
      alert('请上传有效的音频文件（MP3, WAV, OGG, WEBM）');
      return;
    }

    const dataURL = await readFileAsDataURL(file);
    setCurrentAudioFile(file);
    setCurrentAudioUrl(dataURL);
    setCurrentIsPlaying(true);
    setSnackbarOpen(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePlayPause = () => {
    setCurrentIsPlaying(!currentIsPlaying);
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
        {uploadLabel}
      </Typography>
      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button
          variant="outlined"
          component="label"
          startIcon={<CloudUpload />}
          sx={{
            flex: 1,
            color: '#ffffff',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {uploadLabel}
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </Button>
        {(currentAudioFile || currentAudioUrl) && (
          <IconButton
            onClick={handlePlayPause}
            sx={{
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            {currentIsPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={t('uploadSuccess')}
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

export default MusicUpload;
