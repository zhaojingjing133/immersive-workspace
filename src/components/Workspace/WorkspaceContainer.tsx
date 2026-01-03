import React from 'react';
import { Box, Divider } from '@mui/material';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useSettings } from '../../context/SettingsContext';
import WorkspaceEditor from './WorkspaceEditor';
import PDFViewer from './PDFViewer';
import WorkspaceActions from './WorkspaceActions';

const WorkspaceContainer: React.FC = () => {
  const { size, mode } = useWorkspace();
  const { transparency, isWorkspaceVisible } = useSettings();

  const getSizeStyles = () => {
    const height = '80vh'; // 80% of viewport height
    switch (size) {
      case 'extra-small':
        return {
          width: '320px',
          height,
        };
      case 'small':
        return {
          width: '500px',
          height,
        };
      case 'medium':
        return {
          width: '50vw',
          height,
        };
      case 'large':
        return {
          width: '80vw',
          height,
        };
      default:
        return {
          width: '500px',
          height,
        };
    }
  };

  if (!isWorkspaceVisible) {
    return null;
  }

  return (
    <Box
      sx={{
        ...getSizeStyles(),
        position: 'relative',
        backgroundColor: `rgba(34, 34, 34, ${transparency})`,
        backdropFilter: `blur(${transparency * 20}px)`,
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Content Area */}
      <Box
        sx={{
          flex: 1,
          height: 'calc(100% - 64px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {mode === 'text' ? <WorkspaceEditor /> : <PDFViewer />}
      </Box>

      {/* Divider */}
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />

      {/* Action Area - Fixed 64px */}
      <Box
        sx={{
          height: '64px',
          position: 'relative',
        }}
      >
        <WorkspaceActions />
      </Box>
    </Box>
  );
};

export default WorkspaceContainer;
