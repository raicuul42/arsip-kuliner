import { ResponsiveNav } from '@/layouts/navigation/nav-responsive';
import { Nav } from '@/layouts/navigation/nav';
import { BottomBar } from '@/layouts/navigation/bottom-bar';

export function Navigation() {
    return (
        <>
            <Nav />
            <ResponsiveNav />
            <BottomBar />
        </>
    );
}
