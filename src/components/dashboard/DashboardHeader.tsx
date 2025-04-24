import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

import { LanguageSelector } from "./LanguageSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

function DashboardHeader({
  title,
  description,
  actions,
  onToggleSidebar,
  isSidebarOpen,
}: DashboardHeaderProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const notifications = [
    {
      id: 1,
      title: "New AI Model Available",
      description: "Gemini Ultra is now available for integration.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Web Scraping Job Completed",
      description: "Your scheduled scraping job has completed successfully.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "System Update",
      description: "The system will undergo maintenance tonight at 2 AM UTC.",
      time: "3 hours ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  return (
    <header className="sticky top-0 z-30 h-20 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 max-w-full mx-auto w-full">
        {/* Left Section - Logo, Sidebar Toggle, Title and Description */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="md:hidden"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          {/* Title and Description */}
          {(title || description) && (
            <div className="flex flex-col justify-center">
              {title && <h1 className="text-lg font-semibold">{title}</h1>}
              {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
          )}
        </div>

        {/* Right Section - Actions, Notifications, Theme Toggle, Language, Profile */}
        <div className="flex items-center gap-3">
          {/* Actions */}
          {actions && <div className="mr-2">{actions}</div>}
          {/* Notifications */}
          <DropdownMenu
            open={notificationsOpen}
            onOpenChange={setNotificationsOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-[#D8A23B]/10"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
                    variant="default"
                    style={{ backgroundColor: "#D8A23B", color: "#09090B" }}
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto px-2 text-xs font-normal text-[#D8A23B] hover:text-[#D8A23B]/80 hover:bg-[#D8A23B]/10"
                >
                  Mark all as read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {notifications.length === 0 ? (
                <div className="py-4 text-center text-sm text-muted-foreground">
                  No new notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={cn(
                      "flex flex-col items-start gap-1 p-3 cursor-pointer",
                      !notification.read && "bg-muted/50",
                    )}
                  >
                    <div className="flex w-full justify-between">
                      <span className="font-medium">{notification.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </DropdownMenuItem>
                ))
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="justify-center text-sm font-medium cursor-pointer text-[#D8A23B] hover:text-[#D8A23B]/80 hover:bg-[#D8A23B]/10"
                onClick={() => navigate("/dashboard/notifications")}
              >
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Spacer for layout balance */}
          <div></div>

          {/* Language Selector */}
          <LanguageSelector />

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="pl-3 pr-2 gap-1 hover:bg-[#D8A23B]/10"
                aria-label="User menu"
              >
                <Avatar className="h-8 w-8 border border-[#D8A23B]/30">
                  <AvatarImage
                    src="/placeholder-avatar.jpg"
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback>
                    {user?.name
                      ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .substring(0, 2)
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block text-sm font-medium max-w-[100px] truncate">
                  {user?.name || "User"}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{user?.name || "User"}</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    {user?.email || "user@example.com"}
                  </span>
                  <span className="text-xs text-muted-foreground font-normal mt-1">
                    Role: {user?.role || "Admin"}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate("/dashboard/profile")}
                className="hover:bg-[#D8A23B]/10 hover:text-[#D8A23B]"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/dashboard/settings")}
                className="hover:bg-[#D8A23B]/10 hover:text-[#D8A23B]"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="hover:bg-[#D8A23B]/10 hover:text-[#D8A23B]"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
