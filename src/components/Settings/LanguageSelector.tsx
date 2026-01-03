import React from 'react';
import { Box, Select, MenuItem, FormControl, Typography } from '@mui/material';
import { useSettings } from '../../context/SettingsContext';
import { useTranslation } from '../../hooks/useTranslation';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useSettings();
  const t = useTranslation();

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
        {t('languageSettings')}
      </Typography>
      <FormControl fullWidth>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'zh-CN' | 'en' | 'ru')}
          sx={{
            color: '#ffffff',
            height: '36.5px', // 匹配 Button 的默认高度
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiSvgIcon-root': {
              color: '#ffffff',
            },
          }}
        >
          <MenuItem value="zh-CN">中文</MenuItem>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ru">Русский</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;
