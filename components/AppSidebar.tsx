"use client"

import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/app/store/useAuthStore"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
  SidebarToggle,
  useSidebar,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Settings, Users, FileText, LogOut } from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Users",
    icon: Users,
    href: "/dashboard/users",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
  {
    title: "Reports",
    icon: FileText,
    href: "/dashboard/reports",
  },
]

export function AppSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuthStore()
  const { isOpen, isMobile, setIsOpen } = useSidebar()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleNavigation = (href: string) => {
    router.push(href)
    if (isMobile) {
      setIsOpen(false)
    }
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarToggle />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <SidebarMenuItem
                key={item.href}
                icon={<Icon className="h-5 w-5" />}
                active={isActive}
                onClick={() => handleNavigation(item.href)}
              >
                {item.title}
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="space-y-2">
          {isOpen && user && (
            <div className="px-3 py-2 text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          )}
          <SidebarMenuItem
            icon={<LogOut className="h-5 w-5" />}
            onClick={handleLogout}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Logout
          </SidebarMenuItem>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
