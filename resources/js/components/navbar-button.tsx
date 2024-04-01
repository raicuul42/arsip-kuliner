import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function NavbarButton({ className, children, ...props }) {
   return (
      <Button
         variant='ghost'
         className={cn('font-medium text-muted-foreground h-8 w-10/12 ', className)}
         {...props}
      >
         <span>{children}</span>
      </Button>
   );
}
