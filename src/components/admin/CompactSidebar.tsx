import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Settings,
  MessageSquare,
  Code,
  BarChart3,
  BarChart2,
  FileText,
  Users,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  LogOut,
  Globe,
  BookOpen,
  Brain,
  Menu,
  X,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  onTabChange?: (tab: string, subTab?: string) => void;
  isMobile?: boolean;
  onMobileClose?: () => void;
}

const CompactSidebar = ({
  collapsed = false,
  onToggleCollapse = () => {},
  userName = "Admin User",
  userEmail = "admin@example.com",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  onTabChange = () => {},
  isMobile = false,
  onMobileClose = () => {},
}: SidebarProps) => {
  const { logout } = useAuth();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("overview");
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (menu: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const menuItems = [
    {
      id: "overview",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/dashboard",
    },
    {
      id: "widget",
      label: "Widget Config",
      icon: <Settings size={18} />,
      path: "/dashboard/integration/widget",
    },
    {
      id: "context",
      label: "Context Rules",
      icon: <MessageSquare size={18} />,
      path: "/dashboard/context-rules",
    },
    {
      id: "templates",
      label: "Templates",
      icon: <FileText size={18} />,
      path: "/dashboard/prompt-templates",
    },
    {
      id: "embed",
      label: "Embed Code",
      icon: <Code size={18} />,
      path: "/dashboard/integration/code",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 size={18} />,
      path: "/dashboard/analytics",
    },
    {
      id: "ai-models",
      label: "AI Models",
      icon: <Cpu size={18} />,
      path: "/dashboard/ai-models",
    },
    {
      id: "scraping",
      label: "Web Scraping",
      icon: <Globe size={18} />,
      path: "/dashboard/web-scraping",
    },
    {
      id: "knowledge",
      label: "Knowledge Base",
      icon: <BookOpen size={18} />,
      path: "/dashboard/knowledge-base",
    },
    {
      id: "ai-insights",
      label: "AI Insights",
      icon: <Brain size={18} />,
      path: "/dashboard/ai-insights",
    },
    {
      id: "ai-visualization",
      label: "AI Visualization",
      icon: <BarChart2 size={18} />,
      path: "/dashboard/ai-visualization",
    },
    {
      id: "users",
      label: "Users",
      icon: <Users size={18} />,
      path: "/dashboard/user-management",
    },
  ];

  // Sync sidebar with current route and tab state
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      const { activeTab } = location.state as { activeTab?: string };
      if (activeTab) {
        setActiveItem(activeTab);
      }
    } else {
      const currentPath = location.pathname;
      const matchingItem = menuItems.find(item =>
        currentPath === item.path || currentPath.startsWith(`${item.path}/`)
      );
      if (matchingItem) {
        setActiveItem(matchingItem.id);
      }
    }
  }, [location, menuItems]);

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-slate-900 text-white transition-all duration-300",
        collapsed ? "w-16" : "w-56",
        isMobile && "fixed inset-y-0 left-0 z-50",
      )}
    >
      {/* Logo and collapse button */}
      <div className="flex items-center justify-between p-3 border-b border-slate-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <MessageSquare className="text-blue-400" size={20} />
            <span className="font-bold text-sm">AI Admin</span>
          </div>
        )}
        {collapsed && (
          <MessageSquare className="text-blue-400 mx-auto" size={20} />
        )}
        {isMobile ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileClose}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X size={18} />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className={cn(
              "text-slate-400 hover:text-white hover:bg-slate-800",
              collapsed && "mx-auto",
            )}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        )}
      </div>

      {/* User profile - simplified */}
      <div
        className={cn(
          "flex items-center p-3 border-b border-slate-800",
          collapsed ? "justify-center" : "gap-2",
        )}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback className="bg-blue-600 text-xs">
            {userName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{userName}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        <ul className="space-y-0.5 px-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={cn(
                  "flex w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 items-center px-3 py-2 rounded-md text-sm",
                  activeItem === item.id && "bg-slate-800 text-white",
                  collapsed && "justify-center px-2",
                )}
                onClick={() => {
                  setActiveItem(item.id);
                  onTabChange(item.id);
                }}
              >
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex items-center">
                        {item.icon}
                        {!collapsed && (
                          <span className="ml-2 text-sm">{item.label}</span>
                        )}
                      </span>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-slate-800">
        <Link
          to="/"
          className={cn(
            "flex w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 items-center px-3 py-2 rounded-md text-sm",
            collapsed && "justify-center px-2",
          )}
          onClick={() => {
            logout();
          }}
        >
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex items-center">
                  <LogOut size={18} />
                  {!collapsed && <span className="ml-2">Logout</span>}
                </span>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">Logout</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </Link>
      </div>
    </div>
  );
};

export default CompactSidebar;
