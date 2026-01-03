import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { FormatAlignLeft, FormatAlignCenter, FormatAlignRight } from '@mui/icons-material';
import { useWorkspace, WorkspacePosition } from '../../context/WorkspaceContext';
import { WorkspaceSize } from '../../utils/constants';
import { useTranslation } from '../../hooks/useTranslation';

const PositionSelector: React.FC = () => {
  const { size, position, setPosition } = useWorkspace();
  const t = useTranslation();

  // 大尺寸时禁用，其他尺寸启用
  const isDisabled = size === WorkspaceSize.LARGE;

  const positions: Array<{ value: WorkspacePosition; icon: React.ReactNode }> = [
    { value: 'left', icon: <FormatAlignLeft /> },
    { value: 'center', icon: <FormatAlignCenter /> },
    { value: 'right', icon: <FormatAlignRight /> },
  ];

  const selectedIndex = positions.findIndex(p => p.value === position);

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
        {t('position')}
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
        {/* Sliding highlight - 只在启用时显示 */}
        {!isDisabled && (
          <Box
            sx={{
              position: 'absolute',
              left: `calc(${selectedIndex * 33.333}% + 4px)`,
              width: `calc(33.333% - 8px)`,
              height: 'calc(100% - 8px)',
              backgroundColor: '#ffffff',
              borderRadius: '9999px',
              transition: 'left 0.2s ease',
              zIndex: 1,
            }}
          />
        )}
        {/* Icons */}
        {positions.map((item) => (
          <IconButton
            key={item.value}
            disabled={isDisabled}
            onClick={() => setPosition(item.value)}
            sx={{
              position: 'relative',
              zIndex: 2,
              flex: 1,
              minWidth: 0,
              padding: '8px',
              color: position === item.value ? '#000000' : 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                color: position === item.value ? '#000000' : '#ffffff',
                backgroundColor: 'transparent',
              },
              '&:disabled': {
                opacity: 0.3,
                color: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            {item.icon}
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};

export default PositionSelector;

