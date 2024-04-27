"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useToast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/use-get-call-by-id";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Table = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => (
    <div className='flex flex-col items-start gap-2 xl:flex-row'>
        <h1 className='text-base font-medium text-sky-1 lg:text-xl xl:min-w-32'>
            {title}:
        </h1>
        <h1 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl'>
            {description}
        </h1>
    </div>
);

const PersonalRoomPage = () => {
    const { user } = useUser();
    const router = useRouter();
    const { toast } = useToast();

    const meetingId = `${user?.id}`;
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/${meetingId}?personal=true`;
    const { call, isCallLoading } = useGetCallById(meetingId);
    const client = useStreamVideoClient();

    if (isCallLoading) {
        return <Loader />;
    }
    if (!client || !user || !user.username) {
        router.push("/");
        return;
    }

    const createMeeting = async () => {
        const startsAt = new Date().toISOString();
        const description = "New Personal Call";
        let newCall = undefined;

        if (!call) {
            toast({ title: "Creating new call instance." });
            newCall = client.call("default", meetingId);
        }
        await (call ? call : (newCall as Call)).getOrCreate({
            data: {
                starts_at: startsAt,
                custom: { description },
            },
        });

        router.push(`/meeting/${meetingId}?personal=true`);
    };

    return (
        <section className='flex size-full flex-col gap-10 text-white'>
            <h1 className='text-3xl font-bold'>Personal Room</h1>
            <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
                <Table
                    title='Topic'
                    description={`${
                        user.username?.charAt(0).toUpperCase() +
                        user.username.slice(1)
                    }'s Meeting Room`}
                />
                <Table title='Meeting ID' description={meetingId} />
                <Table title='Invite Link' description={meetingLink} />
            </div>
            <div className='flex gap-5'>
                <Button className='bg-blue-1' onClick={createMeeting}>
                    Start the Meeting
                </Button>
                <Button className='bg-blue-2 flex gap-1.5'>
                    <div
                        className='flex gap-[5px] w-full'
                        onClick={() => {
                            navigator.clipboard.writeText(meetingLink);
                            toast({ title: "Link copied" });
                        }}
                    >
                        <Image
                            src='/icons/copy.svg'
                            width={14}
                            height={14}
                            alt='copy'
                        />
                        <p>Copy Invitation</p>
                    </div>
                </Button>

                <Button variant={"outline"} className='bg-blue-2 flex gap-1.5'>
                    <div
                        className='flex gap-[5px] w-full'
                        onClick={() => {
                            navigator.clipboard.writeText(meetingLink);
                            toast({ title: "Link copied" });
                        }}
                    >
                        <Image
                            src='/icons/add-personal.svg'
                            width={14}
                            height={14}
                            alt='copy'
                        />
                        <p>Edit</p>
                    </div>
                </Button>
            </div>
        </section>
    );
};

export default PersonalRoomPage;
