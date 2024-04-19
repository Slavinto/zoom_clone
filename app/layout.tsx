import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "YOOM",
    description: "Video Call App",
    icons: {
        icon: "/icons/logo.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
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
                        colorTextOnPrimaryBackground: "#FFF",
                        colorSuccess: "#23f234",
                        colorNeutral: "#787878",
                    },
                }}
            >
                <body className={`${inter.className} bg-dark-2`}>
                    {children}
                    <Toaster />
                </body>
            </ClerkProvider>
        </html>
    );
}
