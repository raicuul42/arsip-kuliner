import { AppLayout } from '@/layouts/app-layout';
import { Container } from '@/components/container';
import { Head } from '@inertiajs/react';
import { ArticleCard } from '@/pages/articles/partials/article-card';
import { Pagination } from '@/components/pagination';
import { MetaTags } from '@/components/meta-tags';

export default function Index({ page_meta, ...props }) {
    const { data: articles, meta, links } = props.articles;
    return (
        <>
            <Head title={page_meta.title} />
            <MetaTags title={page_meta.title} description={page_meta.description} url={route('articles.index')} />
            <div className="-mt-6 mb-1 border-b bg-background py-6 sm:-mt-16 md:py-16">
                <Container>
                    <h1 className="text-2xl font-semibold leading-none tracking-tight md:text-3xl">
                        {page_meta.title}
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">{page_meta.description}</p>
                </Container>
            </div>

            <Container>
                {articles.length > 0 ? (
                    <div className="grid gap-y-16 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3 lg:py-24">
                        {articles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                ) : (
                    <p>Tidak ada masakan yang ditemukan.</p>
                )}
            </Container>
            {meta.has_pages && (
                <div className="mt-24">
                    <Pagination meta={meta} links={links} />
                </div>
            )}
        </>
    );
}

Index.layout = (page) => <AppLayout children={page} />;
