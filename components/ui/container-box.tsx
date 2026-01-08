import { cn } from "@/lib/utils";
import * as React from "react";

export interface ContainerBoxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full",
};

export function ContainerBox({
  children,
  className,
  maxWidth = "md",
  ...props
}: ContainerBoxProps) {
  return (
    <div
      className={cn(
        "container mx-auto px-4",
        maxWidthClasses[maxWidth],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
