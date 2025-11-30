import React from 'react';
import { useLanguage } from '../utils/languageContext';
import { Language } from '../utils/translations';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
      <Globe className="w-4 h-4 text-purple-600" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="bg-transparent border-none outline-none cursor-pointer"
      >
        <option value="az">AZ</option>
        <option value="en">EN</option>
        <option value="ru">RU</option>
      </select>
    </div>
  );
};
