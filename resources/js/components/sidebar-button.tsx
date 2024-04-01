import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarButtonProps extends ButtonProps {
    icon?: LucideIcon;
}

export function SidebarButton({
    icon: Icon,
    className,
    children,
    ...props
}: SidebarButtonProps) {
    return (
        <Button
            variant='ghost'
            className={cn('justify-start gap-4 rounded-full', className)}
            {...props}
        >
            {Icon && <Icon size={24} />}
            <span className='text-base'>{children}</span>
        </Button>
    );
}
