import localFont from 'next/font/local'
import { Mrs_Saint_Delafield } from 'next/font/google'

/** Satoshi (Indian Type Foundry, Fontshare free licence), self-hosted variable font. */
export const fontSans = localFont({
  src: [
    { path: '../fonts/Satoshi-Variable.woff2', weight: '300 900', style: 'normal' },
    { path: '../fonts/Satoshi-VariableItalic.woff2', weight: '300 900', style: 'italic' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

/** Script face used only for the footer signature. */
export const fontSignature = Mrs_Saint_Delafield({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-signature',
  display: 'swap',
})

export const fontVariables = [fontSans.variable, fontSignature.variable].join(' ')
