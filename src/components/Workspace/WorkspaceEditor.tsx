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
        padding: { xs: '24px', sm: '32px 40px' },
      }}
    >
      {/* Header */}
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

      {/* Divider */}
      <Divider
        sx={{
          marginBottom: '24px',
          borderColor: 'rgba(255, 255, 255, 0.2)',
        }}
      />

      {/* Editor */}
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
            height: '100%',
            '& textarea': {
              overflow: 'auto',
              height: '100% !important',
            },
          },
        }}
        sx={{
          flex: 1,
          '& .MuiInputBase-root': {
            height: '100%',
          },
          '& .MuiInputBase-input': {
            height: '100%',
            overflow: 'auto',
          },
        }}
      />
    </Box>
  );
};

export default WorkspaceEditor;
