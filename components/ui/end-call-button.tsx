"use client";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { Button } from "./button";

const EndCallButton = () => {
    const call = useCall();
    const { useLocalParticipant } = useCallStateHooks();
    const localParticipant = useLocalParticipant();
    const router = useRouter();

    const isMeetingOwner =
        localParticipant &&
        call?.state.createdBy &&
        localParticipant.userId === call?.state.createdBy?.id;

    if (!isMeetingOwner) return null;

    return (
        <Button
            className='bg-red-500 rounded-2xl'
            onClick={async () => {
                await call?.endCall();
                router.push("/");
            }}
        >
            End Call For Everyone
        </Button>
    );
};

export default EndCallButton;
