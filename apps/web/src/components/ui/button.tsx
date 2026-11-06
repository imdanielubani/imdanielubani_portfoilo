import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export const buttonVariants = cva(
  'group/btn relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-[var(--ease-out)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        /** White pill with the signature orange dot. */
        primary:
          'border border-line bg-surface-2 text-ink shadow-pill hover:border-line-strong hover:shadow-card',
        secondary: 'border border-line-strong bg-transparent text-ink hover:bg-surface-2',
        solid: 'bg-ink text-canvas hover:bg-accent hover:text-accent-ink',
        ghost:
          'h-auto px-0 text-ink underline decoration-line-strong underline-offset-[6px] hover:decoration-accent',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-5 text-[0.95rem]',
        lg: 'h-12 px-6 text-base',
        icon: 'size-11',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {}

export function Button({ className, variant, size, type = 'button', ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}

export interface ButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>, ButtonVariantProps {
  href: string
  external?: boolean
  children: ReactNode
}

/** A link styled as a button. Internal paths use next/link for client navigation. */
export function ButtonLink({
  href,
  external,
  className,
  variant,
  size,
  download,
  ...props
}: ButtonLinkProps) {
  const classes = cn(buttonVariants({ variant, size }), className)
  if (href.startsWith('/') && !external && !download)
    return <Link href={href} className={classes} {...props} />
  return (
    <a
      href={href}
      className={classes}
      download={download}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    />
  )
}

/** The small orange dot used on primary actions, as in the reference design. */
export function AccentDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'size-2.5 rounded-full bg-accent transition-transform duration-300 group-hover/btn:scale-125',
        className,
      )}
    />
  )
}
