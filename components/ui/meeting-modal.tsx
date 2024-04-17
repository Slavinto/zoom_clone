import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

type MeetingModalType = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    children?: ReactNode;
    buttonIcon?: string;
    buttonText?: string;
    handleClick?: () => void;
    image?: string;
};

const MeetingModal = ({
    isOpen,
    onClose,
    title,
    image,
    className,
    children,
    buttonIcon,
    buttonText,
    handleClick,
}: MeetingModalType) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white'>
                <div className='flex flex-col gap-6 items-center'>
                    {image && (
                        <div className='flex justify-center'>
                            <Image
                                src={image}
                                alt='modal image'
                                width={72}
                                height={72}
                            />
                        </div>
                    )}
                    <h1 className='text-3xl font-bold leading-[42px]'>
                        {title}
                    </h1>
                    {children}
                    <Button
                        className='bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0'
                        onClick={handleClick}
                    >
                        {buttonIcon && (
                            <Image
                                src={buttonIcon}
                                alt='button icon'
                                width={13}
                                height={13}
                            />
                        )}
                        &nbsp;
                        {buttonText || "Schedule Meeting"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MeetingModal;
