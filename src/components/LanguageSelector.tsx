
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  return (
    <div className="relative group">
      <Button
        variant="outline"
        size="sm"
        className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white bg-purple-900/30"
      >
        <Globe size={16} className="mr-2" />
        {languages.find(l => l.code === language)?.flag}
      </Button>
      
      <div className="absolute top-full right-0 mt-2 bg-purple-900/90 backdrop-blur-sm border border-purple-500/50 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 min-w-32">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`
              w-full px-3 py-2 text-left text-sm hover:bg-purple-700/50 first:rounded-t-lg last:rounded-b-lg
              ${language === lang.code ? 'bg-purple-700/30 text-purple-100' : 'text-purple-300'}
            `}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
