export const isValidPDFFile = (file: File): boolean => {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
};

export const isValidImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type) || /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);
};

export const isValidVideoFile = (file: File): boolean => {
  // 扩展支持的 MIME 类型，包括常见的视频格式
  const validTypes = [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime',  // .mov 文件
    'video/x-m4v',      // .m4v 文件
    'video/x-msvideo',  // .avi 文件
    'video/x-ms-wmv',   // .wmv 文件
    'video/x-flv',      // .flv 文件
  ];
  
  // 检查 MIME 类型 - 如果以 'video/' 开头，就认为是有效的视频文件
  // 这样可以支持浏览器识别的所有视频格式
  if (file.type && file.type.startsWith('video/')) {
    return true;
  }
  
  // 也检查已知的有效类型列表
  if (file.type && validTypes.includes(file.type)) {
    return true;
  }
  
  // 检查文件扩展名
  const validExtensions = /\.(mp4|webm|ogg|mov|m4v|avi|wmv|flv|mkv|mpg|mpeg)$/i;
  if (validExtensions.test(file.name)) {
    return true;
  }
  
  // 如果文件没有扩展名或 MIME 类型为空/不标准，但文件大小大于0
  // 信任浏览器的文件选择器 - 如果用户通过 accept="video/*" 选择了文件，就接受它
  // 这样可以处理没有扩展名的文件（如从某些网站下载的文件）
  if (file.size > 0) {
    // 检查文件大小是否合理（视频文件通常至少几KB）
    // 如果文件大小合理，就认为可能是视频文件
    if (file.size > 1024) { // 大于1KB
      return true;
    }
  }
  
  return false;
};

export const isValidAudioFile = (file: File): boolean => {
  const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/webm'];
  return validTypes.includes(file.type) || /\.(mp3|wav|ogg|webm)$/i.test(file.name);
};



