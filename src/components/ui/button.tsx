import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95  duration-100',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-border bg-background hover:bg-base-200 hover:text-base-content',
        'outline-destructive':
          'border border-destructive/20 bg-background text-destructive hover:bg-destructive hover:text-destructive-foreground',
        'outline-success':
          'border border-success/20 bg-background text-success hover:bg-success hover:text-success-foreground',
        'outline-accent':
          'border border-accent/20 bg-background text-accent hover:bg-accent hover:text-accent-foreground',
        accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'text-foreground hover:bg-base-300',
        'ghost-destructive': 'text-destructive hover:bg-destructive/10 ',
        link: 'text-primary underline-offset-4 hover:underline',
        gradient: 'bg-gradient text-foreground border',
        'gradient-accent':
          '!bg-gradient-to-r !from-accent/80 !to-accent/70 !text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-7 px-2.5 text-xs',
        sm: 'h-8 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface IconProps {
  Icon: React.ElementType;
  iconPlacement: 'left' | 'right';
}

interface IconRefProps {
  Icon?: never;
  iconPlacement?: undefined;
}

export type ButtonIconProps = IconProps | IconRefProps;

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  Icon,
  iconPlacement,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> &
  ButtonIconProps & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {Icon && iconPlacement === 'left' && (
        <div className='w-5 pr-2 transition-all duration-200'>
          <Icon />
        </div>
      )}
      {props.children}
      {Icon && iconPlacement === 'right' && (
        <div className='w-5 pr-2 transition-all duration-200'>
          <Icon />
        </div>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
