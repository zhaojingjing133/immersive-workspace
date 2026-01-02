import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import { useSettings } from '../../context/SettingsContext';

interface ImmersiveLayoutProps {
  children: ReactNode;
}

const ImmersiveLayout: React.FC<ImmersiveLayoutProps> = ({ children }) => {
  const { backgroundImage, backgroundVideo } = useSettings();

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background */}
      {backgroundVideo && (
        <Box
          component="video"
          autoPlay
          loop
          muted
          playsInline
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </Box>
      )}
      {backgroundImage && !backgroundVideo && (
        <Box
          component="img"
          src={backgroundImage}
          alt="Background"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
      )}

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ImmersiveLayout;
