"use client";
import { actionCards } from "@/app/constants";
import ActionCard, { ActionCardType } from "./action-card";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import MeetingModal from "./meeting-modal";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { useToast } from "./use-toast";
import { Textarea } from "./textarea";
import DatePicker from "react-datepicker";

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
    const pathname = usePathname();
    const [callDetails, setCallDetails] = useState<Call>();
    const { toast } = useToast();

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

    // console.log({ callDetails });
    // console.log({ values });
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
            // console.log({ call });

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

    const scheduleMeeting = async () => {
        if (!client || !user || meetingState !== "isScheduleMeeting") {
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
            const description = values.description || "Scheduled Meeting";

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: { description },
                },
            });
            setCallDetails(call);
        } catch (error) {}
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
            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === "isScheduleMeeting"}
                    onClose={() => setMeetingState(undefined)}
                    title='Schedule a Meeting'
                    className='text-center'
                    buttonText='Schedule a Meeting'
                    handleClick={scheduleMeeting}
                >
                    <div className='flex flex-col gap-2.5 w-full'>
                        <label className='text-base text-normal leading-[22px] text-sky-2'>
                            Add a description
                        </label>
                        <Textarea
                            className='bg-blue-2 border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    description: e.target.value,
                                })
                            }
                            value={values.description}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-2.5'>
                        <label className='text-base text-normal leading-[22px] text-sky-2'>
                            Select Date and Time
                        </label>
                        <DatePicker
                            selected={values.dateTime}
                            showTimeSelect
                            onChange={(date) =>
                                setValues({ ...values, dateTime: date! })
                            }
                            timeFormat='HH:mm'
                            timeIntervals={15}
                            timeCaption='time'
                            dateFormat={"MMMM d, yyyy hh:mm aa"}
                            className='w-full rounded bg-blue-2 p-2 focus:outline-none'
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === "isScheduleMeeting"}
                    onClose={() => setMeetingState(undefined)}
                    title='Meeting Scheduled'
                    className='text-center'
                    image='/icons/schedule.svg'
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast({ title: "Link copied" });
                        console.log(meetingLink);
                        setCallDetails(undefined);
                        setMeetingState(undefined);
                    }}
                    buttonText='Copy Meeting Link'
                    buttonIcon='/icons/copy.svg'
                />
            )}
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
