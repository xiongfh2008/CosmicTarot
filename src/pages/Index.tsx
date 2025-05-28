import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Moon, Star, Gem, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import TarotCard from '@/components/TarotCard';
import ReadingSelector from '@/components/ReadingSelector';
import CardInterpretation from '@/components/CardInterpretation';
import LanguageSelector from '@/components/LanguageSelector';
import AudioControls from '@/components/AudioControls';
import ReadingModeSelector from '@/components/ReadingModeSelector';
import PersonalizationModal from '@/components/PersonalizationModal';
import ShareButtons from '@/components/ShareButtons';
import InteractiveDeck from '@/components/InteractiveDeck';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { AudioProvider } from '@/contexts/AudioContext';
import { useAuth } from '@/contexts/AuthContext';
import { useReadingHistory } from '@/hooks/useReadingHistory';
import { tarotDeck, ReadingType, TarotCardData } from '@/data/tarotData';
import UserProfilePopover from '@/components/UserProfilePopover';
import ReadingHistoryPopover from '@/components/ReadingHistoryPopover';

const IndexContent = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { saveReading } = useReadingHistory();
  const [selectedReading, setSelectedReading] = useState<ReadingType>('single');
  const [drawnCards, setDrawnCards] = useState<TarotCardData[]>([]);
  const [isReading, setIsReading] = useState(false);
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const [showDeck, setShowDeck] = useState(false);
  const [selectedCards, setSelectedCards] = useState<TarotCardData[]>([]);
  const [personalization, setPersonalization] = useState<any>(null);

  useEffect(() => {
    // Create starfield effect
    const createStars = () => {
      const starfield = document.querySelector('.starfield');
      if (starfield) {
        starfield.innerHTML = '';
        for (let i = 0; i < 100; i++) {
          const star = document.createElement('div');
          star.className = 'star';
          star.style.left = Math.random() * 100 + '%';
          star.style.top = Math.random() * 100 + '%';
          star.style.width = Math.random() * 3 + 1 + 'px';
          star.style.height = star.style.width;
          star.style.animationDelay = Math.random() * 3 + 's';
          starfield.appendChild(star);
        }
      }
    };
    createStars();
  }, []);

  // Save reading when interpretation is shown
  useEffect(() => {
    if (showInterpretation && drawnCards.length > 0 && user) {
      saveReading(selectedReading, drawnCards, personalization, true);
    }
  }, [showInterpretation, drawnCards, selectedReading, personalization, user, saveReading]);

  const drawCards = () => {
    if (isManualMode) {
      setShowDeck(true);
      setSelectedCards([]);
      return;
    }

    setIsReading(true);
    setShowInterpretation(false);
    
    setTimeout(() => {
      const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
      const numCards = selectedReading === 'single' ? 1 : 
                      selectedReading === 'three-card' ? 3 : 10;
      const drawn = shuffled.slice(0, numCards);
      setDrawnCards(drawn);
      setIsReading(false);
      
      setTimeout(() => {
        setShowInterpretation(true);
      }, 1000);
    }, 2000);
  };

  const handleCardSelect = (card: TarotCardData) => {
    const numCards = selectedReading === 'single' ? 1 : 
                    selectedReading === 'three-card' ? 3 : 10;
    
    if (selectedCards.length < numCards) {
      const newSelected = [...selectedCards, card];
      setSelectedCards(newSelected);
      
      if (newSelected.length === numCards) {
        setDrawnCards(newSelected);
        setShowDeck(false);
        setTimeout(() => {
          setShowInterpretation(true);
        }, 1000);
      }
    }
  };

  const resetReading = () => {
    setDrawnCards([]);
    setShowInterpretation(false);
    setShowDeck(false);
    setSelectedCards([]);
  };

  const handlePersonalizationChange = (data: any) => {
    setPersonalization(data);
  };

  return (
    <div className="min-h-screen cosmic-bg text-white relative overflow-hidden">
      <div className="starfield"></div>
      
      {/* Header */}
      <header className="relative z-10 text-center py-8">
        <div className="absolute top-4 right-4 flex gap-2">
          <AudioControls />
          <PersonalizationModal onPersonalizationChange={handlePersonalizationChange} />
          <LanguageSelector />
          {user ? (
            <>
              <UserProfilePopover />
              <ReadingHistoryPopover />
            </>
          ) : (
            <Link to="/auth">
              <Button
                variant="outline"
                size="sm"
                className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white"
              >
                <User size={16} className="mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
        
        <div className="flex items-center justify-center gap-3 mb-4">
          <Moon className="text-purple-300" size={32} />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent">
            {t('app.title')}
          </h1>
          <Star className="text-yellow-300" size={32} />
        </div>
        <p className="text-xl text-purple-200 mb-2">{t('app.subtitle')}</p>
        <div className="flex items-center justify-center gap-2 text-purple-300">
          <Sparkles size={16} />
          <span className="text-sm">{t('app.tagline')}</span>
          <Sparkles size={16} />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-4">
            {!drawnCards.length && !showDeck ? (
              <div className="max-w-4xl mx-auto">
                <ReadingSelector 
                  selectedReading={selectedReading}
                  onReadingChange={setSelectedReading}
                />
                
                <ReadingModeSelector 
                  isManualMode={isManualMode}
                  onModeChange={setIsManualMode}
                />
                
                <div className="text-center mt-12">
                  <Card className="bg-purple-900/30 border-purple-500/50 backdrop-blur-sm mx-auto max-w-md mystical-glow">
                    <CardContent className="p-8">
                      <Gem className="mx-auto mb-4 text-purple-300" size={48} />
                      <h3 className="text-2xl font-semibold mb-4 text-purple-100">
                        {t('draw.ready')}
                      </h3>
                      <p className="text-purple-200 mb-6">
                        {t('draw.focus')}
                      </p>
                      <Button 
                        onClick={drawCards}
                        disabled={isReading}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                      >
                        {isReading ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            {t('draw.drawing')}
                          </div>
                        ) : (
                          isManualMode ? 'Choose Cards' : t('draw.cards')
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : showDeck ? (
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-purple-100 mb-4">
                    Select Your Cards
                  </h2>
                  <Button 
                    onClick={resetReading}
                    variant="outline"
                    className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white"
                  >
                    {t('new.reading')}
                  </Button>
                </div>

                <InteractiveDeck 
                  deck={tarotDeck}
                  onCardSelect={handleCardSelect}
                  cardsNeeded={selectedReading === 'single' ? 1 : 
                              selectedReading === 'three-card' ? 3 : 10}
                  selectedCards={selectedCards}
                />
              </div>
            ) : (
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-purple-100 mb-4">
                    {selectedReading === 'single' ? t('reading.single') : 
                     selectedReading === 'three-card' ? t('reading.three') : 
                     t('reading.celtic')}
                  </h2>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    <Button 
                      onClick={resetReading}
                      variant="outline"
                      className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white"
                    >
                      {t('new.reading')}
                    </Button>
                  </div>
                  
                  <ShareButtons readingType={selectedReading} cards={drawnCards} />
                </div>

                {/* Cards Display */}
                <div className={`grid gap-6 mb-8 ${
                  selectedReading === 'single' ? 'grid-cols-1 max-w-xs mx-auto' :
                  selectedReading === 'three-card' ? 'grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto' :
                  'grid-cols-2 md:grid-cols-5 max-w-6xl mx-auto'
                }`}>
                  {drawnCards.map((card, index) => (
                    <TarotCard key={index} card={card} index={index} readingType={selectedReading} />
                  ))}
                </div>

                {/* Interpretation */}
                {showInterpretation && (
                  <CardInterpretation 
                    cards={drawnCards} 
                    readingType={selectedReading}
                    personalization={personalization}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <AudioProvider>
        <IndexContent />
      </AudioProvider>
    </LanguageProvider>
  );
};

export default Index;
