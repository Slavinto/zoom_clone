import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";
import { StreamClientProvider } from "@/providers/stream-client-provider";
import React, { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className='relative'>
            <StreamClientProvider>
                <Navbar />
                <div className='flex'>
                    <Sidebar />
                    <section className='flex flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14 min-h-screen'>
                        <div className='w-full'>{children}</div>
                    </section>
                </div>
            </StreamClientProvider>
        </main>
    );
};

export default HomeLayout;
