import React, { ReactNode } from "react";

type MeetingModalType = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    children?: ReactNode;
    buttonText?: string;
    handleClick?: () => void;
    image?: string;
    buttonIcon?: string;
};

const MeetingModal = ({
    isOpen,
    onClose,
    title,
    className,
    children,
    buttonText,
    handleClick,
}: MeetingModalType) => {
    return <div>MeetingModal</div>;
};

export default MeetingModal;
