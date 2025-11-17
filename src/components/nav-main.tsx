import { type LucideIcon } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
  }[]
}) {
  return (
    <SidebarMenu className="gap-3">
      {items.map((item) => (
        <SidebarMenuItem className="h-14" key={item.title}>
          <SidebarMenuButton className="h-14" asChild isActive={item.isActive}>
            <a href={item.url}
              className="h-6">
              <item.icon className="!size-6" />
              <span className="text-lg">{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
