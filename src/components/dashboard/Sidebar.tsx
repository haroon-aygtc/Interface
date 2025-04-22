
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ROUTES } from "../../routes";
import { LuxuryThemeToggle } from "@/components/landing-page/LuxuryThemeToggle";
import { LuxuryLogo } from "@/components/landing-page/LuxuryLogo";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Bot,
  FileText,
  PenTool,
  BarChart2,
  Globe,
  Code,
  Settings,
  LogOut,
  Users,
  Sparkles,
  BookOpen,
  MessageSquare,
  Brain,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
  badge?: string;
  isCollapsed?: boolean;
}

const NavItem = ({
  icon,
  label,
  href,
  isActive = false,
  onClick,
  badge,
  isCollapsed = false,
}: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "group flex items-center justify-between rounded-md px-4 py-3 text-sm transition-all duration-200",
        isActive
          ? "bg-[#D8A23B]/5 text-white shadow-sm"
          : "text-white/80 hover:text-white",
      )}
      onClick={onClick}
      title={isCollapsed ? label : undefined}
    >
      <div className={cn("flex items-center", isCollapsed ? "justify-center w-full" : "gap-3")}>
        <div className="relative w-8 h-8 flex-shrink-0">
          <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[#D8A23B] to-[#9F7425] opacity-10 transition-opacity duration-200 group-hover:opacity-20"></div>
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-200",
              isActive
                ? "text-[#D8A23B]"
                : "text-[#D8A23B]/80",
            )}
          >
            {icon}
          </div>
          {isActive && <div className="absolute -left-4 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-[#D8A23B]"></div>}
        </div>
        {!isCollapsed && <span>{label}</span>}
      </div>
      {!isCollapsed && badge && (
        <div className="bg-[#D8A23B]/20 text-[#D8A23B] text-xs font-medium px-2 py-0.5 rounded-full">
          {badge}
        </div>
      )}
      {isCollapsed && badge && (
        <div className="absolute top-0 right-0 -mt-1 -mr-1 bg-[#D8A23B] text-[#09090B] text-xs w-4 h-4 flex items-center justify-center rounded-full">
          •
        </div>
      )}
    </Link>
  );
};

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar = ({ isCollapsed = false, onToggleCollapse }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "flex h-full flex-shrink-0 flex-col border-r bg-[#09090B] text-white transition-all duration-300 border-r-[#D8A23B]/10",
        isCollapsed ? "w-[70px]" : "w-[280px]"
      )}
    >
      <div className="flex h-24 items-center justify-center border-b border-[#D8A23B]/10 px-2">
        <div className="flex flex-col items-center gap-1 overflow-hidden">
          {!isCollapsed ? (
            <div className="flex flex-col items-center">
              <LuxuryLogo className="h-14 w-auto" />
            </div>
          ) : (
            <div className="h-12 w-12 rounded-md overflow-hidden">
              <img src="/logo.png" alt="Al Yalayis Hub" className="h-full w-full object-contain" />
            </div>
          )}
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleCollapse}
        className="absolute top-24 -right-3.5 h-7 w-7 rounded-full border border-[#D8A23B]/30 bg-[#09090B] p-0 shadow-md z-10 hover:bg-[#D8A23B]/20 transition-colors duration-200"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ?
          <ChevronRight className="h-3 w-3 text-[#D8A23B]" /> :
          <ChevronLeft className="h-3 w-3 text-[#D8A23B]" />}
      </Button>

      <div className="flex-1 overflow-auto py-8 thin-scrollbar">
        {!isCollapsed && (
          <div className="px-4 mb-3 text-xs font-semibold text-[#D8A23B] uppercase tracking-wider">
            <span className="border-b border-[#D8A23B]/30 pb-1">Main</span>
          </div>
        )}
        <nav className="grid gap-2 px-3 mb-8">
          <NavItem
            icon={<LayoutDashboard className="h-5 w-5" />}
            label="Dashboard"
            href={ROUTES.DASHBOARD}
            isActive={currentPath === ROUTES.DASHBOARD}
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<Bot className="h-5 w-5" />}
            label="AI Model Configuration"
            href={ROUTES.AI_MODELS}
            isActive={currentPath.startsWith(ROUTES.AI_MODELS)}
            badge="New"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<Brain className="h-5 w-5" />}
            label="AI Model Config Panel"
            href={ROUTES.AI_MODEL_CONFIG}
            isActive={currentPath.startsWith(ROUTES.AI_MODEL_CONFIG)}
            badge="New"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<Sparkles className="h-5 w-5" />}
            label="AI Integration"
            href={ROUTES.AI_INTEGRATION}
            isActive={currentPath.startsWith(ROUTES.AI_INTEGRATION)}
            badge="New"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<FileText className="h-5 w-5" />}
            label="Context Rules"
            href={ROUTES.CONTEXT_RULES}
            isActive={currentPath.startsWith(ROUTES.CONTEXT_RULES)}
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<PenTool className="h-5 w-5" />}
            label="Prompt Templates"
            href={ROUTES.PROMPT_TEMPLATES}
            isActive={currentPath.startsWith(ROUTES.PROMPT_TEMPLATES)}
            isCollapsed={isCollapsed}
          />
        </nav>

        {!isCollapsed && (
          <div className="px-4 mb-3 text-xs font-semibold text-[#D8A23B] uppercase tracking-wider">
            <span className="border-b border-[#D8A23B]/30 pb-1">Analytics</span>
          </div>
        )}
        <nav className="grid gap-2 px-3 mb-8">
          <NavItem
            icon={<BarChart2 className="h-5 w-5" />}
            label="Analytics Dashboard"
            href={ROUTES.ANALYTICS}
            isActive={currentPath === ROUTES.ANALYTICS}
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<TrendingUp className="h-5 w-5" />}
            label="Interactive Analytics"
            href={ROUTES.ANALYTICS_INTERACTIVE}
            isActive={currentPath === ROUTES.ANALYTICS_INTERACTIVE}
            isCollapsed={isCollapsed}
            badge="New"
          />
          <NavItem
            icon={<Globe className="h-5 w-5" />}
            label="Web Scraping"
            href={ROUTES.WEB_SCRAPING}
            isActive={currentPath.startsWith(ROUTES.WEB_SCRAPING)}
            isCollapsed={isCollapsed}
          />
        </nav>

        {!isCollapsed && (
          <div className="px-4 mb-3 text-xs font-semibold text-[#D8A23B] uppercase tracking-wider">
            <span className="border-b border-[#D8A23B]/30 pb-1">Configuration</span>
          </div>
        )}
        <nav className="grid gap-2 px-3">
          <NavItem
            icon={<MessageSquare className="h-5 w-5" />}
            label="Chat Widget Test"
            href={ROUTES.CHAT_WIDGET_TEST}
            isActive={currentPath.startsWith(ROUTES.CHAT_WIDGET_TEST)}
            badge="New"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<Sparkles className="h-5 w-5" />}
            label="AI Insights"
            href={ROUTES.AI_INSIGHTS}
            isActive={currentPath.startsWith(ROUTES.AI_INSIGHTS)}
            badge="New"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<Code className="h-5 w-5" />}
            label="Integration"
            href={ROUTES.INTEGRATION}
            isActive={currentPath.startsWith(ROUTES.INTEGRATION)}
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<BookOpen className="h-5 w-5" />}
            label="Knowledge Base"
            href={ROUTES.KNOWLEDGE_BASE}
            isActive={currentPath.startsWith(ROUTES.KNOWLEDGE_BASE)}
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<Users className="h-5 w-5" />}
            label="User Management"
            href={ROUTES.USER_MANAGEMENT}
            isActive={currentPath.startsWith(ROUTES.USER_MANAGEMENT)}
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<Settings className="h-5 w-5" />}
            label="System Settings"
            href={ROUTES.SYSTEM_CONFIG}
            isActive={currentPath.startsWith(ROUTES.SYSTEM_CONFIG)}
            isCollapsed={isCollapsed}
          />
        </nav>
      </div>

      <div className={cn("mt-auto border-t border-[#D8A23B]/10", isCollapsed ? "p-2" : "p-4")}>
        {isCollapsed ? (
          <div className="flex justify-center mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#D8A23B] to-[#9F7425] flex items-center justify-center text-[#09090B] font-bold">
              A
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-gradient-to-br from-[#D8A23B]/10 to-[#D8A23B]/5 border border-[#D8A23B]/10">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#D8A23B] to-[#9F7425] flex items-center justify-center text-[#09090B] font-bold">
              A
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Admin User</div>
              <div className="text-xs text-muted-foreground">admin@example.com</div>
            </div>
            <LuxuryThemeToggle />
          </div>
        )}
        <NavItem
          icon={<LogOut className="h-5 w-5" />}
          label="Logout"
          href="/logout"
          isActive={currentPath === "/logout"}
          isCollapsed={isCollapsed}
        />
      </div>
    </div>
  );
};

export default Sidebar;
