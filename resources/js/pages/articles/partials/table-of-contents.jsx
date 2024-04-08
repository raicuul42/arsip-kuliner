import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export function TableOfContents({ articleId }) {
    const [headings, setHeadings] = useState([]);
    const [currentHeadingID, setCurrentHeadingID] = useState(undefined);

    useEffect(() => {
        const headingList = document.querySelectorAll('.prose h2:not(.txteadf), .prose h3, .prose h4 h2');
        const headingArray = Array.from(headingList);
        headingArray.forEach((heading) => {
            (heading.dataset.id = Math.round(Math.random() * 100000).toString()),
                (heading.id = heading.id),
                (heading.text = heading.innerText),
                (heading.level = Number(heading.nodeName.charAt(1)));
        });

        setHeadings(headingArray);
    }, [articleId]);

    const getClassName = (level) => {
        switch (level) {
            case 2:
                return 'ml-0';
            case 3:
                return 'ml-3 toc-ch-2';
            case 4:
                return 'ml-6 toc-ch-3';
            default:
                return '';
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 1) {
                        setCurrentHeadingID(entry.target.dataset.id);
                    }
                });
            },
            {
                rootMargin: '0% 0% -80% 0%',
                threshold: 1,
            },
        );

        if (headings.length) {
            headings.forEach((s) => {
                observer.observe(s);
            });
        }

        return () => {
            return observer.disconnect();
        };
    }, [headings.length]);

    return (
        <aside className="hidden rounded-lg border bg-background p-4 lg:block">
            <h3 className="mb-2 text-lg font-semibold tracking-tight">Table of Contents</h3>
            <div className="txteadf max-h-96 overflow-y-auto">
                <ul className="flex flex-col gap-y-4">
                    {headings.map((heading, index) => (
                        <li
                            key={heading.dataset.id}
                            className={cn(
                                getClassName(heading.level),
                                'cursor-pointer text-sm tracking-tighter text-muted-foreground transition first:hidden hover:text-foreground',
                            )}
                        >
                            <span
                                key={heading.dataset.id}
                                data-id={heading.dataset.id}
                                onClick={() => {
                                    window.scrollTo({
                                        top: heading.getBoundingClientRect().top + window.scrollY - 20,
                                        behavior: 'smooth',
                                    });
                                }}
                                className={currentHeadingID === heading.dataset.id ? 'font-medium text-foreground' : ''}
                            >
                                {heading.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
