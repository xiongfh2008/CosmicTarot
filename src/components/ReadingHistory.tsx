import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Scroll, Edit3, Save, X, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface TarotCard {
  name: string;
  [key: string]: any;
}

interface TarotReading {
  id: string;
  user_id: string;
  reading_type: string;
  cards: TarotCard[];
  personalization: any;
  tags: string[];
  notes: string;
  created_at: string;
}

const ITEMS_PER_PAGE = 10;

const ReadingHistory: React.FC = () => {
  const { user } = useAuth();
  const [readings, setReadings] = useState<TarotReading[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReadings, setTotalReadings] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchReadings();
    }
  }, [user, currentPage]);

  const fetchReadings = async () => {
    try {
      // 首先获取总记录数
      const { count } = await supabase
        .from('tarot_readings')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id);

      setTotalReadings(count || 0);

      // 然后获取当前页的数据
      const { data, error } = await supabase
        .from('tarot_readings')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .range((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE - 1);
      
      if (error) throw error;
      setReadings(data || []);
    } catch (error) {
      console.error('Error fetching readings:', error);
      toast({
        title: "Error",
        description: "Failed to load reading history.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveNotes = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tarot_readings')
        .update({ notes: editNotes })
        .eq('id', id);
      
      if (error) throw error;
      
      setReadings(readings.map(reading => 
        reading.id === id ? { ...reading, notes: editNotes } : reading
      ));
      setEditingId(null);
      setEditNotes('');
      
      toast({
        title: "Notes saved",
        description: "Your reading notes have been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save notes.",
        variant: "destructive",
      });
    }
  };

  const deleteReading = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tarot_readings')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setReadings(readings.filter(reading => reading.id !== id));
      
      toast({
        title: "Reading deleted",
        description: "The reading has been removed from your history.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete reading.",
        variant: "destructive",
      });
    }
  };

  const startEditing = (reading: TarotReading) => {
    setEditingId(reading.id);
    setEditNotes(reading.notes || '');
  };

  const totalPages = Math.ceil(totalReadings / ITEMS_PER_PAGE);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (!user) return null;

  if (loading) {
    return (
      <Card className="bg-purple-900/30 border-purple-500/50 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-300 mx-auto"></div>
          <p className="text-purple-200 mt-4">Loading your reading history...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-purple-900/30 border-purple-500/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-purple-900 text-lg">
          <Scroll size={18} />
          Reading History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[70vh] overflow-y-auto">
        {readings.length === 0 ? (
          <p className="text-purple-800 text-center py-4">
            No readings yet. Start your mystical journey with your first reading!
          </p>
        ) : (
          <>
            {readings.map((reading) => (
              <Card key={reading.id} className="bg-purple-200/80 border-purple-300">
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Badge variant="secondary" className="mb-1 bg-purple-300 text-purple-900 text-xs">
                        {reading.reading_type.replace('-', ' ').toUpperCase()}
                      </Badge>
                      <p className="text-xs text-purple-800 flex items-center gap-1">
                        <Calendar size={10} />
                        {format(new Date(reading.created_at), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startEditing(reading)}
                        className="h-6 w-6 p-0 text-purple-700 hover:text-purple-900 hover:bg-purple-300/50"
                      >
                        <Edit3 size={12} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteReading(reading.id)}
                        className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-100"
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-xs text-purple-800 mb-1">Cards drawn:</p>
                    <div className="flex flex-wrap gap-1">
                      {reading.cards.map((card, index) => (
                        <Badge key={index} variant="outline" className="text-xs text-purple-700 border-purple-400">
                          {card.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {editingId === reading.id ? (
                    <div className="space-y-2">
                      <Textarea
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="Add your thoughts about this reading..."
                        className="text-sm bg-purple-100 border-purple-300 text-purple-900 min-h-[60px]"
                      />
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          onClick={() => saveNotes(reading.id)}
                          className="h-7 bg-purple-600 hover:bg-purple-700 text-xs"
                        >
                          <Save size={12} className="mr-1" />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingId(null)}
                          className="h-7 text-purple-700 hover:text-purple-900 text-xs"
                        >
                          <X size={12} className="mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : reading.notes ? (
                    <div className="bg-purple-100/80 p-2 rounded border border-purple-300 text-sm text-purple-900">
                      {reading.notes}
                    </div>
                  ) : (
                    <p className="text-xs text-purple-600 italic">No notes yet. Click edit to add your thoughts.</p>
                  )}
                </CardContent>
              </Card>
            ))}
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center pt-2 pb-1 px-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="h-8 px-2 text-purple-700"
                >
                  <ChevronLeft size={16} />
                </Button>
                <span className="text-sm text-purple-800">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="h-8 px-2 text-purple-700"
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ReadingHistory;
