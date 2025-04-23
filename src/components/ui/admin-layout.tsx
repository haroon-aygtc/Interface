import React from "react";
import { cn } from "@/lib/utils";

interface AdminContentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * AdminContent - A standardized content container for admin panel pages
 * Provides consistent padding and structure for all admin content
 */
export function AdminContent({ children, className }: AdminContentProps) {
  return <div className={cn("p-4 sm:p-6 lg:p-8", className)}>{children}</div>;
}

interface AdminSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

/**
 * AdminSection - A standardized section for admin panel content
 * Provides consistent structure and styling for content sections
 */
export function AdminSection({
  children,
  className,
  title,
  description,
  actions,
}: AdminSectionProps) {
  return (
    <div className={cn("mb-6 last:mb-0", className)}>
      {(title || description || actions) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-3">
          <div>
            {title && (
              <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex-shrink-0">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

interface AdminCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * AdminCard - A standardized card for admin panel content
 * Provides consistent styling for cards within admin sections
 */
export function AdminCard({ children, className }: AdminCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-md border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface AdminCardContentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * AdminCardContent - Content area for admin cards
 * Provides consistent padding for card content
 */
export function AdminCardContent({
  children,
  className,
}: AdminCardContentProps) {
  return <div className={cn("p-4 sm:p-5", className)}>{children}</div>;
}

interface AdminGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

/**
 * AdminGrid - A standardized grid layout for admin panel content
 * Provides consistent grid styling with responsive columns
 */
export function AdminGrid({
  children,
  className,
  columns = 2,
}: AdminGridProps) {
  return (
    <div
      className={cn(
        "grid gap-3 sm:gap-4 lg:gap-5 mb-6",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 &&
          "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
