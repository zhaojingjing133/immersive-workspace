import React from 'react';
import { Box } from '@mui/material';
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
      case 'small':
        return {
          width: '600px',
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
          width: '600px',
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
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
    >
      {mode === 'text' ? <WorkspaceEditor /> : <PDFViewer />}
      <WorkspaceActions />
    </Box>
  );
};

export default WorkspaceContainer;
