import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconChevronDown, IconFilter, IconFilterFill } from '@irsyadadl/paranoid';

export const filters = [
    {
        name: 'Populer minggu ini',
        href: '/articles/week',
    },
    {
        name: 'Populer bulan ini',
        href: '/articles/month',
    },
    {
        name: 'Populer tahun ini',
        href: '/articles/year',
    },
    {
        name: 'Populer sepanjang masa',
        href: '/articles/all-time',
    },
    {
        name: 'Terbaru',
        href: '/articles',
    },
];

export function Filter() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={cn(
                    'group flex items-center pl-3 text-sm text-muted-foreground transition duration-200 hover:text-foreground focus:outline-none',
                    'data-[state=open]:text-foreground',
                )}
            >
                Filter
                <IconChevronDown className="ml-2 size-4 duration-200 group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {filters.map((filter) => (
                    <DropdownMenuItem asChild key={filter.name}>
                        <Link href={filter.href}>{filter.name}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function FilterResponsive() {
    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>Filter</DropdownMenuSubTrigger>
            <DropdownMenuSubContent sideOffset={-32}>
                {filters.map((filter) => (
                    <DropdownMenuItem key={filter.name} asChild>
                        <Link href={filter.href}>{filter.name}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    );
}
