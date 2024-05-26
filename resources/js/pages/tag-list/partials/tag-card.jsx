import { Link } from '@inertiajs/react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { limitChars } from '@/lib/utils';
import { Image } from '@/components/image';

export function TagCard({ tag }) {
    return (
        <div className="space-y-4">
            <Link
                className="block overflow-hidden rounded-lg border bg-background duration-200 hover:border-foreground/20"
                href={route('tags.show', [tag])}
            >
                <AspectRatio ratio={1.91}>
                    <Image
                        className="grid h-full w-full place-content-center object-cover object-center text-center font-mono text-xs"
                        src={tag.thumbnail}
                        alt={limitChars(tag.name)}
                        width={1200}
                        height={630}
                    />
                </AspectRatio>
            </Link>

            <Badge className="inline-block outline">{tag.articles_count} Kuliner </Badge>

            <Link className="block font-semibold" href={route('tags.show', [tag])}>
                {tag.name}
            </Link>

            <p className="text-sm text-muted-foreground">{tag.teaser}</p>
        </div>
    );
}
