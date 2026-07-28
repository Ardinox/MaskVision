import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

import {
  Inter,
  Space_Grotesk,
  JetBrains_Mono, Geist
} from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, space.variable, mono.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >

      <body className="min-h-screen flex flex-col">

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>

      </body>

    </html>
  );
}
