import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Facebook, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonsProps {
  readingType: string;
  cards: any[];
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ readingType, cards }) => {
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      const text = `I just got a ${readingType} tarot reading! Check out Cosmic Tarot for your own mystical insights.`;
      await navigator.share({
        text,
        title: 'My Tarot Reading'
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleFacebookShare = () => {
    const text = `Just got an amazing ${readingType} tarot reading! ✨🔮 Check out Cosmic Tarot for your mystical journey. #tarot #mystic`;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareToTikTok = () => {
    // TikTok doesn't have a direct share API, so we'll copy text that users can paste
    const text = `Just got an amazing ${readingType} tarot reading! ✨🔮 Check out Cosmic Oracle for your mystical journey. #tarot #mystic #oracle`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "Share text copied for TikTok. Paste it in your post!",
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Share link copied to clipboard",
    });
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        variant="outline"
        size="sm"
        onClick={handleFacebookShare}
        className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white bg-purple-900/30"
      >
        <Facebook size={16} className="mr-2" />
        Facebook
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={shareToTikTok}
        className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white bg-purple-900/30"
      >
        <MessageCircle size={16} className="mr-2" />
        TikTok
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={copyLink}
        className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white bg-purple-900/30"
      >
        <Share2 size={16} className="mr-2" />
        Copy Link
      </Button>
    </div>
  );
};

export default ShareButtons;
