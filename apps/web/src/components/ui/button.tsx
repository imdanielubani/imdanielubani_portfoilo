import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export const buttonVariants = cva(
  'group/btn relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'bg-ink text-canvas hover:bg-accent hover:text-accent-ink',
        accent: 'bg-accent text-accent-ink hover:bg-ink hover:text-canvas',
        secondary: 'border border-line bg-surface-2/60 text-ink backdrop-blur hover:border-ink',
        ghost: 'text-ink underline decoration-line underline-offset-[6px] hover:decoration-accent',
        onDark: 'bg-on-teal text-teal-900 hover:bg-accent hover:text-accent-ink',
        onDarkOutline: 'border border-on-teal/30 text-on-teal hover:border-on-teal',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-5 text-[0.95rem]',
        lg: 'h-14 px-7 text-base',
        icon: 'size-11',
      },
    },
    compoundVariants: [{ variant: 'ghost', class: 'h-auto px-0' }],
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {}

export function Button({ className, variant, size, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export interface ButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    ButtonVariantProps {
  href: string
  external?: boolean
  children: ReactNode
}

/** A link styled as a button. Internal paths use next/link for client navigation. */
export function ButtonLink({ href, external, className, variant, size, download, ...props }: ButtonLinkProps) {
  const classes = cn(buttonVariants({ variant, size }), className)
  const isInternal = href.startsWith('/') && !external && !download
  if (isInternal) return <Link href={href} className={classes} {...props} />
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
