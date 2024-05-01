import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
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
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { IconSearch, IconSettings } from '@irsyadadl/paranoid';
import { Label } from '@/components/ui/label';
import { CommandPalette } from '@/components/command-palette';
import { useState } from 'react';
import { Filter } from '@/components/filter';
import { NewLogo } from '@/components/logo-new';

const navLinkClasses =
    'rounded-lg h-8 text-sm items-center font-medium tracking-tight text-muted-foreground hover:text-foreground inline-flex px-4 transition-colors duration-300';

export function Nav() {
    const { auth, categories_g } = usePage().props;
    const [open, setOpen] = useState(false);
    const pathname = usePage().url;
    return (
        <>
            <CommandPalette open={open} setOpen={setOpen} />
            <nav className="hidden border-b bg-transparent py-2 font-medium md:block">
                <Container>
                    <div className="flex items-center justify-between">
                        <div className="flex h-14 shrink-0 items-center">
                            <Link href="/" className="mr-4">
                                <NewLogo className="size-12" />
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center gap-x-5">
                                <NavLink active={route().current('home')} href={route('home')}>
                                    Beranda
                                </NavLink>
                                <NavLink active={route().current('articles.index')} href={route('articles.index')}>
                                    Arsip Masakan
                                </NavLink>
                                <NavLink
                                    active={route().current('category-list.index')}
                                    href={route('category-list.index')}
                                >
                                    Asal Daerah
                                </NavLink>
                                <NavLink active={route().current('tag-list.index')} href={route('tag-list.index')}>
                                    Jenis Masakan
                                </NavLink>
                                <Filter />
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
            </nav>
        </>
    );
}

export function NavLink({ active, ...props }) {
    return <Link className={cn(navLinkClasses, active && 'bg-secondary font-medium text-foreground')} {...props} />;
}
