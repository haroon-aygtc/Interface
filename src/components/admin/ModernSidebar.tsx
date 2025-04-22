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
  LogOut,
  Globe,
  BookOpen,
  Brain,
  Menu,
  X,
  Cpu,
  Wrench,
  Layers,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/ui/theme-toggle";

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

const ModernSidebar = ({
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
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    context: false,
    templates: false,
    scraping: false,
    system: false,
    knowledge: false,
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
      id: "ai-models",
      label: "AI Models",
      icon: <Cpu size={20} />,
      path: "/dashboard/ai-models",
      submenu: [
        {
          id: "general",
          label: "General Settings",
          path: "/dashboard/ai-models/general",
        },
        {
          id: "advanced",
          label: "Advanced Settings",
          path: "/dashboard/ai-models/advanced",
        },
        {
          id: "testing",
          label: "Testing",
          path: "/dashboard/ai-models/testing",
        },
      ],
    },
    {
      id: "context",
      label: "Context Rules",
      icon: <MessageSquare size={20} />,
      path: "/dashboard/context-rules",
      submenu: [
        {
          id: "create",
          label: "Create Rule",
          path: "/dashboard/context-rules/create",
        },
        {
          id: "list",
          label: "Manage Rules",
          path: "/dashboard/context-rules/list",
        },
        { 
          id: "test", 
          label: "Test Rules", 
          path: "/dashboard/context-rules/test" 
        },
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
          id: "list",
          label: "Manage Templates",
          path: "/dashboard/prompt-templates/list",
        },
        {
          id: "test",
          label: "Test Templates",
          path: "/dashboard/prompt-templates/test",
        },
      ],
    },
    {
      id: "integration",
      label: "Integration",
      icon: <Layers size={20} />,
      path: "/dashboard/integration",
      submenu: [
        {
          id: "widget",
          label: "Widget Config",
          path: "/dashboard/integration/widget",
        },
        {
          id: "code",
          label: "Embed Code",
          path: "/dashboard/integration/code",
        },
        {
          id: "advanced",
          label: "Advanced Settings",
          path: "/dashboard/integration/advanced",
        },
        {
          id: "test",
          label: "Chat Widget Test",
          path: "/dashboard/chat-widget-test",
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
          id: "jobs",
          label: "Scraping Jobs",
          path: "/dashboard/web-scraping/jobs",
        },
        {
          id: "create",
          label: "Create Job",
          path: "/dashboard/web-scraping/create",
        },
        {
          id: "selectors",
          label: "Selector Groups",
          path: "/dashboard/web-scraping/selectors",
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
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 size={20} />,
      path: "/dashboard/analytics",
      submenu: [
        {
          id: "overview",
          label: "Overview",
          path: "/dashboard/analytics/overview",
        },
        {
          id: "engagement",
          label: "Engagement",
          path: "/dashboard/analytics/engagement",
        },
        {
          id: "performance",
          label: "Performance",
          path: "/dashboard/analytics/performance",
        },
        {
          id: "content",
          label: "Content",
          path: "/dashboard/analytics/content",
        },
      ],
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
    {
      id: "knowledge",
      label: "Knowledge Base",
      icon: <BookOpen size={20} />,
      path: "/dashboard/knowledge-base",
      submenu: [
        {
          id: "items",
          label: "Knowledge Items",
          path: "/dashboard/knowledge-base/items",
        },
        {
          id: "categories",
          label: "Categories",
          path: "/dashboard/knowledge-base/categories",
        },
        {
          id: "create",
          label: "Create Item",
          path: "/dashboard/knowledge-base/create",
        },
        {
          id: "import-export",
          label: "Import/Export",
          path: "/dashboard/knowledge-base/import-export",
        },
      ],
    },
    {
      id: "system",
      label: "System Config",
      icon: <Wrench size={20} />,
      path: "/dashboard/system-config",
      submenu: [
        {
          id: "authentication",
          label: "Authentication",
          path: "/dashboard/system-config/authentication",
        },
        {
          id: "api-connections",
          label: "API Connections",
          path: "/dashboard/system-config/api-connections",
        },
        {
          id: "sessions",
          label: "Sessions",
          path: "/dashboard/system-config/sessions",
        },
        {
          id: "storage",
          label: "Storage",
          path: "/dashboard/system-config/storage",
        },
      ],
    },
    {
      id: "users",
      label: "User Management",
      icon: <Users size={20} />,
      path: "/dashboard/user-management",
      submenu: [
        {
          id: "users",
          label: "Users",
          path: "/dashboard/user-management/users",
        },
        {
          id: "roles",
          label: "Roles & Permissions",
          path: "/dashboard/user-management/roles",
        },
        {
          id: "add-user",
          label: "Add User",
          path: "/dashboard/user-management/add-user",
        },
      ],
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
        "flex flex-col h-full bg-gradient-to-b from-indigo-950 to-slate-900 text-white transition-all duration-300",
        collapsed ? "w-20" : "w-72",
        isMobile && "fixed inset-y-0 left-0 z-50",
      )}
    >
      {/* Logo and collapse button */}
      <div className="flex items-center justify-between p-5 border-b border-indigo-800/50">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="bg-indigo-500 p-1.5 rounded-md">
              <MessageSquare className="text-white" size={20} />
            </div>
            <span className="font-bold text-lg">GenAI Admin</span>
          </div>
        )}
        {collapsed && (
          <div className="bg-indigo-500 p-1.5 rounded-md mx-auto">
            <MessageSquare className="text-white" size={20} />
          </div>
        )}
        {isMobile ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileClose}
            className="text-white hover:bg-indigo-800/50"
          >
            <X size={20} />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className={cn(
              "text-white hover:bg-indigo-800/50",
              collapsed && "mx-auto",
            )}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </Button>
        )}
      </div>

      {/* User profile */}
      <div
        className={cn(
          "flex items-center p-4 border-b border-indigo-800/50",
          collapsed ? "flex-col" : "gap-3",
        )}
      >
        <Avatar className="h-10 w-10 border-2 border-indigo-400">
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback className="bg-indigo-600">
            {userName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-indigo-300 truncate">{userEmail}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-transparent">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.id} className="mb-1">
              {item.submenu ? (
                <div>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-indigo-100 hover:text-white hover:bg-indigo-800/50",
                      activeItem === item.id && "bg-indigo-800/50 text-white",
                      collapsed && "justify-center px-2",
                    )}
                    onClick={() => {
                      if (!collapsed) {
                        toggleMenu(item.id);
                      }
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
                    <ul className="mt-1 ml-4 pl-4 border-l border-indigo-700/50 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={`${item.id}-${subItem.id}`}>
                          <Link
                            to={subItem.path}
                            className={cn(
                              "block w-full text-left py-2 px-3 text-sm rounded-md text-indigo-200 hover:text-white hover:bg-indigo-800/50",
                              activeItem === `${item.id}-${subItem.id}` &&
                                "bg-indigo-800/50 text-white",
                            )}
                            onClick={() => {
                              setActiveItem(`${item.id}-${subItem.id}`);
                              onTabChange(item.id, subItem.id);
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
                    "flex w-full justify-start text-indigo-100 hover:text-white hover:bg-indigo-800/50 items-center px-3 py-2 rounded-md",
                    activeItem === item.id && "bg-indigo-800/50 text-white",
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
      <div className="p-4 border-t border-indigo-800/50 flex items-center justify-between">
        {!collapsed && <ThemeToggle />}
        
        <Link
          to="/"
          className={cn(
            "flex justify-start text-indigo-200 hover:text-white hover:bg-indigo-800/50 items-center px-3 py-2 rounded-md",
            collapsed && "justify-center px-2 mx-auto",
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

export default ModernSidebar;
