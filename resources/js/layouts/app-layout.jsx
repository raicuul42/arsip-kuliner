import { Toaster } from '@/components/ui/sonner';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export function AppLayout({ children }) {
    return (
        <div>
            <Toaster position="top-right" />
            <Navbar />
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 py-6 md:py-16 lg:pb-24">
                {children}
            </main>
            <Footer />
        </div>
    );
}
