import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border',
  {
    variants: {
      variant: {
        default: 'bg-primary/20 text-primary-foreground border-primary/40 backdrop-blur-sm hover:bg-primary/30 hover:border-primary/60',
        destructive:
          'bg-destructive/20 text-destructive-foreground border-destructive/40 backdrop-blur-sm hover:bg-destructive/30 hover:border-destructive/60',
        outline: 'border-2 border-border/40 backdrop-blur-sm hover:bg-accent/10 hover:border-border/60',
        secondary:
          'bg-secondary/20 text-secondary-foreground border-secondary/40 backdrop-blur-sm hover:bg-secondary/30 hover:border-secondary/60',
        ghost: 'border-transparent hover:bg-accent/10',

        todo: 'bg-purple-100 text-purple-700 border-purple-400 backdrop-blur-sm hover:bg-purple-200 hover:border-purple-500 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/40 dark:hover:bg-purple-500/30 dark:hover:border-purple-500/60',
        'in-review':
          'bg-yellow-100 text-yellow-700 border-yellow-400 backdrop-blur-sm hover:bg-yellow-200 hover:border-yellow-500 dark:bg-yellow-500/20 dark:text-yellow-300 dark:border-yellow-500/40 dark:hover:bg-yellow-500/30 dark:hover:border-yellow-500/60',
        'design-review':
          'bg-violet-100 text-violet-700 border-violet-400 backdrop-blur-sm hover:bg-violet-200 hover:border-violet-500 dark:bg-violet-500/20 dark:text-violet-300 dark:border-violet-500/40 dark:hover:bg-violet-500/30 dark:hover:border-violet-500/60',
        done: 'bg-green-100 text-green-700 border-green-400 backdrop-blur-sm hover:bg-green-200 hover:border-green-500 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/40 dark:hover:bg-green-500/30 dark:hover:border-green-500/60',
        blocked:
          'bg-rose-100 text-rose-700 border-rose-400 backdrop-blur-sm hover:bg-rose-200 hover:border-rose-500 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/40 dark:hover:bg-rose-500/30 dark:hover:border-rose-500/60',
        'on-hold':
          'bg-blue-100 text-blue-700 border-blue-400 backdrop-blur-sm hover:bg-blue-200 hover:border-blue-500 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/40 dark:hover:bg-blue-500/30 dark:hover:border-blue-500/60',
        archived:
          'bg-gray-100 text-gray-700 border-gray-400 backdrop-blur-sm hover:bg-gray-200 hover:border-gray-500 dark:bg-gray-500/20 dark:text-gray-300 dark:border-gray-500/40 dark:hover:bg-gray-500/30 dark:hover:border-gray-500/60',
      },
      size: {
        default: 'min-h-9 px-5 py-2',
        sm: 'min-h-8 px-4 py-1.5 text-xs',
        lg: 'min-h-11 px-6 py-2.5 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
