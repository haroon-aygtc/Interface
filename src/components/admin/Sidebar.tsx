import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
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
  LogOut,
  Globe,
  BookOpen,
  Brain,
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
}

const Sidebar = ({
  collapsed = false,
  onToggleCollapse = () => {},
  userName = "Admin User",
  userEmail = "admin@example.com",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",

}: SidebarProps) => {
  const { logout } = useAuth();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("overview");
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    context: true,
    templates: false,
    scraping: false,
  });

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
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      id: "widget",
      label: "Widget Config",
      icon: <Settings size={20} />,
      path: "/dashboard/integration/widget",
    },
    {
      id: "context",
      label: "Context Rules",
      icon: <MessageSquare size={20} />,
      path: "/dashboard/context-rules",
      submenu: [
        {
          id: "rule-editor",
          label: "Create Rule",
          path: "/dashboard/context-rules/create",
        },
        {
          id: "rules-list",
          label: "Manage Rules",
          path: "/dashboard/context-rules/list",
        },
        { id: "test", label: "Test Rules", path: "/dashboard/context-rules/test" },
      ],
    },
    {
      id: "templates",
      label: "Prompt Templates",
      icon: <FileText size={20} />,
      path: "/dashboard/prompt-templates",
      submenu: [
        {
          id: "create",
          label: "Create Template",
          path: "/dashboard/prompt-templates/create",
        },
        {
          id: "manage",
          label: "Manage Templates",
          path: "/dashboard/prompt-templates/list",
        },
      ],
    },
    {
      id: "scraping",
      label: "Web Scraping",
      icon: <Globe size={20} />,
      path: "/dashboard/web-scraping",
      submenu: [
        {
          id: "configurator",
          label: "Scraping Tool",
          path: "/dashboard/web-scraping/create",
        },
        {
          id: "selectors",
          label: "Saved Selectors",
          path: "/dashboard/web-scraping/selector-groups",
        },
        {
          id: "history",
          label: "Scraping History",
          path: "/dashboard/web-scraping/jobs",
        },
        {
          id: "data",
          label: "Scraped Data",
          path: "/dashboard/web-scraping/data",
        },
        {
          id: "preview",
          label: "Preview",
          path: "/dashboard/web-scraping/preview",
        },
        {
          id: "settings",
          label: "Settings",
          path: "/dashboard/web-scraping/settings",
        },
      ],
    },
    {
      id: "embed",
      label: "Embed Code",
      icon: <Code size={20} />,
      path: "/dashboard/integration/code",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 size={20} />,
      path: "/dashboard/analytics",
    },
    {
      id: "users",
      label: "User Management",
      icon: <Users size={20} />,
      path: "/dashboard/user-management",
    },
    {
      id: "knowledge",
      label: "Knowledge Base",
      icon: <BookOpen size={20} />,
      path: "/dashboard/knowledge-base",
    },
    {
      id: "system",
      label: "System Config",
      icon: <Settings size={20} />,
      path: "/dashboard/system-config",
    },
    {
      id: "chat-widget",
      label: "Chat Widget Test",
      icon: <MessageSquare size={20} />,
      path: "/dashboard/chat-widget-test",
    },
    {
      id: "ai-insights",
      label: "AI Insights",
      icon: <Brain size={20} />,
      path: "/dashboard/ai-insights",
    },
    {
      id: "ai-visualization",
      label: "AI Visualization",
      icon: <BarChart2 size={20} />,
      path: "/dashboard/ai-visualization",
    },
  ];

  // Sync sidebar with current route and tab state
  useEffect(() => {
    // Check if we have state with activeTab
    if (location.state && location.state.activeTab) {
      const { activeTab, subTab } = location.state as { activeTab?: string; subTab?: string };
      if (activeTab && subTab) {
        setActiveItem(`${activeTab}-${subTab}`);
        // Expand the parent menu
        setExpandedMenus(prev => ({
          ...prev,
          [activeTab]: true
        }));
      } else if (activeTab) {
        setActiveItem(activeTab);
      }
    } else {
      // Otherwise, try to match the current path
      const currentPath = location.pathname;

      // Find matching menu item
      const matchingItem = menuItems.find(item =>
        currentPath === item.path || currentPath.startsWith(`${item.path}/`)
      );

      if (matchingItem) {
        // Check if it has a submenu and if the path matches a submenu item
        if (matchingItem.submenu) {
          const matchingSubItem = matchingItem.submenu.find(subItem =>
            currentPath === subItem.path
          );

          if (matchingSubItem) {
            setActiveItem(`${matchingItem.id}-${matchingSubItem.id}`);
            // Expand the parent menu
            setExpandedMenus(prev => ({
              ...prev,
              [matchingItem.id]: true
            }));
          } else {
            setActiveItem(matchingItem.id);
          }
        } else {
          setActiveItem(matchingItem.id);
        }
      }
    }
  }, [location, menuItems]);

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-slate-900 dark:bg-gray-900 text-white transition-all duration-300",
        collapsed ? "w-20" : "w-64",
      )}
    >
      {/* Logo and collapse button */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700 dark:border-gray-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <MessageSquare className="text-blue-400" size={24} />
            <span className="font-bold text-lg">ChatAdmin</span>
          </div>
        )}
        {collapsed && (
          <MessageSquare className="text-blue-400 mx-auto" size={24} />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className={cn(
            "text-slate-400 hover:text-white hover:bg-slate-800",
            collapsed && "mx-auto",
          )}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
        </Button>
      </div>

      {/* User profile */}
      <div
        className={cn(
          "flex items-center p-4 border-b border-slate-700 dark:border-gray-800",
          collapsed ? "flex-col" : "gap-3",
        )}
      >
        <Avatar className="h-10 w-10">
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback className="bg-blue-600">
            {userName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-slate-400 truncate">{userEmail}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.submenu ? (
                <div>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-gray-800",
                      activeItem === item.id && "bg-slate-800 dark:bg-gray-800 text-white",
                      collapsed && "justify-center px-2",
                    )}
                    onClick={() => {
                      if (!collapsed) {
                        toggleMenu(item.id);
                        setActiveItem(item.id);
                      }
                    }}
                  >
                    <TooltipProvider delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="flex items-center">
                            {item.icon}
                            {!collapsed && (
                              <>
                                <span className="ml-3 flex-1 text-left">
                                  {item.label}
                                </span>
                                {expandedMenus[item.id] ? (
                                  <ChevronDown size={16} />
                                ) : (
                                  <ChevronRight size={16} />
                                )}
                              </>
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
                  </Button>

                  {!collapsed && expandedMenus[item.id] && (
                    <ul className="mt-1 pl-10 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={`${item.id}-${subItem.id}`}>
                          <Link
                            to={subItem.path}
                            className={cn(
                              "block w-full text-left py-2 px-3 text-sm rounded-md text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-gray-800",
                              activeItem === `${item.id}-${subItem.id}` &&
                                "bg-slate-800 dark:bg-gray-800 text-white",
                            )}
                            onClick={() => {
                              setActiveItem(`${item.id}-${subItem.id}`);
                            }}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={cn(
                    "flex w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-gray-800 items-center px-3 py-2 rounded-md",
                    activeItem === item.id && "bg-slate-800 dark:bg-gray-800 text-white",
                    collapsed && "justify-center px-2",
                  )}
                  onClick={() => {
                    setActiveItem(item.id);
                  }}
                >
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center">
                          {item.icon}
                          {!collapsed && (
                            <span className="ml-3">{item.label}</span>
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
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700 dark:border-gray-800">
        <Link
          to="/"
          className={cn(
            "flex w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-gray-800 items-center px-3 py-2 rounded-md",
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
                  <LogOut size={20} />
                  {!collapsed && <span className="ml-3">Logout</span>}
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

export default Sidebar;
