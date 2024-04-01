import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { CommandDialog, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { router, usePage } from '@inertiajs/react';
import { LogOut, Settings, Filter, Home, LayoutList, Newspaper, SquareLibrary, LayoutDashboard } from 'lucide-react';

const cmdic = '!rounded-md !py-2 [&_svg]:!size-4 [&_svg]:text-muted-foreground [&_svg]:mr-2';

export function CommandPalette({ open, setOpen }) {
    const { auth } = usePage().props;
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const down = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        window.addEventListener('keydown', down);
        return () => window.removeEventListener('keydown', down);
    }, []);

    const debouncedSearch = useCallback(
        debounce(async (value) => {
            const { data } = await axios(
                route('articles.search', {
                    search: value,
                }),
            );
            setResults(data);
        }, 300),
        [],
    );

    function searchHandler(value) {
        setSearch(value);
        debouncedSearch(value);
    }

    useEffect(() => {
        router.on('navigate', () => setOpen(false));
    }, []);

    return (
        <>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput value={search} onValueChange={searchHandler} placeholder="Type a command or search..." />
                <CommandList className="p-2">
                    {results.length > 0 ? (
                        results.map((article) => (
                            <CommandItem className={cmdic} key={article.id} onSelect={() => router.get(article.href)}>
                                <Newspaper />
                                {article.title}
                            </CommandItem>
                        ))
                    ) : (
                        <>
                            {auth.user ? (
                                <>
                                    <CommandItem className={cmdic} onSelect={() => router.get(route('dashboard'))}>
                                        <LayoutDashboard />
                                        Dashboard
                                    </CommandItem>
                                    <CommandItem className={cmdic} onSelect={() => router.get(route('profile.edit'))}>
                                        <Settings />
                                        Settings
                                    </CommandItem>
                                    <CommandItem
                                        className={cmdic}
                                        onSelect={() => router.get(route('internal-articles.index'))}
                                    >
                                        <SquareLibrary />
                                        List articles
                                    </CommandItem>
                                    <CommandItem className={cmdic} onSelect={() => router.post(route('logout'))}>
                                        <LogOut />
                                        Log out
                                    </CommandItem>
                                </>
                            ) : (
                                <>
                                    <CommandItem className={cmdic} onSelect={() => router.get(route('home'))}>
                                        <Home />
                                        Home
                                    </CommandItem>
                                    <CommandItem className={cmdic} onSelect={() => router.get(route('articles.index'))}>
                                        <Newspaper />
                                        Articles
                                    </CommandItem>
                                    <CommandItem className={cmdic} onSelect={() => router.get(route('articles.index'))}>
                                        <LayoutList />
                                        Categories
                                    </CommandItem>
                                    <CommandItem className={cmdic} onSelect={() => router.get(route('articles.index'))}>
                                        <Filter />
                                        Filter
                                    </CommandItem>
                                </>
                            )}
                        </>
                    )}
                </CommandList>
            </CommandDialog>
        </>
    );
}
