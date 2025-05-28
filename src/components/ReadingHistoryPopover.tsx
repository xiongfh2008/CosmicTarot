import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import ReadingHistory from './ReadingHistory';

const ReadingHistoryPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white"
        >
          <History size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-96 p-0 bg-purple-50/95 border-purple-200" 
        align="end"
        sideOffset={8}
      >
        <ReadingHistory />
      </PopoverContent>
    </Popover>
  );
};

export default ReadingHistoryPopover; 