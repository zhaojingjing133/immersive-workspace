import React, { useRef } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { CloudUpload, PlayArrow, Pause } from '@mui/icons-material';
import { useSettings } from '../../context/SettingsContext';
import { readFileAsDataURL, isValidAudioFile } from '../../utils/fileHandlers';
import { useTranslation } from '../../hooks/useTranslation';

const MusicUpload: React.FC = () => {
  const { audioFile, setAudioFile, audioUrl, setAudioUrl, isPlaying, setIsPlaying } = useSettings();
  const t = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isValidAudioFile(file)) {
      alert('请上传有效的音频文件（MP3, WAV, OGG, WEBM）');
      return;
    }

    const dataURL = await readFileAsDataURL(file);
    setAudioFile(file);
    setAudioUrl(dataURL);
    setIsPlaying(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ marginBottom: '16px', fontSize: '12px', color: '#ffffff' }}>
        {t('backgroundMusicSettings')}
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
          {t('uploadMusic')}
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </Button>
        {(audioFile || audioUrl) && (
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
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default MusicUpload;
