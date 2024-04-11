"use client";
import { actionCards } from "@/app/constants";
import ActionCard, { ActionCardType } from "./action-card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from "./meeting-modal";

export type MeetingStateType =
    | "isJoiningMeeting"
    | "isScheduleMeeting"
    | "isInstantMeeting"
    | undefined;

const MeetingTypeList = () => {
    const [meetingState, setMeetingState] = useState<MeetingStateType>();
    const router = useRouter();

    const createMeeting = () => {};

    const handleCardClick = (meetingState: MeetingStateType) => {
        if (meetingState) {
            setMeetingState(meetingState);
        } else {
            router.push("/recordings");
        }
    };

    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            {actionCards.map((card) => (
                <ActionCard
                    key={card.id}
                    card={card as ActionCardType}
                    handler={handleCardClick}
                />
            ))}
            <MeetingModal
                isOpen={meetingState === "isInstantMeeting"}
                onClose={() => setMeetingState(undefined)}
                title='Start an Instant Meeting'
                className='text-center'
                buttonText='Start Meeting'
                handleClick={createMeeting}
            />
        </section>
    );
};

export default MeetingTypeList;
