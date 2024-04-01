import React, { useState } from "react";
import { SidebarButton } from "./sidebar-button";
import { LucideIcon } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from "@/components/ui/button";
import { IconSearch } from "@irsyadadl/paranoid";
import { CommandPalette } from '@/components/command-palette';


export interface SidebarItems {
    links: Array<{
        label: string;
        href: string;
        icon?: LucideIcon;
    }>
};

interface SidebarProps {
    sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: SidebarProps) {
    const [open, setOpen] = useState(false);
    const pathname = usePage().url
    return (
        <>
            <CommandPalette open={open} setOpen={setOpen} />
            <aside className="w-60 max-w-xs h-screen fixed left-0 top-0 z-40 border-r">
                <div className="h-full px-3 py-4">
                    <Link href="/">
                        <span className="mx-3 text-lg font-semibold text-foreground">Arsip Kuliner</span>
                    </Link>
                    <div className="mt-5">
                        <div className="flex flex-col gap-2 w-full">
                            {props.sidebarItems.links.map((link, index) => (
                                <Link key={index} href={link.href}>
                                    <SidebarButton
                                        variant={pathname === link.href ? 'secondary' : 'ghost'}
                                        icon={link.icon} className="w-full">
                                        {link.label}
                                    </SidebarButton>
                                </Link>
                            ))}
                        </div>
                        <div className="text-base absolute left-3 bottom-10 w-full px-3">
                            <Separator className="absolute -top-3 w-full -left-3" />
                            <div className="flex w-full gap-x-8">
                                <div className="[&_button]:size-8 [&_button]:place-content-center [&_button]:rounded-full [&_svg]:size-6 [&_svg]:text-muted-foreground">
                                    <Button
                                        size="icon"
                                        className="size-8 rounded-full [&_svg]:size-4 [&_svg]:text-muted-foreground"
                                        variant="ghost"
                                        onClick={() => setOpen(true)}
                                    >
                                        <IconSearch />
                                    </Button>
                                </div>
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}