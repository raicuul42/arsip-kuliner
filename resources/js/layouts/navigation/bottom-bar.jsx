import {
    IconHome,
    IconHomeFill,
    IconSketchbook,
    IconSketchbookFill,
    IconPriceTag,
    IconPriceTagFill,
    IconListBullets,
    IconListBulletsFill,
    IconGrid4,
    IconGrid4Fill,
} from '@irsyadadl/paranoid';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { CommandPalette } from '@/components/command-palette';

export function BottomBar() {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);

    return (
        <>
            <CommandPalette open={open} setOpen={setOpen} />
            <nav className="fixed bottom-0 z-50 w-full border-t border-foreground/10 bg-background/80 px-4 backdrop-blur-lg md:hidden">
                <ul className="flex w-full items-center justify-between gap-x-2">
                    <NavButton
                        key={'home'}
                        active={route().current('home')}
                        icon={IconHome}
                        href={route('home')}
                        activeIcon={IconHomeFill}
                    >
                        Home
                    </NavButton>
                    <NavButton
                        key={'articles.index'}
                        active={route().current('articles.index')}
                        icon={IconSketchbook}
                        href={route('articles.index')}
                        activeIcon={IconSketchbookFill}
                    >
                        Articles
                    </NavButton>
                    <NavButton
                        key={'category-list.index'}
                        active={route().current('category-list.index')}
                        icon={IconListBullets}
                        activeIcon={IconListBulletsFill}
                        href={route('category-list.index')}
                    >
                        Categories
                    </NavButton>
                    <NavButton
                        key={'tag-list.index'}
                        active={route().current('tag-list.index')}
                        icon={IconPriceTag}
                        activeIcon={IconPriceTagFill}
                        href={route('tag-list.index')}
                    >
                        Tags
                    </NavButton>
                    {auth.user ? (
                        <>
                            <NavButton
                                key={'internal-articles.index'}
                                active={route().current('internal-articles.index')}
                                icon={IconGrid4}
                                activeIcon={IconGrid4Fill}
                                href={route('internal-articles.index')}
                            >
                                Dashboard
                            </NavButton>
                        </>
                    ) : null}
                </ul>
            </nav>
        </>
    );
}

export function NavButton({ active, icon: Icon, activeIcon: ActiveIcon, ...props }) {
    return (
        <Link className={cn('flex flex-col items-center justify-center px-3 py-3.5 text-xs')} {...props}>
            {active ? <ActiveIcon className="mb-1 h-5 w-5" /> : <Icon className="mb-1 h-5 w-5" />}
            {props.children}
        </Link>
    );
}
