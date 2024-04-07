import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Link, router, usePage } from '@inertiajs/react';
import { Logo } from '@/components/logo';
import { CoffeeIcon, HomeIcon, LayoutGridIcon, PowerIcon, Settings2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { Container } from '@/components/container';
import { IconHamburger } from '@irsyadadl/paranoid';
import { useState, useEffect } from 'react';
import { useScroll } from '@/hooks/use-scroll';

export function ResponsiveNav() {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const scroll = useScroll();
    useEffect(() => {
        return router.on('finish', () => {
            setOpen(false);
        });
    }, []);
    return (
        <>
            <div className="pb-16 md:hidden"></div>
            <nav
                className={`fixed top-0 z-40 w-full border-b bg-background/70 py-2 backdrop-blur-lg transition-all md:hidden ${scroll.y > 150 && scroll.y - scroll.lastY > 0 ? '-translate-y-full' : 'null'}`}
            >
                <Container>
                    <ul className="flex items-center justify-between">
                        <div className="flex">
                            <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
                                <IconHamburger className="size-6" />
                            </Button>
                        </div>
                        <div className="flex">
                            <Link href={route('home')}>
                                <Logo className="size-6" />
                            </Link>
                        </div>
                        <div className="flex">
                            <ThemeToggle />
                        </div>
                    </ul>
                </Container>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetContent side="left" className="w-3/5">
                        <Link href="/" className="mr-4">
                            <Logo className="size-6" />
                        </Link>
                        <div className="-mx-2">
                            <NavLink active={route().current('home')} icon={HomeIcon} href={route('home')}>
                                Home
                            </NavLink>
                            <NavLink
                                active={route().current('articles.index')}
                                icon={CoffeeIcon}
                                href={route('articles.index')}
                            >
                                Articles
                            </NavLink>
                            {auth.user ? (
                                <>
                                    <NavLink
                                        active={route().current('profile.edit')}
                                        icon={Settings2Icon}
                                        href={route('profile.edit')}
                                    >
                                        Settings
                                    </NavLink>
                                    <NavLink
                                        icon={LayoutGridIcon}
                                        active={route().current('internal-articles.index')}
                                        href={route('internal-articles.index')}
                                    >
                                        List of Articles
                                    </NavLink>
                                    <NavLink icon={PowerIcon} href={route('logout')} method="post" as="button">
                                        Logout
                                    </NavLink>
                                </>
                            ) : null}
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </>
    );
}

export function NavLink({ active, icon: Icon, ...props }) {
    return (
        <Link
            className={cn(
                'mb-2 flex items-center rounded px-2 py-2 text-sm hover:bg-accent',
                active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
            {...props}
        >
            <Icon className="mr-2 h-4 w-4" />
            {props.children}
        </Link>
    );
}
