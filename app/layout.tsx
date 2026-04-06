import type { Metadata } from 'next'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: '--font-bricolage' });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: '--font-instrument' });

export const metadata: Metadata = {
  title: 'FlexiBerry | Super Admin Dashboard',
  description: 'Professional installment platform management dashboard for FlexiBerry',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bricolage.variable} ${instrument.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
