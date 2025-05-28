
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shuffle, Hand } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ReadingModeSelectorProps {
  isManualMode: boolean;
  onModeChange: (manual: boolean) => void;
}

const ReadingModeSelector: React.FC<ReadingModeSelectorProps> = ({ isManualMode, onModeChange }) => {
  const { t } = useLanguage();

  return (
    <div className="flex gap-2 justify-center mb-6">
      <Button
        variant={!isManualMode ? "default" : "outline"}
        size="sm"
        onClick={() => onModeChange(false)}
        className={`
          ${!isManualMode 
            ? 'bg-purple-600 hover:bg-purple-700 text-white' 
            : 'border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white bg-purple-900/30'
          }
        `}
      >
        <Shuffle size={16} className="mr-2" />
        {t('mode.random')}
      </Button>
      <Button
        variant={isManualMode ? "default" : "outline"}
        size="sm"
        onClick={() => onModeChange(true)}
        className={`
          ${isManualMode 
            ? 'bg-purple-600 hover:bg-purple-700 text-white' 
            : 'border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white bg-purple-900/30'
          }
        `}
      >
        <Hand size={16} className="mr-2" />
        {t('mode.manual')}
      </Button>
    </div>
  );
};

export default ReadingModeSelector;
