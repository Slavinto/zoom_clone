import { ReactNode } from "react";
import { StreamClientProvider } from "@/providers/stream-client-provider";

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            <StreamClientProvider>{children}</StreamClientProvider>
        </main>
    );
};

export default RootLayout;
