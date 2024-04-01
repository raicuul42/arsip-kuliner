import { Toaster } from '@/components/ui/sonner';
import { Footer } from '@/components/footer';
import { Sidebar } from '@/components/sidebar';
import { NavbarDesktop } from '@/components/navbar-desktop';

export function AppLayout({ children }) {
    return (
        <div>
            <Toaster position="top-right" />
            <NavbarDesktop />
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 py-6 md:py-6 lg:pb-24 lg:pt-16">
                {children}
            </main>
            <Footer />
        </div>
    );
}
