"use client";
import Image from "next/image";
import type { MeetingStateType } from "./meeting-type-list";

export type ActionCardType = {
    id: number;
    bgColor: string;
    textPrimary: string;
    textSecondary: string;
    iconPath: string;
    meetingState: MeetingStateType;
};

const ActionCard = ({
    card,
    handler,
}: {
    card: ActionCardType;
    handler: (m: MeetingStateType) => void;
}) => {
    const { bgColor, textPrimary, textSecondary, iconPath, meetingState } =
        card;
    return (
        <div
            className={`px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer ${bgColor}`}
            onClick={() => handler(meetingState)}
        >
            <div className='glassmorphism flex-center w-[56px] h-[56px] rounded-[10px]'>
                <Image
                    src={iconPath}
                    alt='add meeting icon'
                    width={27}
                    height={27}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>{textPrimary}</h1>
                <p className='text-lg font-normal'>{textSecondary}</p>
            </div>
        </div>
    );
};

export default ActionCard;
