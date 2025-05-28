
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ReadingType } from '@/data/tarotData';
import { useLanguage } from '@/contexts/LanguageContext';

interface ReadingSelectorProps {
  selectedReading: ReadingType;
  onReadingChange: (reading: ReadingType) => void;
}

const ReadingSelector: React.FC<ReadingSelectorProps> = ({ selectedReading, onReadingChange }) => {
  const { t } = useLanguage();

  const readings = [
    {
      type: 'single' as ReadingType,
      name: t('reading.single'),
      description: t('reading.single.desc'),
      cards: 1,
      icon: '🔮'
    },
    {
      type: 'three-card' as ReadingType,
      name: t('reading.three'),
      description: t('reading.three.desc'),
      cards: 3,
      icon: '🌙'
    },
    {
      type: 'celtic-cross' as ReadingType,
      name: t('reading.celtic'),
      description: t('reading.celtic.desc'),
      cards: 10,
      icon: '✨'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {readings.map((reading) => (
        <Card 
          key={reading.type}
          className={`
            cursor-pointer transition-all duration-300 transform hover:scale-105
            ${selectedReading === reading.type 
              ? 'bg-purple-800/50 border-purple-400 mystical-glow' 
              : 'bg-purple-900/30 border-purple-600/50 hover:bg-purple-800/40'
            }
            backdrop-blur-sm
          `}
          onClick={() => onReadingChange(reading.type)}
        >
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4">{reading.icon}</div>
            <h3 className="text-xl font-semibold text-purple-100 mb-2">
              {reading.name}
            </h3>
            <p className="text-purple-300 text-sm mb-4">
              {reading.description}
            </p>
            <div className="text-xs text-purple-400 uppercase tracking-wider">
              {reading.cards} Card{reading.cards > 1 ? 's' : ''}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReadingSelector;
