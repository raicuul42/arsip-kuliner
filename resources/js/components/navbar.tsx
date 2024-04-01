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
import { IconChevronDown, IconSearch, IconSettings } from '@irsyadadl/paranoid';
import { ResponsiveNavbar } from '@/components/responsive-navbar';
import { Label } from '@/components/ui/label';
import { CommandPalette } from '@/components/command-palette';
import { Filter } from '@/components/filter';
import { cn } from '@/lib/utils';
import { NavbarResponsive } from "@/components/navbar-responsive";


export interface NavbarItems {
   links: Array<{
      label: string;
      href: string;
   }>
};

interface NavbarProps {
   navbarItems: NavbarItems;
}

export function Navbar(props: NavbarProps) {
   const { auth, categories_g } = usePage().props;
   const [open, setOpen] = useState(false);
   const pathname = usePage().url
   return (
      <>
         <CommandPalette open={open} setOpen={setOpen} />
         <nav className="hidden border-b bg-transparent py-2 font-medium md:block">
            <Container>
               <div className="flex items-center justify-between">
                  <div className="flex h-14 shrink-0 items-center">
                     <Link href="/" className="mr-4">
                        <Logo className="size-8" />
                     </Link>
                  </div>
                  <div className="flex items-center">
                     <div className="flex items-center gap-x-1">
                        {props.navbarItems.links.map((link, index) => (
                           <Link key={index} href={link.href}>
                              <NavbarButton
                                 variant={pathname === link.href ? 'secondary' : 'ghost'}
                                 className={pathname === link.href ? 'text-foreground' : null}>
                                 {link.label}
                              </NavbarButton>
                           </Link>
                        ))}
                     </div>
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
                        {auth.user ? (
                           <DropdownMenu>
                              <DropdownMenuTrigger className="text-muted-foreground transition duration-200 hover:text-foreground focus:outline-none">
                                 <Avatar className="size-6 sm:size-8">
                                    <AvatarImage src={auth.user.gravatar} />
                                    <AvatarFallback>{auth.user.initials}</AvatarFallback>
                                 </Avatar>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-56" align="end">
                                 <DropdownMenuLabel className="space-y-0.5">
                                    <Label>{auth.user.name}</Label>
                                    <span className="block text-sm text-muted-foreground">
                                       {auth.user.email}
                                    </span>
                                 </DropdownMenuLabel>
                                 <DropdownMenuSeparator />
                                 <DropdownMenuItem asChild>
                                    <Link href="/dashboard">Dashboard</Link>
                                 </DropdownMenuItem>
                                 <DropdownMenuItem asChild>
                                    <Link
                                       href={route('profile.edit')}
                                       className="flex items-center justify-between [&_svg]:size-4 [&_svg]:text-muted-foreground"
                                    >
                                       Settings
                                       <IconSettings />
                                    </Link>
                                 </DropdownMenuItem>
                                 <DropdownMenuSeparator />
                                 <DropdownMenuItem asChild className="w-full">
                                    <Link href="/logout" as="button" method="post">
                                       Logout
                                    </Link>
                                 </DropdownMenuItem>
                              </DropdownMenuContent>
                           </DropdownMenu>
                        ) : null}
                     </div>
                  </div>
               </div>
            </Container>
         </nav >
      </>
   )
}