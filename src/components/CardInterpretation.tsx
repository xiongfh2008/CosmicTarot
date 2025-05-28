import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TarotCardData, ReadingType } from '@/data/tarotData';
import { Sparkles, Heart, Coins, Swords, Wand } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CardInterpretationProps {
  cards: TarotCardData[];
  readingType: ReadingType;
  personalization?: any;
}

const CardInterpretation: React.FC<CardInterpretationProps> = ({ cards, readingType, personalization }) => {
  const { t } = useLanguage();

  const getSuitIcon = (suit: string) => {
    switch (suit.toLowerCase()) {
      case 'cups': return <Heart className="text-blue-400" size={20} />;
      case 'pentacles': return <Coins className="text-yellow-400" size={20} />;
      case 'swords': return <Swords className="text-gray-400" size={20} />;
      case 'wands': return <Wand className="text-red-400" size={20} />;
      default: return <Sparkles className="text-purple-400" size={20} />;
    }
  };

  const getOverallMessage = () => {
    let baseMessage = "";
    if (readingType === 'single') {
      baseMessage = "This card represents the energy surrounding your current situation and offers guidance for moving forward.";
    } else if (readingType === 'three-card') {
      baseMessage = "This three-card spread reveals the journey from your past experiences through your present circumstances to your future potential.";
    } else {
      baseMessage = "The Celtic Cross provides a comprehensive view of your situation, revealing hidden influences and potential outcomes.";
    }

    // Add personalization if available
    if (personalization) {
      const personalNote = personalization.readingStyle === 'mystical' 
        ? " The cosmic energies align with your spiritual journey."
        : personalization.readingStyle === 'encouraging'
        ? " Remember, the cards show possibilities that you have the power to shape."
        : " Consider this guidance through a practical lens as you make decisions.";
      
      return baseMessage + personalNote;
    }

    return baseMessage;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-purple-900/30 border-purple-500/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-purple-100 flex items-center justify-center gap-2">
            <Sparkles className="text-yellow-400" />
            {t('interpretation.title')}
            <Sparkles className="text-yellow-400" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-200 text-center mb-6">{getOverallMessage()}</p>
          
          {personalization && (
            <div className="bg-purple-800/30 border border-purple-600/30 rounded-lg p-4 mb-6">
              <h4 className="text-purple-100 font-semibold mb-2">Personalized for You</h4>
              <div className="text-sm text-purple-200 space-y-1">
                {personalization.zodiacSign && (
                  <p>Zodiac: {personalization.zodiacSign}</p>
                )}
                {personalization.readingStyle && (
                  <p>Reading Style: {personalization.readingStyle}</p>
                )}
              </div>
            </div>
          )}
          
          <div className="space-y-6">
            {cards.map((card, index) => (
              <Card key={index} className="bg-purple-800/30 border-purple-600/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <img 
                        src={card.image} 
                        alt={card.name}
                        className="w-16 h-24 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="text-2xl text-center mt-2">{card.symbol}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-semibold text-purple-100">{card.name}</h4>
                        {getSuitIcon(card.suit)}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-semibold text-green-400 mb-2 uppercase tracking-wider">
                            {t('meaning.upright')}
                          </h5>
                          <p className="text-purple-200 text-sm">{card.meanings.upright}</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-red-400 mb-2 uppercase tracking-wider">
                            {t('meaning.reversed')}
                          </h5>
                          <p className="text-purple-200 text-sm">{card.meanings.reversed}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h5 className="text-sm font-semibold text-yellow-400 mb-2 uppercase tracking-wider">
                          {t('meaning.key')}
                        </h5>
                        <p className="text-purple-100 text-sm italic">{card.interpretation}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardInterpretation;
