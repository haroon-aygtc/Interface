import { Fragment, useState, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface DashboardPageProps {
  title: string;
  description?: string;
  breadcrumbItems?: { label: string; href?: string }[];
  actions?: React.ReactNode;
  children: React.ReactNode;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  title,
  description,
  breadcrumbItems = [],
  actions,
  children,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    // Try to get the state from localStorage, default to false if not found
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  // Save the sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="fixed top-0 left-0 h-full z-30">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      </div>
      <div className={cn(
        "flex-1 flex flex-col overflow-hidden transition-all duration-300 ml-[280px]",
        isSidebarCollapsed && "ml-[70px]"
      )}>
        <DashboardHeader
          title={title}
          description={description}
          actions={actions}
        />

        {breadcrumbItems.length > 0 && (
          <div className="px-6 py-4 border-b border-border bg-background">
            <div className="max-w-7xl mx-auto w-full">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbItems.map((item, index) => (
                  <Fragment key={item.label}>
                    <BreadcrumbItem>
                      {item.href ? (
                        <BreadcrumbLink asChild>
                          <Link to={item.href} className="text-muted-foreground hover:text-[#D8A23B]">{item.label}</Link>
                        </BreadcrumbLink>
                      ) : (
                        <span className="text-[#D8A23B]">{item.label}</span>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto p-6 bg-background text-foreground thin-scrollbar">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
