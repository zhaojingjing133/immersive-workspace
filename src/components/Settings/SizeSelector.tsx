import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { useWorkspace } from '../../context/WorkspaceContext';
import { WorkspaceSize } from '../../utils/constants';
import { useTranslation } from '../../hooks/useTranslation';

const SizeSelector: React.FC = () => {
  const { size, setSize } = useWorkspace();
  const t = useTranslation();

  const sizes = [
    { value: WorkspaceSize.EXTRA_SMALL, iconSize: 8 },
    { value: WorkspaceSize.SMALL, iconSize: 12 },
    { value: WorkspaceSize.MEDIUM, iconSize: 16 },
    { value: WorkspaceSize.LARGE, iconSize: 20 },
  ];

  const selectedIndex = sizes.findIndex(s => s.value === size);

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
        {t('workspaceSize')}
      </Typography>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '9999px',
          padding: '4px',
          width: '100%',
        }}
      >
        {/* Sliding highlight */}
        <Box
          sx={{
            position: 'absolute',
            left: `calc(${selectedIndex * 25}% + 4px)`,
            width: `calc(25% - 8px)`,
            height: 'calc(100% - 8px)',
            backgroundColor: '#ffffff',
            borderRadius: '9999px',
            transition: 'left 0.2s ease',
            zIndex: 1,
          }}
        />
        {/* Icons */}
        {sizes.map((item) => (
          <IconButton
            key={item.value}
            onClick={() => setSize(item.value)}
            sx={{
              position: 'relative',
              zIndex: 2,
              flex: 1,
              minWidth: 0,
              padding: '8px',
              color: size === item.value ? '#000000' : 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                color: size === item.value ? '#000000' : '#ffffff',
                backgroundColor: 'transparent',
              },
            }}
          >
            <Box
              sx={{
                width: `${item.iconSize}px`,
                height: `${item.iconSize}px`,
                backgroundColor: 'currentColor',
                borderRadius: '2px',
              }}
            />
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};

export default SizeSelector;

