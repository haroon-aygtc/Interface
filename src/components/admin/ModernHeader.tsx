import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Search, Settings, User, Menu, HelpCircle, MessageSquare } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ModernHeaderProps {
  title?: string;
  username?: string;
  userAvatar?: string;
  notificationCount?: number;
  onMobileMenuToggle?: () => void;
}

const ModernHeader = ({
  title = "Dashboard",
  username = "Admin User",
  userAvatar = "",
  notificationCount = 3,
  onMobileMenuToggle,
}: ModernHeaderProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between w-full h-16 shadow-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMobileMenuToggle}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hidden md:block">
          {title}
        </h1>
      </div>

      <div className="flex items-center space-x-3">
        {/* Search */}
        <div className="relative hidden md:block w-64 lg:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <Input
            placeholder="Search..."
            className="pl-10 h-9 w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
          />
        </div>

        {/* Help */}
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <HelpCircle className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge
                  className={cn(
                    "absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white border-2 border-white dark:border-gray-950",
                  )}
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Badge variant="outline" className="ml-2">
                {notificationCount} new
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="cursor-pointer p-3 hover:bg-gray-50 dark:hover:bg-gray-900">
                <div className="flex gap-3 items-start">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                    <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="font-medium">New user registered</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">2 minutes ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer p-3 hover:bg-gray-50 dark:hover:bg-gray-900">
                <div className="flex gap-3 items-start">
                  <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                    <MessageSquare className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="font-medium">Context rule updated</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">1 hour ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer p-3 hover:bg-gray-50 dark:hover:bg-gray-900">
                <div className="flex gap-3 items-start">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                    <BarChart3 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="font-medium">New analytics report available</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Yesterday</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-center p-2 text-indigo-600 dark:text-indigo-400 font-medium">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full">
              <Avatar className="h-8 w-8 border-2 border-gray-200 dark:border-gray-800">
                <AvatarImage src={userAvatar} alt={username} />
                <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400">
                  {username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm hidden md:inline-block text-gray-700 dark:text-gray-300">
                {username}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="p-2 border-b border-gray-100 dark:border-gray-800">
              <p className="font-medium text-sm">{username}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-900">
              <User className="mr-2 h-4 w-4" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-900" asChild>
              <Link to="/dashboard/system-config">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default ModernHeader;
