import React, { useState } from "react";
import { NavbarButton } from "@/components/navbar-button";
import { Link, usePage } from '@inertiajs/react';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Container } from '@/components/container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { IconChevronDown, IconHamburger, IconSearch, IconSettings } from '@irsyadadl/paranoid';
import { ResponsiveNavbar } from '@/components/responsive-navbar';
import { Label } from '@/components/ui/label';
import { CommandPalette } from '@/components/command-palette';
import { Filter } from '@/components/filter';
import { cn } from '@/lib/utils';

export interface NavbarItems {
   links: Array<{
      label: string;
      href: string;
   }>
};

interface NavbarProps {
   navbarItems: NavbarItems;
}

export function NavbarResponsive(props: NavbarProps) {
   const { auth, categories_g } = usePage().props;
   const [open, setOpen] = useState(false);
   const pathname = usePage().url
   return (
      <>
         <CommandPalette open={open} setOpen={setOpen} />
         <div className="pb-16 md:hidden"></div>
         <nav className="fixed top-0 z-40 flex w-full items-center py-1 justify-between border-b bg-background/80 backdrop-blur-lg border-transparent md:hidden">
            <Container>
               <div className="flex items-center justify-between">
                  <div className="flex h-14 shrink-0 items-center">
                     <IconHamburger />
                  </div>
                  <div className="flex items-center">
                     <div className="mx-4 h-8 w-px bg-foreground/45" />
                     <div className="flex items-center gap-x-7">
                        <div className="flex items-center gap-x-4">
                           <Button
                              size="icon"
                              className="size-8 rounded-full [&_svg]:size-5 [&_svg]:text-muted-foreground"
                              variant="ghost"
                              onClick={() => setOpen(true)}
                           >
                              <IconSearch />
                           </Button>
                           <ThemeToggle />
                        </div>
                     </div>
                  </div>
               </div>
            </Container>
         </nav >
      </>
   )
}