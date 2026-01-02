export const isValidPDFFile = (file: File): boolean => {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
};

export const isValidImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type) || /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);
};

export const isValidVideoFile = (file: File): boolean => {
  const validTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  return validTypes.includes(file.type) || /\.(mp4|webm|ogg)$/i.test(file.name);
};

export const isValidAudioFile = (file: File): boolean => {
  const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/webm'];
  return validTypes.includes(file.type) || /\.(mp3|wav|ogg|webm)$/i.test(file.name);
};


