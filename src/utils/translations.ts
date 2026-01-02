export type Language = 'zh-CN' | 'en' | 'ru';

export interface Translations {
  // Settings Panel
  settings: string;
  
  // Language Selector
  languageSettings: string;
  
  // Background Upload
  backgroundSettings: string;
  uploadImageVideo: string;
  
  // Music Upload
  backgroundMusicSettings: string;
  uploadMusic: string;
  
  // Volume Slider
  volumeSettings: string;
  
  // Timer Settings
  timerClose: string;
  notEnabled: string;
  minutes15: string;
  minutes30: string;
  minutes60: string;
  custom: string;
  pause: string;
  resume: string;
  reset: string;
  customTime: string;
  minutes: string;
  cancel: string;
  confirm: string;
  
  // Transparency Slider
  workspaceSettings: string;
  transparency: string;
  
  // Size Selector
  workspaceSize: string;
  small: string;
  medium: string;
  large: string;
  
  // PDF Viewer
  uploadPDFFile: string;
  useUploadButton: string;
  loading: string;
  loadPDFFailed: string;
  
  // Workspace Actions
  replacePDF: string;
  newPDFWillReplace: string;
  deleteContent: string;
  confirmDeleteContent: string;
  deletePDF: string;
  confirmDeletePDF: string;
}

export const translations: Record<Language, Translations> = {
  'zh-CN': {
    settings: '设置',
    languageSettings: '语言设置',
    backgroundSettings: '背景设置',
    uploadImageVideo: '上传图片/视频',
    backgroundMusicSettings: '背景音乐设置',
    uploadMusic: '上传音乐',
    volumeSettings: '音量设置',
    timerClose: '定时关闭',
    notEnabled: '不开启',
    minutes15: '15分钟',
    minutes30: '30分钟',
    minutes60: '60分钟',
    custom: '自定义',
    pause: '暂停',
    resume: '继续',
    reset: '重置',
    customTime: '自定义时间',
    minutes: '分钟',
    cancel: '取消',
    confirm: '确定',
    workspaceSettings: '工作台显示',
    transparency: '透明度',
    workspaceSize: '工作区尺寸',
    small: '小',
    medium: '中',
    large: '大',
    uploadPDFFile: '上传PDF文件',
    useUploadButton: '请使用右下角的上传按钮',
    loading: '加载中...',
    loadPDFFailed: '加载PDF失败',
    replacePDF: '替换PDF',
    newPDFWillReplace: '新的PDF将替换当前的PDF，是否确定？',
    deleteContent: '删除内容',
    confirmDeleteContent: '确定要删除所有已写的内容吗？',
    deletePDF: '删除PDF',
    confirmDeletePDF: '确定要删除当前PDF吗？',
  },
  'en': {
    settings: 'Settings',
    languageSettings: 'Language Settings',
    backgroundSettings: 'Background Settings',
    uploadImageVideo: 'Upload Image/Video',
    backgroundMusicSettings: 'Background Music Settings',
    uploadMusic: 'Upload Music',
    volumeSettings: 'Volume Settings',
    timerClose: 'Auto Close Timer',
    notEnabled: 'Not Enabled',
    minutes15: '15 Minutes',
    minutes30: '30 Minutes',
    minutes60: '60 Minutes',
    custom: 'Custom',
    pause: 'Pause',
    resume: 'Resume',
    reset: 'Reset',
    customTime: 'Custom Time',
    minutes: 'Minutes',
    cancel: 'Cancel',
    confirm: 'Confirm',
    workspaceSettings: 'Workspace Settings',
    transparency: 'Transparency',
    workspaceSize: 'Workspace Size',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    uploadPDFFile: 'Upload PDF File',
    useUploadButton: 'Please use the upload button at the bottom right',
    loading: 'Loading...',
    loadPDFFailed: 'Failed to load PDF',
    replacePDF: 'Replace PDF',
    newPDFWillReplace: 'The new PDF will replace the current PDF. Are you sure?',
    deleteContent: 'Delete Content',
    confirmDeleteContent: 'Are you sure you want to delete all written content?',
    deletePDF: 'Delete PDF',
    confirmDeletePDF: 'Are you sure you want to delete the current PDF?',
  },
  'ru': {
    settings: 'Настройки',
    languageSettings: 'Настройки языка',
    backgroundSettings: 'Настройки фона',
    uploadImageVideo: 'Загрузить изображение/видео',
    backgroundMusicSettings: 'Настройки фоновой музыки',
    uploadMusic: 'Загрузить музыку',
    volumeSettings: 'Настройки громкости',
    timerClose: 'Таймер автозакрытия',
    notEnabled: 'Не включено',
    minutes15: '15 минут',
    minutes30: '30 минут',
    minutes60: '60 минут',
    custom: 'Пользовательский',
    pause: 'Пауза',
    resume: 'Продолжить',
    reset: 'Сброс',
    customTime: 'Пользовательское время',
    minutes: 'Минуты',
    cancel: 'Отмена',
    confirm: 'Подтвердить',
    workspaceSettings: 'Настройки рабочего пространства',
    transparency: 'Прозрачность',
    workspaceSize: 'Размер рабочего пространства',
    small: 'Маленький',
    medium: 'Средний',
    large: 'Большой',
    uploadPDFFile: 'Загрузить PDF файл',
    useUploadButton: 'Пожалуйста, используйте кнопку загрузки внизу справа',
    loading: 'Загрузка...',
    loadPDFFailed: 'Не удалось загрузить PDF',
    replacePDF: 'Заменить PDF',
    newPDFWillReplace: 'Новый PDF заменит текущий PDF. Вы уверены?',
    deleteContent: 'Удалить содержимое',
    confirmDeleteContent: 'Вы уверены, что хотите удалить все написанное содержимое?',
    deletePDF: 'Удалить PDF',
    confirmDeletePDF: 'Вы уверены, что хотите удалить текущий PDF?',
  },
};
