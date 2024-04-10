import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            appearance={{
                layout: {
                    logoImageUrl: "/icons/yoom-logo.svg",
                    socialButtonsVariant: "iconButton",
                },
                elements: {
                    // socialButtons:
                },
                variables: {
                    colorBackground: "#1C1F2E",
                    colorText: "#FFF",
                    colorPrimary: "#0E78F9",
                    colorInputBackground: "#252A41",
                    colorInputText: "#FFF",
                    // colorTextSecondary: "#FFF",
                    colorTextOnPrimaryBackground: "#FFF",
                    colorSuccess: "#23f234",
                    colorNeutral: "#787878",
                },
            }}
        >
            <html lang='en'>
                <body className={`${inter.className} bg-dark-2`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
