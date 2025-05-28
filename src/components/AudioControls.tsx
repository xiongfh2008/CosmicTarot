
import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';
import { useLanguage } from '@/contexts/LanguageContext';

const AudioControls: React.FC = () => {
  const { isPlaying, toggleMusic } = useAudio();
  const { t } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleMusic}
      className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white bg-purple-900/30"
      title={t('music.toggle')}
    >
      {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </Button>
  );
};

export default AudioControls;
