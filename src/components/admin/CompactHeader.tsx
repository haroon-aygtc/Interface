import React from "react";
import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CompactHeaderProps {
  title?: string;
  username?: string;
  userAvatar?: string;
  notificationCount?: number;
  onMobileMenuToggle?: () => void;
}

const CompactHeader = ({
  title = "Dashboard",
  username = "Admin User",
  userAvatar = "",
  notificationCount = 0,
  onMobileMenuToggle,
}: CompactHeaderProps) => {


  return (
    <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 py-2 flex items-center justify-between w-full h-14 shadow-sm">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMobileMenuToggle}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <h1 className="text-base font-medium text-gray-800 dark:text-gray-100 hidden md:block">
          {title}
        </h1>
      </div>

      <div className="flex items-center space-x-2">
        {/* Search */}
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <Input
            placeholder="Search..."
            className="pl-8 h-8 w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-sm"
          />
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <Bell className="h-4 w-4" />
              {notificationCount > 0 && (
                <Badge
                  className={cn(
                    "absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-red-500 text-white",
                  )}
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <div className="p-2 text-sm font-medium">Notifications</div>
            <DropdownMenuSeparator />
            <div className="max-h-64 overflow-y-auto">
              {notificationCount > 0 ? (
                Array.from({ length: notificationCount }).map((_, i) => (
                  <DropdownMenuItem key={i} className="cursor-pointer py-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-xs font-medium">Notification {i + 1}</p>
                      <p className="text-xs text-gray-500">Just now</p>
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="py-2 px-3 text-xs text-gray-500">No new notifications</div>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <Avatar className="h-7 w-7 cursor-pointer">
          <AvatarImage src={userAvatar} alt={username} />
          <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs">
            {username
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default CompactHeader;
