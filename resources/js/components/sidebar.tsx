import React from "react";
import { SidebarDesktop, SidebarItems } from "./sidebar-desktop";
import { Filter, Home, LayoutList, Newspaper } from "lucide-react";

const sidebarItems: SidebarItems = {
   links: [
      { label: 'Home', href: '/', icon: Home },
      { label: 'Articles', href: '/articles', icon: Newspaper },
      { label: 'Categories', href: '/categories', icon: LayoutList },
      { label: 'Filter', href: '/filter', icon: Filter }
   ],
}

export function Sidebar() {
   return <SidebarDesktop sidebarItems={sidebarItems} />
}