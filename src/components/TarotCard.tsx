
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { TarotCardData, ReadingType } from '@/data/tarotData';
import { useLanguage } from '@/contexts/LanguageContext';

interface TarotCardProps {
  card: TarotCardData;
  index: number;
  readingType: ReadingType;
}

const TarotCard: React.FC<TarotCardProps> = ({ card, index, readingType }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setIsRevealed(true);
        setIsFlipping(false);
      }, 400);
    }, index * 500 + 500);

    return () => clearTimeout(timer);
  }, [index]);

  const getPositionLabel = () => {
    if (readingType === 'single') return '';
    if (readingType === 'three-card') {
      const labels = [t('position.past'), t('position.present'), t('position.future')];
      return labels[index];
    }
    // Celtic Cross positions
    const labels = [
      'Present', 'Challenge', 'Past', 'Future', 'Possible Outcome',
      'Near Future', 'Your Approach', 'External Influences', 'Hopes & Fears', 'Final Outcome'
    ];
    return labels[index];
  };

  const handleClick = () => {
    if (!isRevealed) {
      setIsFlipping(true);
      setTimeout(() => {
        setIsRevealed(true);
        setIsFlipping(false);
      }, 400);
    }
  };

  return (
    <div className="text-center">
      {getPositionLabel() && (
        <h4 className="text-sm font-semibold text-purple-300 mb-2 uppercase tracking-wider">
          {getPositionLabel()}
        </h4>
      )}
      <div className="relative group">
        <Card 
          className={`
            w-full aspect-[2/3] cursor-pointer transition-all duration-500 transform
            ${isFlipping ? 'animate-pulse scale-105' : ''}
            ${isHovered ? 'scale-110 shadow-2xl' : 'hover:scale-105'}
            ${isRevealed ? 'mystical-glow' : ''}
            bg-gradient-to-br from-purple-900/50 to-indigo-900/50 
            border-purple-500/30 backdrop-blur-sm overflow-hidden
          `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          <div className="w-full h-full relative">
            {!isRevealed ? (
              <div className="w-full h-full bg-gradient-to-br from-purple-800 to-indigo-900 rounded-lg flex items-center justify-center p-4">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <div className="text-purple-200 text-sm">Click to reveal</div>
                  <div className="w-full h-2 bg-purple-600/30 rounded-full mt-2">
                    <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full relative group">
                <img 
                  src={card.image} 
                  alt={card.name}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Enhanced fallback with classic tarot styling
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg items-center justify-center p-4 hidden"
                  style={{ display: 'none' }}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4 filter drop-shadow-lg">{card.symbol}</div>
                    <div className="bg-amber-900 text-amber-50 px-3 py-1 rounded text-sm font-serif">
                      {card.name}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-lg">
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <div className="text-3xl mb-2 filter drop-shadow-lg">{card.symbol}</div>
                    <h3 className="text-lg font-bold text-white mb-1 font-serif drop-shadow-lg">{card.name}</h3>
                    <p className="text-sm text-purple-200 uppercase tracking-wider">{card.suit}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TarotCard;
