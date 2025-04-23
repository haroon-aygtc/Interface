import React from "react";
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageSection,
} from "@/components/ui/page-container";
import {
  SectionContainer,
  SectionHeader,
  SectionGrid,
  SectionDivider,
} from "@/components/ui/section-container";
import {
  AdminCard,
  AdminCardContent,
  AdminCardHeader,
  AdminCardFooter,
  AdminCardStat,
} from "@/components/ui/admin-card";

interface AdminPageTemplateProps {
  title: string;
  description?: string;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * AdminPageTemplate - A standardized template for admin panel pages
 * Provides consistent structure and styling for all admin pages
 */
export function AdminPageTemplate({
  title,
  description,
  headerActions,
  children,
}: AdminPageTemplateProps) {
  return (
    <PageContainer className="w-full">
      <PageHeader
        title={title}
        description={description}
        className="px-6 py-4 border-b border-border"
      >
        {headerActions}
      </PageHeader>
      <div className="p-6">{children}</div>
    </PageContainer>
  );
}

interface AdminSectionProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
}

/**
 * AdminSection - A standardized section for admin panel pages
 * Provides consistent structure and styling for page sections
 */
export function AdminSection({
  title,
  description,
  actions,
  children,
  className,
  divider = false,
}: AdminSectionProps) {
  return (
    <>
      <PageSection className={className}>
        {(title || description || actions) && (
          <SectionHeader
            title={title || ""}
            description={description}
            action={actions}
          />
        )}
        {children}
      </PageSection>
      {divider && <SectionDivider />}
    </>
  );
}

interface AdminGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

/**
 * AdminGrid - A standardized grid layout for admin panel pages
 * Provides consistent grid styling with responsive columns
 */
export function AdminGrid({
  children,
  columns = 2,
  className,
}: AdminGridProps) {
  return (
    <SectionGrid columns={columns} className={className}>
      {children}
    </SectionGrid>
  );
}

interface AdminStatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

/**
 * AdminStatCard - A standardized stat card for admin panel pages
 * Provides consistent styling for stat cards
 */
export function AdminStatCard(props: AdminStatCardProps) {
  return <AdminCardStat {...props} />;
}

export {
  // Re-export the components for easier imports
  PageContent,
  AdminCard,
  AdminCardContent,
  AdminCardHeader,
  AdminCardFooter,
  SectionDivider,
};
