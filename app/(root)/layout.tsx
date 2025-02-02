import { ReactNode } from "react";
import { StreamClientProvider } from "@/providers/stream-client-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "YOOM",
    description: "Video Call App",
    icons: {
        icon: "/icons/logo.svg",
    },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            <StreamClientProvider>{children}</StreamClientProvider>
        </main>
    );
};

export default RootLayout;
