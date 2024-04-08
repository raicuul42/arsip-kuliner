import {
    IconHome,
    IconHomeFill,
    IconSketchbook,
    IconSketchbookFill,
    IconStore2,
    IconStore2Fill,
    IconSearch,
} from '@irsyadadl/paranoid';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { CommandPalette } from '@/components/command-palette';
import { Button } from '@/components/ui/button';

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
                    ></NavButton>
                    <NavButton
                        key={'articles.index'}
                        active={route().current('articles.index')}
                        icon={IconSketchbook}
                        href={route('articles.index')}
                        activeIcon={IconSketchbookFill}
                    ></NavButton>
                    <NavButton icon={IconStore2} activeIcon={IconStore2Fill}></NavButton>
                    <Button
                        size="icon"
                        className="size-8 rounded-full [&_svg]:size-5 [&_svg]:text-muted-foreground"
                        variant="ghost"
                        onClick={() => setOpen(true)}
                    >
                        <IconSearch />
                    </Button>
                </ul>
            </nav>
        </>
    );
}

export function NavButton({ active, icon: Icon, activeIcon: ActiveIcon, ...props }) {
    return (
        <Link className={cn('grid place-content-center rounded-lg px-3 py-3.5')} {...props}>
            {active ? <ActiveIcon className="mb-1 h-5 w-5" /> : <Icon className="mb-1 h-5 w-5" />}
            {props.children}
        </Link>
    );
}
