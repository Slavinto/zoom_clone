"use client";
import { actionCards } from "@/app/constants";
import ActionCard, { ActionCardType } from "./action-card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from "./meeting-modal";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { useToast } from "./use-toast";

export type MeetingStateType =
    | "isJoiningMeeting"
    | "isScheduleMeeting"
    | "isInstantMeeting"
    | undefined;

const MeetingTypeList = () => {
    const [meetingState, setMeetingState] = useState<MeetingStateType>();
    const router = useRouter();
    const client = useStreamVideoClient();
    const { user } = useUser();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: "",
        link: "",
    });
    const [callDetails, setCallDetails] = useState<Call>();
    const { toast } = useToast();
    console.log({ callDetails });
    console.log({ values });
    const createMeeting = async () => {
        if (!client || !user || meetingState !== "isInstantMeeting") {
            return;
        }
        try {
            if (!values.dateTime) {
                toast({
                    title: "No date/time present",
                    description: "Please specify date and time of the meeting",
                });
            }

            const id = crypto.randomUUID();
            const call = client?.call("default", id);

            if (!call) {
                throw new Error("Error. Failed to create a call.");
            }

            const startsAt =
                values.dateTime.toISOString() ||
                new Date(Date.now()).toISOString();
            const description = values.description || "Instant Meeting";
            console.log({ call });

            call.join({ create: true });

            // await call.getOrCreate({
            //     data: {
            //         starts_at: startsAt,
            //         custom: { description },
            //     },
            // });

            setCallDetails(call);
            if (!values.description) {
                router.push(`/meeting/${call.id}`);
            }

            toast({
                title: "Scheduled: Catch up",
                description: "Friday, February 10, 2023 at 5:57 PM",
            });
        } catch (error) {
            const msg =
                error instanceof Error ? error.message : JSON.stringify(error);
            console.error({ msg });
            toast({
                title: "Error. Failed to create meeting.",
            });
        }
    };

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
