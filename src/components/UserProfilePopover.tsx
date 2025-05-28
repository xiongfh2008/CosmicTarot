import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import UserProfile from './UserProfile';

const UserProfilePopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white"
        >
          <User size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 bg-purple-50/95 border-purple-200" 
        align="end"
        sideOffset={8}
      >
        <UserProfile />
      </PopoverContent>
    </Popover>
  );
};

export default UserProfilePopover; 