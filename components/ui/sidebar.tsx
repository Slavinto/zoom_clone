"use client";

import { sidebarLinks } from "@/app/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <section className='sticky left-0 top-0 flex flex-col h-screen w-fit justify-between bg-dark-1 p-6 text-white pt-28 max-sm:hidden lg:[246px]'>
            <div className='flex flex-1 flex-col gap-6'>
                {sidebarLinks.map((l) => {
                    const isActive =
                        pathname === l.route ||
                        (pathname.startsWith(l.route) && l.route !== "/");
                    return (
                        <Link
                            className={`flex gap-4 items-center p-4 rounded-lg justify-start ${
                                isActive ? "bg-blue-1" : "bg-blue-2"
                            }`}
                            key={l.label}
                            href={l.route}
                        >
                            <Image
                                src={l.imgUrl}
                                width={24}
                                height={24}
                                alt={l.label}
                            />
                            <p className='font-semibold text-lg max-lg:hidden'>
                                {l.label}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default Sidebar;
