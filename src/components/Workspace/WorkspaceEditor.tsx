import React, { useEffect } from 'react';
import { Box, TextField, Typography, Divider } from '@mui/material';
import { useWorkspace } from '../../context/WorkspaceContext';

const WorkspaceEditor: React.FC = () => {
  const { content, setContent, title, setTitle } = useWorkspace();

  // Load content and title from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('workspace-content');
    if (savedContent) {
      setContent(savedContent);
    }
    const savedTitle = localStorage.getItem('workspace-title');
    if (savedTitle) {
      setTitle(savedTitle);
    }
  }, [setContent, setTitle]);

  // Save content to localStorage
  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = event.target.value;
    setContent(newContent);
    localStorage.setItem('workspace-content', newContent);
  };

  // Save title to localStorage
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    localStorage.setItem('workspace-title', newTitle);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Content Area - Scrollable (same as PDF) */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          padding: '24px',
          paddingBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header - Now scrollable with content */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <TextField
            value={title}
            onChange={handleTitleChange}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                color: '#ffffff',
                fontWeight: 600,
                fontSize: { xs: '20px', sm: '24px' },
                '& input': {
                  padding: 0,
                  textAlign: 'left',
                },
              },
            }}
            sx={{
              flex: 1,
              '& .MuiInputBase-root': {
                '&:before': {
                  display: 'none',
                },
                '&:after': {
                  display: 'none',
                },
              },
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              fontSize: '12px',
              color: '#a1a1aa',
              marginLeft: '16px',
            }}
          >
            {currentDate}
          </Typography>
        </Box>

        {/* Divider - Now scrollable with content */}
        <Divider
          sx={{
            marginBottom: '24px',
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }}
        />

        {/* Content */}
        <TextField
          multiline
          fullWidth
          value={content}
          onChange={handleContentChange}
          placeholder="请输入"
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: {
              color: '#ffffff',
              fontSize: { xs: '14px', sm: '16px' },
              lineHeight: '1.625em',
              letterSpacing: '0.1em',
              minHeight: '100%',
              '& textarea': {
                overflow: 'visible',
                minHeight: '100%',
              },
            },
          }}
          sx={{
            flex: 1,
            '& .MuiInputBase-root': {
              height: 'auto',
              minHeight: '100%',
            },
            '& .MuiInputBase-input': {
              minHeight: '100%',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default WorkspaceEditor;
