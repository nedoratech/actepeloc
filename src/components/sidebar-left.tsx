import * as React from "react"
import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2,
} from "lucide-react"

import LogoAPLColour from "@/assets/img/logoAPLColour.svg?react";
import NewContract from "@/assets/img/newContract.svg?react";
import MyContracts from "@/assets/img/myContracts.svg?react";
import PremiumPlans from "@/assets/img/premiumPlans.svg?react";
import Settings from "@/assets/img/settings.svg?react";

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Contract Nou",
      url: "#",
      icon: NewContract,
    },
    {
      title: "Contractele Mele",
      url: "#",
      icon: MyContracts,
    },
    {
      title: "Planuri Premium",
      url: "#",
      icon: PremiumPlans,
      isActive: true,
    },
    {
      title: "Setări Cont",
      url: "#",
      icon: Settings,
      badge: "10",
    },
  ]
}

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <LogoAPLColour />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  )
}
