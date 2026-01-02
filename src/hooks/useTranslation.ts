import { useSettings } from '../context/SettingsContext';
import { translations, Translations } from '../utils/translations';

export const useTranslation = () => {
  const { language } = useSettings();
  const t = (key: keyof Translations): string => {
    return translations[language][key] || key;
  };
  return t;
};


