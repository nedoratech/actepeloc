import * as React from "react"

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
      <SidebarHeader className="p-4">
        <LogoAPLColour className="py-4 px-2 h-25"/>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  )
}
