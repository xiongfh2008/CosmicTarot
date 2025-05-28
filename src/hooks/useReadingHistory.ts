import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { TarotCardData, ReadingType } from '@/data/tarotData';
import { useToast } from '@/hooks/use-toast';

export const useReadingHistory = () => {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const saveReading = async (readingType: string, cards: any[], personalization: any, silent = false) => {
    try {
      if (!user) return;

      const { error } = await supabase
        .from('reading_history')
        .insert([
          {
            user_id: user.id,
            reading_type: readingType,
            cards,
            personalization
          }
        ]);

      if (error) throw error;

      // 更新用户积分
      const { data: pointsData, error: pointsError } = await supabase
        .from('user_points')
        .select('points, total_earned')
        .eq('user_id', user.id)
        .single();

      if (!pointsError && pointsData) {
        await supabase
          .from('user_points')
          .update({
            points: pointsData.points + 10,
            total_earned: pointsData.total_earned + 10
          })
          .eq('user_id', user.id);

        // 只在非静默模式下显示提示
        if (!silent) {
          toast({
            title: "Reading saved!",
            description: "Your reading has been added to your history.\n+10 points earned!"
          });
        }
      }
    } catch (error) {
      console.error('Error saving reading:', error);
      if (!silent) {
        toast({
          title: "Error",
          description: "Failed to save reading.",
          variant: "destructive"
        });
      }
    }
  };

  const getReadingHistory = async () => {
    try {
      if (!user) return [];

      const { data, error } = await supabase
        .from('reading_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching reading history:', error);
      toast({
        title: "Error",
        description: "Failed to fetch reading history.",
        variant: "destructive"
      });
      return [];
    }
  };

  return { saveReading, getReadingHistory };
};
