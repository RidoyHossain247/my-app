"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"
import { ChevronLeft, ChevronRight, LayoutDashboard, Settings, Users, FileText, LogOut } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const SidebarContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isMobile: boolean
}>({
  isOpen: true,
  setIsOpen: () => {},
  isMobile: false,
})

export function SidebarProvider({ children, defaultOpen = true, ...props }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsOpen(false)
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, isMobile }}>
      <div {...props}>{children}</div>
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider")
  }
  return context
}

const Sidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { isOpen, isMobile, setIsOpen } = useSidebar()

    if (isMobile) {
      return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent {...props} />
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative hidden md:flex flex-col border-r bg-background transition-all duration-300",
          isOpen ? "w-64" : "w-16",
          className
        )}
        {...props}
      />
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col h-full", className)}
        {...props}
      />
    )
  }
)
SidebarContent.displayName = "SidebarContent"

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { isOpen } = useSidebar()
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2 p-4 border-b", className)}
        {...props}
      >
        {isOpen && (
          <h2 className="text-lg font-semibold">Admin Panel</h2>
        )}
      </div>
    )
  }
)
SidebarHeader.displayName = "SidebarHeader"

const SidebarMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn("flex-1 space-y-1 p-2", className)}
        {...props}
      />
    )
  }
)
SidebarMenu.displayName = "SidebarMenu"

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  active?: boolean
}

const SidebarMenuItem = React.forwardRef<HTMLDivElement, SidebarMenuItemProps>(
  ({ className, icon, active, children, ...props }, ref) => {
    const { isOpen } = useSidebar()
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors",
          active
            ? "bg-primary text-primary-foreground"
            : "hover:bg-accent hover:text-accent-foreground",
          !isOpen && "justify-center",
          className
        )}
        {...props}
      >
        {icon && <span className={cn("flex-shrink-0", !isOpen && "mx-auto")}>{icon}</span>}
        {isOpen && <span className="flex-1">{children}</span>}
      </div>
    )
  }
)
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-2 border-t", className)}
        {...props}
      />
    )
  }
)
SidebarFooter.displayName = "SidebarFooter"

const SidebarToggle = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { isOpen, setIsOpen, isMobile } = useSidebar()

    if (isMobile) {
      return null
    }

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn("absolute -right-3 top-4 z-10 h-6 w-6 rounded-full border bg-background", className)}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    )
  }
)
SidebarToggle.displayName = "SidebarToggle"

export {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
  SidebarToggle,
}
