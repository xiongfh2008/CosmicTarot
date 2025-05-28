
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PersonalizationData {
  birthday: string;
  zodiacSign: string;
  gender: string;
  readingStyle: string;
}

interface PersonalizationModalProps {
  onPersonalizationChange: (data: PersonalizationData) => void;
}

const PersonalizationModal: React.FC<PersonalizationModalProps> = ({ onPersonalizationChange }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<PersonalizationData>({
    birthday: '',
    zodiacSign: '',
    gender: '',
    readingStyle: 'mystical'
  });

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const handleSubmit = () => {
    onPersonalizationChange(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white bg-purple-900/30"
        >
          <Settings size={16} className="mr-2" />
          Personalize
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-purple-900/95 border-purple-500/50 text-white">
        <DialogHeader>
          <DialogTitle className="text-purple-100">Personalize Your Reading</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="birthday" className="text-purple-200">Birthday</Label>
            <Input
              id="birthday"
              type="date"
              value={formData.birthday}
              onChange={(e) => setFormData({...formData, birthday: e.target.value})}
              className="bg-purple-800/50 border-purple-600 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="zodiac" className="text-purple-200">Zodiac Sign</Label>
            <Select value={formData.zodiacSign} onValueChange={(value) => setFormData({...formData, zodiacSign: value})}>
              <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
                <SelectValue placeholder="Select your zodiac sign" />
              </SelectTrigger>
              <SelectContent className="bg-purple-900 border-purple-600">
                {zodiacSigns.map((sign) => (
                  <SelectItem key={sign} value={sign} className="text-white hover:bg-purple-700">
                    {sign}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="gender" className="text-purple-200">Gender</Label>
            <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
              <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="bg-purple-900 border-purple-600">
                <SelectItem value="female" className="text-white hover:bg-purple-700">Female</SelectItem>
                <SelectItem value="male" className="text-white hover:bg-purple-700">Male</SelectItem>
                <SelectItem value="other" className="text-white hover:bg-purple-700">Other</SelectItem>
                <SelectItem value="prefer-not-to-say" className="text-white hover:bg-purple-700">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="style" className="text-purple-200">Reading Style</Label>
            <Select value={formData.readingStyle} onValueChange={(value) => setFormData({...formData, readingStyle: value})}>
              <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-purple-900 border-purple-600">
                <SelectItem value="rational" className="text-white hover:bg-purple-700">{t('style.rational')}</SelectItem>
                <SelectItem value="mystical" className="text-white hover:bg-purple-700">{t('style.mystical')}</SelectItem>
                <SelectItem value="encouraging" className="text-white hover:bg-purple-700">{t('style.encouraging')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSubmit} className="w-full bg-purple-600 hover:bg-purple-700">
            Apply Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalizationModal;
