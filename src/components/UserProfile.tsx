import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, Trophy, Star, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserPoints {
  points: number;
  total_earned: number;
}

const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth();
  const [userPoints, setUserPoints] = useState<UserPoints | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchUserPoints();
    }
  }, [user]);

  const fetchUserPoints = async () => {
    try {
      const { data, error } = await supabase
        .from('user_points')
        .select('points, total_earned')
        .eq('user_id', user?.id)
        .single();
      
      if (error) throw error;
      setUserPoints(data);
    } catch (error) {
      console.error('Error fetching user points:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!user) return null;

  return (
    <Card className="bg-purple-100/90 border-purple-300 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-purple-900 text-lg">
          <User size={18} />
          {user.user_metadata?.full_name || user.email}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {userPoints && (
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 bg-purple-200/80 p-2 rounded-lg">
              <Coins className="text-yellow-600" size={18} />
              <div>
                <p className="text-xs text-purple-800">Current Points</p>
                <p className="text-sm font-bold text-purple-900">{userPoints.points}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-purple-200/80 p-2 rounded-lg">
              <Trophy className="text-yellow-600" size={18} />
              <div>
                <p className="text-xs text-purple-800">Total Earned</p>
                <p className="text-sm font-bold text-purple-900">{userPoints.total_earned}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          <Badge variant="secondary" className="bg-purple-300 text-purple-900 text-xs">
            <Star size={10} className="mr-1" />
            Mystical Seeker
          </Badge>
        </div>
        
        <Button 
          onClick={handleSignOut}
          variant="outline" 
          size="sm"
          className="w-full border-purple-400 text-purple-700 hover:bg-purple-200 hover:text-purple-900"
        >
          <LogOut size={14} className="mr-2" />
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
