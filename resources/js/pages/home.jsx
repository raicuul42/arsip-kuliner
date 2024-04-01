import { AppLayout } from '@/layouts/app-layout';
import { Container } from '@/components/container';
import { Head, Link } from '@inertiajs/react';
import { ArticleCard } from '@/pages/articles/partials/article-card';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MetaTags } from '@/components/meta-tags';

export default function Home(props) {
    const { articles, popular_articles } = props;
    return (
        <div>
            <Head title="Home" />
            <MetaTags
                title="Ensiklopedia Masakan Nusantara"
                description="Temukan Warisan Kuliner dalam Satu Aplikasi!"
                url={route('home')}
            />
            <Hero />
            <Container>
                <div className="space-y-16 sm:space-y-24">
                    <section id="populer">
                        <CardHeader className="mb-6 p-0">
                            <CardTitle>Popular Articles</CardTitle>
                            <CardDescription>A collection of the most popular articles from our blog.</CardDescription>
                        </CardHeader>
                        {popular_articles.length > 0 ? (
                            <div className="grid gap-x-12 gap-y-16 lg:grid-cols-3">
                                {popular_articles.map((article) => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </div>
                        ) : (
                            <p>No articles found.</p>
                        )}
                    </section>
                    <section id="latest">
                        <CardHeader className="mb-6 p-0">
                            <CardTitle>Latest Articles</CardTitle>
                            <CardDescription>A collection of the latest articles from our blog.</CardDescription>
                        </CardHeader>
                        {articles.length > 0 ? (
                            <div className="grid gap-x-12 gap-y-16 lg:grid-cols-3">
                                {articles.map((article) => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </div>
                        ) : (
                            <p>No articles found.</p>
                        )}
                    </section>
                </div>
            </Container>
        </div>
    );
}

function Hero() {
    return (
        <div className="relative isolate -mt-6 mb-6 overflow-hidden border-b bg-background lg:-mt-16 lg:mb-16">
            <svg
                className="absolute inset-0 -z-10 hidden h-full w-full stroke-foreground/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] md:block"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                        width={200}
                        height={200}
                        x="50%"
                        y={-1}
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <svg x="50%" y={-1} className="overflow-visible fill-foreground/5">
                    <path
                        d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                        strokeWidth={0}
                    />
                </svg>
                <rect width="100%" height="100%" strokeWidth={0} fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
            </svg>
            <div
                className="absolute left-[calc(50%-4rem)] top-10 -z-10 hidden transform-gpu blur-3xl sm:left-[calc(50%-18rem)] md:top-[calc(50%-30rem)] md:block lg:left-48 xl:left-[calc(50%-24rem)]"
                aria-hidden="true"
            >
                <div
                    className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-sky-500 to-blue-600 opacity-20"
                    style={{
                        clipPath:
                            'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                    }}
                />
            </div>
            <div className="relative mx-auto max-w-7xl items-center px-6 pb-16 sm:pt-6 md:grid md:h-screen md:items-center md:pt-0">
                <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-2xl lg:pt-8">
                    <div className="hidden md:block">
                        <Link href={route('articles.index')} className="inline-flex space-x-6">
                            <span className="rounded-full bg-sky-500/10 px-3 py-1 text-sm font-semibold leading-6 text-sky-400 ring-1 ring-inset ring-sky-500/20">
                                What's new
                            </span>
                        </Link>
                    </div>
                    <h1 className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-5xl/[3.5rem] md:text-6xl lg:text-7xl">
                        Arsip Kuliner
                    </h1>
                    <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-xl/[2rem] xl:text-2xl/[2.3rem]">
                        <strong>Ensiklopedia Masakan Nusantara:</strong> Jelajahi Kelezatan Nusantara di Ujung Jari
                        Anda. Temukan Warisan Kuliner dalam Satu Aplikasi!
                    </p>
                </div>
            </div>
        </div>
    );
}

Home.layout = (page) => <AppLayout children={page} />;
