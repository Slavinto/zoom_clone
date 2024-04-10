"use client";

import { sidebarLinks } from "@/app/constants";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
    const pathname = usePathname();
    return (
        <section className='w-full max-w-[264px]'>
            <div className='text-white'>
                <Sheet>
                    <SheetTrigger asChild>
                        <Image
                            className='cursor-pointer sm:hidden'
                            src='/icons/hamburger.svg'
                            width={40}
                            height={40}
                            alt='menu icon'
                        />
                    </SheetTrigger>
                    <SheetContent
                        side={"left"}
                        className='border-none bg-dark-1'
                    >
                        <Link href='/' className='flex items-center gap-1'>
                            <Image
                                src='/icons/logo.svg'
                                alt='YOOM logo'
                                className='max-sm:size-10'
                                width={32}
                                height={32}
                            />
                            <p className='text-[26px] font-extrabold text-white'>
                                YOOM
                            </p>
                        </Link>
                        <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
                            <SheetClose asChild>
                                <section className='flex flex-col h-full text-white gap-6 pt-16'>
                                    {sidebarLinks.map((l) => {
                                        const isActive =
                                            pathname === l.route ||
                                            (pathname.startsWith(l.route) &&
                                                l.route !== "/");
                                        return (
                                            <SheetClose asChild key={l.label}>
                                                <Link
                                                    className={`flex gap-4 items-center p-4 rounded-lg w-full max-w-60 ${
                                                        isActive
                                                            ? "bg-blue-1"
                                                            : "bg-blue-2"
                                                    }`}
                                                    href={l.route}
                                                >
                                                    <Image
                                                        src={l.imgUrl}
                                                        width={20}
                                                        height={20}
                                                        alt={l.label}
                                                    />
                                                    <p className='font-semibold'>
                                                        {l.label}
                                                    </p>
                                                </Link>
                                            </SheetClose>
                                        );
                                    })}
                                </section>
                            </SheetClose>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </section>
    );
};

export default MobileNav;
