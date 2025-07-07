import { cn } from "@/lib/utils";
import "../styles/globals.css";

import type { Metadata } from "next";
import font from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

const primary = font({
    src: "../fonts/roobert-variable.woff2",
});

const primaryFont = Plus_Jakarta_Sans({
    subsets: ["latin"],
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
            <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" />
            <body
    className="bg-neutral-100 text-neutral-900 antialiased dark:bg-neutral-900 dark:text-neutral-100 min-h-full"
    style={{
        backgroundImage: `url('/background.svg')`,
        backgroundRepeat: "repeat", // Repeats the background
        backgroundSize: "auto",     // Uses natural image size (or adjust as needed)
        backgroundPosition: "top left", // Start from top-left
    }}
>

                <div className={cn(primaryFont.className, "pb-8")}>
                    <div>{children}</div>
                    <Toaster />
                </div>
            </body>
        </html>
    );
}
