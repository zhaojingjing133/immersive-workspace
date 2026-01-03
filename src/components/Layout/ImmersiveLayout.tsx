import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import { useSettings } from '../../context/SettingsContext';
import { useWorkspace } from '../../context/WorkspaceContext';

interface ImmersiveLayoutProps {
  children: ReactNode;
}

const ImmersiveLayout: React.FC<ImmersiveLayoutProps> = ({ children }) => {
  const { 
    backgroundImage, 
    backgroundVideo, 
    videoMuted, 
    videoRef, 
    setVideoHasAudio 
  } = useSettings();
  const { position } = useWorkspace();

  const getJustifyContent = () => {
    switch (position) {
      case 'left':
        return 'flex-start';
      case 'right':
        return 'flex-end';
      case 'center':
      default:
        return 'center';
    }
  };

  const handleVideoLoadedMetadata = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    // 检测视频是否有音频轨道
    let hasAudio = false;
    
    // 方法1: 检查 audioTracks (标准方法，但可能不被所有浏览器支持)
    const videoWithTracks = video as any;
    if (videoWithTracks.audioTracks && videoWithTracks.audioTracks.length > 0) {
      hasAudio = true;
    }
    // 方法2: 检查 Firefox 特定属性
    else if (videoWithTracks.mozHasAudio !== undefined) {
      hasAudio = videoWithTracks.mozHasAudio;
    }
    // 方法3: 检查 WebKit 特定属性
    else if (videoWithTracks.webkitAudioDecodedByteCount !== undefined) {
      hasAudio = videoWithTracks.webkitAudioDecodedByteCount > 0;
    }
    // 如果无法检测，默认假设没有音频
    // 用户可以通过尝试取消静音来测试
    
    setVideoHasAudio(hasAudio);
  };

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
          ref={videoRef}
          key={backgroundVideo} // 添加 key 确保视频源变化时重新加载
          autoPlay
          loop
          muted={videoMuted}
          playsInline
          onLoadedMetadata={handleVideoLoadedMetadata}
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
          {/* 支持多种视频格式 */}
          <source src={backgroundVideo} type="video/mp4" />
          <source src={backgroundVideo} type="video/quicktime" />
          <source src={backgroundVideo} type="video/webm" />
          <source src={backgroundVideo} type="video/ogg" />
          {/* 如果没有指定类型，让浏览器自动检测 */}
          <source src={backgroundVideo} />
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
          justifyContent: getJustifyContent(),
          padding: '0 24px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ImmersiveLayout;
