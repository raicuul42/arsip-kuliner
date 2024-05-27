import * as React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '@/lib/utils';

const defaultClasses =
    'flex min-h-[80px] w-full rounded-md border border-input max-h-[36rem] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

const Textarea = React.forwardRef(({ autoSize, className, ...props }, ref) => {
    if (autoSize) {
        return <TextareaAutosize className={cn(defaultClasses, className)} ref={ref} {...props} />;
    }

    return <textarea className={cn(defaultClasses, className)} ref={ref} {...props} />;
});

Textarea.displayName = 'Textarea';

export { Textarea };
