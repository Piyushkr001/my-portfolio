import type { Metadata } from "next";
import { Ubuntu_Sans } from "next/font/google";
import "./globals.css";
import { FlipHorizontalIcon, Home, PhoneIcon, User } from "lucide-react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Footer from "@/components/ui/footer";

const inter = Ubuntu_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Here is my portfolio",
};

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About",
    link: "#about",
    icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Projects",
    link: "#projects",
    icon: <FlipHorizontalIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Contact",
    link: "#contacts",
    icon: <PhoneIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className= {cn("min-h-screen bg-background font-sans antialiased",inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FloatingNav navItems={navItems} />
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
