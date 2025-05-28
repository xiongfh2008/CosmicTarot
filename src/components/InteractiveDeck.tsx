
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { TarotCardData } from '@/data/tarotData';

interface InteractiveDeckProps {
  deck: TarotCardData[];
  onCardSelect: (card: TarotCardData) => void;
  cardsNeeded: number;
  selectedCards: TarotCardData[];
}

const InteractiveDeck: React.FC<InteractiveDeckProps> = ({ 
  deck, 
  onCardSelect, 
  cardsNeeded, 
  selectedCards 
}) => {
  const [draggedCard, setDraggedCard] = useState<number | null>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (card: TarotCardData) => {
    if (selectedCards.length < cardsNeeded && !selectedCards.includes(card)) {
      onCardSelect(card);
    }
  };

  const handleDragStart = (e: React.DragEvent, cardIndex: number) => {
    setDraggedCard(cardIndex);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
  };

  const isCardSelected = (card: TarotCardData) => selectedCards.includes(card);

  return (
    <div className="relative">
      <div 
        ref={deckRef}
        className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-96 overflow-y-auto p-4 bg-purple-900/20 rounded-lg border border-purple-500/30"
      >
        {deck.map((card, index) => (
          <Card
            key={card.id}
            draggable={!isCardSelected(card)}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => handleCardClick(card)}
            className={`
              aspect-[2/3] cursor-pointer transition-all duration-300 transform
              ${isCardSelected(card) 
                ? 'opacity-50 scale-95 pointer-events-none' 
                : 'hover:scale-110 hover:shadow-xl'
              }
              ${draggedCard === index ? 'opacity-70 rotate-6' : ''}
              bg-gradient-to-br from-purple-800 to-indigo-900 
              border-purple-500/50 relative overflow-hidden
            `}
          >
            <div className="w-full h-full relative">
              <img 
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                <div className="absolute bottom-1 left-1 right-1 text-center">
                  <div className="text-lg">{card.symbol}</div>
                </div>
              </div>
              {isCardSelected(card) && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold">Selected</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-4 text-center text-purple-300">
        Selected: {selectedCards.length} / {cardsNeeded}
      </div>
    </div>
  );
};

export default InteractiveDeck;
