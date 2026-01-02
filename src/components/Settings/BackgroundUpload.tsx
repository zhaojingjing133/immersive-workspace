import React, { useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useSettings } from '../../context/SettingsContext';
import { readFileAsDataURL, isValidImageFile, isValidVideoFile } from '../../utils/fileHandlers';
import { useTranslation } from '../../hooks/useTranslation';

const BackgroundUpload: React.FC = () => {
  const { setBackgroundImage, setBackgroundVideo } = useSettings();
  const t = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (isValidImageFile(file)) {
      const dataURL = await readFileAsDataURL(file);
      setBackgroundImage(dataURL);
      setBackgroundVideo(null);
    } else if (isValidVideoFile(file)) {
      const dataURL = await readFileAsDataURL(file);
      setBackgroundVideo(dataURL);
      setBackgroundImage(null);
    } else {
      alert('请上传有效的图片（JPG, PNG, GIF, WEBP）或视频（MP4, WEBM, OGG）文件');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ marginBottom: '16px', fontSize: '12px', color: '#ffffff' }}>
        {t('backgroundSettings')}
      </Typography>
      <Button
        variant="outlined"
        component="label"
        startIcon={<CloudUpload />}
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
        {t('uploadImageVideo')}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </Button>
    </Box>
  );
};

export default BackgroundUpload;
