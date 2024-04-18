import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Link, router, usePage } from '@inertiajs/react';
import { Logo } from '@/components/logo';
import {
    IconHome,
    IconHomeFill,
    IconSketchbook,
    IconSketchbookFill,
    IconLogout,
    IconGrid4,
    IconGrid4Fill,
    IconSearch,
    IconHamburger,
    IconSettings,
    IconSettingsFill,
} from '@irsyadadl/paranoid';
import { CommandPalette } from '@/components/command-palette';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { Container } from '@/components/container';
import { useState, useEffect } from 'react';
import { useScroll } from '@/hooks/use-scroll';
import { Filter, FilterResponsive } from '@/components/filter';

export function ResponsiveNav() {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const scroll = useScroll();
    useEffect(() => {
        return router.on('finish', () => {
            setOpen(false);
            setSearchOpen(false);
        });
    }, []);
    return (
        <>
            <CommandPalette open={searchOpen} setOpen={setSearchOpen} />
            <div className="pb-16 md:hidden"></div>
            <nav
                className={`fixed top-0 z-40 w-full border-b bg-background/70 py-2 backdrop-blur-lg transition-all md:hidden ${scroll.y > 150 && scroll.y - scroll.lastY > 0 ? '-translate-y-full' : 'null'}`}
            >
                <Container>
                    <ul className="flex items-center justify-between">
                        {auth.user ? (
                            <div className="flex">
                                <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
                                    <IconHamburger className="size-6" />
                                </Button>
                            </div>
                        ) : (
                            <ThemeToggle />
                        )}

                        <div className="flex">
                            <Filter />
                        </div>
                        <div className="flex">
                            <Button
                                size="icon"
                                className="size-8 rounded-full [&_svg]:size-5 [&_svg]:text-muted-foreground"
                                variant="ghost"
                                onClick={() => setSearchOpen(true)}
                            >
                                <IconSearch />
                            </Button>
                        </div>
                    </ul>
                </Container>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetContent side="left" className="w-3/5">
                        <Link href="/" className="mr-4">
                            <Logo className="size-6" />
                        </Link>
                        <div className="-mx-2">
                            <NavLink
                                key={'home'}
                                active={route().current('home')}
                                icon={IconHome}
                                activeIcon={IconHomeFill}
                                href={route('home')}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                key={'articles.index'}
                                active={route().current('articles.index')}
                                icon={IconSketchbook}
                                href={route('articles.index')}
                                activeIcon={IconSketchbookFill}
                            >
                                Articles
                            </NavLink>

                            {auth.user ? (
                                <>
                                    <NavLink
                                        key={'internal-articles.index'}
                                        icon={IconGrid4}
                                        active={route().current('internal-articles.index')}
                                        activeIcon={IconGrid4Fill}
                                        href={route('internal-articles.index')}
                                    >
                                        Dashboard
                                    </NavLink>
                                    <NavLink
                                        key={'profile.edit'}
                                        icon={IconSettings}
                                        active={route().current('profile.edit')}
                                        activeIcon={IconSettingsFill}
                                        href={route('profile.edit')}
                                    >
                                        Settings
                                    </NavLink>
                                    <NavLink icon={IconLogout} href={route('logout')} method="post" as="button">
                                        Logout
                                    </NavLink>

                                    <div className="absolute bottom-6 left-6">
                                        <ThemeToggle />
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </>
    );
}

export function NavLink({ active, icon: Icon, activeIcon: ActiveIcon, ...props }) {
    return (
        <Link
            className={cn(
                'mb-2 flex items-center rounded px-2 py-2 text-sm hover:bg-accent',
                active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
            {...props}
        >
            {active ? <ActiveIcon className="mr-2 h-4 w-4" /> : <Icon className="mr-2 h-4 w-4" />}
            {props.children}
        </Link>
    );
}
