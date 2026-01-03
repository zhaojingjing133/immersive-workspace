import React, { useRef, useState } from 'react';
import { Box, Button, Typography, Snackbar } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useSettings } from '../../context/SettingsContext';
import { readFileAsDataURL, isValidImageFile, isValidVideoFile } from '../../utils/fileHandlers';
import { useTranslation } from '../../hooks/useTranslation';

const BackgroundUpload: React.FC = () => {
  const { setBackgroundImage, setBackgroundVideo } = useSettings();
  const t = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Debug: 输出文件信息
    console.log('File info:', {
      name: file.name,
      type: file.type,
      size: file.size,
      isValidImage: isValidImageFile(file),
      isValidVideo: isValidVideoFile(file),
    });

    try {
      // 优先检查图片
      if (isValidImageFile(file)) {
        const dataURL = await readFileAsDataURL(file);
        setBackgroundImage(dataURL);
        setBackgroundVideo(null);
        setSnackbarOpen(true);
      } 
      // 然后检查视频
      else if (isValidVideoFile(file)) {
        console.log('Loading video file...', file.name);
        try {
          // 先清空背景图片和视频，确保新视频能正确显示
          setBackgroundImage(null);
          setBackgroundVideo(null);
          const dataURL = await readFileAsDataURL(file);
          console.log('Video loaded successfully, dataURL length:', dataURL.length);
          // 使用 setTimeout 确保先清空再设置，让 video 元素重新创建
          setTimeout(() => {
            setBackgroundVideo(dataURL);
            console.log('Background video set successfully');
          }, 10);
          setSnackbarOpen(true);
        } catch (readError) {
          console.error('Failed to read video file:', readError);
          alert(`读取视频文件失败: ${readError instanceof Error ? readError.message : '未知错误'}`);
        }
      } 
      // 如果都不匹配，但文件大小合理，尝试作为视频处理
      // 这样可以处理没有扩展名或MIME类型不标准的文件
      else if (file.size > 1024) {
        console.warn('File type not recognized, attempting to load as video:', {
          name: file.name,
          type: file.type,
          size: file.size,
        });
        try {
          // 先清空背景图片和视频，确保新视频能正确显示
          setBackgroundImage(null);
          setBackgroundVideo(null);
          const dataURL = await readFileAsDataURL(file);
          // 使用 setTimeout 确保先清空再设置，让 video 元素重新创建
          setTimeout(() => {
            setBackgroundVideo(dataURL);
          }, 10);
          setSnackbarOpen(true);
        } catch (videoError) {
          console.error('Failed to load as video:', videoError);
          const errorMsg = `无法加载文件\n文件名: ${file.name}\nMIME类型: ${file.type || '未知'}\n文件大小: ${(file.size / 1024).toFixed(2)} KB\n\n请确保文件是有效的图片或视频文件`;
          alert(errorMsg);
        }
      } 
      else {
        // 更详细的错误信息
        const errorMsg = `文件类型不支持\n文件名: ${file.name}\nMIME类型: ${file.type || '未知'}\n文件大小: ${(file.size / 1024).toFixed(2)} KB\n\n请上传有效的图片（JPG, PNG, GIF, WEBP）或视频文件`;
        console.error('File validation failed:', {
          name: file.name,
          type: file.type,
          size: file.size,
          isValidImage: isValidImageFile(file),
          isValidVideo: isValidVideoFile(file),
        });
        alert(errorMsg);
      }
    } catch (error) {
      console.error('File upload error:', error);
      alert(`上传失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

export default BackgroundUpload;
