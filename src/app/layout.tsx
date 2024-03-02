import { cn } from "@/lib/utils";
import "../styles/globals.css";

import type { Metadata } from "next";
import font from "next/font/local";
import { Toaster } from "react-hot-toast";

const primary = font({
  src: "../fonts/roobert-variable.woff2",
});

export const metadata: Metadata = {
  title: "Lavender",
  description: "woa welcome to my world wide website :3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-grid-neutral-200/40 bg-neutral-100 text-neutral-900 antialiased dark:bg-grid-neutral-800/50 dark:bg-neutral-900 dark:text-neutral-100 min-h-full">
        <div className={cn(primary.className, "pb-8")}>
          <div>{children}</div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
