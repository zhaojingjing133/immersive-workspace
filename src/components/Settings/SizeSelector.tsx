import React from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import { useWorkspace } from '../../context/WorkspaceContext';
import { WorkspaceSize } from '../../utils/constants';

const SizeSelector: React.FC = () => {
  const { size, setSize } = useWorkspace();

  const handleSizeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newSize: WorkspaceSize | null,
  ) => {
    if (newSize !== null) {
      setSize(newSize);
    }
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ marginBottom: '16px', fontSize: '12px' }}>
        工作区尺寸
      </Typography>
      <ToggleButtonGroup
        value={size}
        exclusive
        onChange={handleSizeChange}
        aria-label="workspace size"
        sx={{
          width: '100%',
          '& .MuiToggleButton-root': {
            flex: 1,
            color: '#ffffff',
            borderColor: 'rgba(161, 161, 170, 0.3)',
            '&.Mui-selected': {
              backgroundColor: '#ffffff',
              color: '#222222',
              '&:hover': {
                backgroundColor: '#ffffff',
              },
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          },
        }}
      >
        <ToggleButton value={WorkspaceSize.SMALL}>小</ToggleButton>
        <ToggleButton value={WorkspaceSize.MEDIUM}>中</ToggleButton>
        <ToggleButton value={WorkspaceSize.LARGE}>大</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default SizeSelector;

