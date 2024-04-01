import React from "react";
import { Filter, Home, LayoutList, Newspaper } from "lucide-react";
import { Navbar, NavbarItems } from "./navbar";

const navbarItems: NavbarItems = {
   links: [
      { label: 'Home', href: '/' },
      { label: 'Articles', href: '/articles' },
      { label: 'Categories', href: '/categories' },
      { label: 'Filter', href: '/filter' }
   ],
}

export function NavbarDesktop() {
   return <Navbar navbarItems={navbarItems} />
}