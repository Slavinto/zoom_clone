import {
    CallControls,
    CallParticipantsList,
    CallStatsButton,
    CallingState,
    PaginatedGridLayout,
    SpeakerLayout,
    useCallStateHooks,
} from "@stream-io/video-react-sdk";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { LayoutList, Users } from "lucide-react";
import { Button } from "./button";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./end-call-button";
import Loader from "./loader";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
    const [layout, setLayout] = useState<CallLayoutType>();
    const [showParticipants, setShowParticipants] = useState(false);
    const params = useSearchParams();
    const isPersonalRoom = !!params.get("personal");
    const { useCallCallingState } = useCallStateHooks();

    const callingState = useCallCallingState();
    if (callingState !== CallingState.JOINED) {
        return <Loader />;
    }

    const CallLayout = () => {
        switch (layout) {
            case "grid":
                return <PaginatedGridLayout />;
                break;
            case "speaker-left":
                return <SpeakerLayout participantsBarPosition='right' />;
                break;
            default:
                return <SpeakerLayout participantsBarPosition='left' />;
                break;
        }
    };
    return (
        <section className='relative h-screen w-full pt-4 text-white overflow-hidden'>
            <div className='relative flex size-full items-center justify-center'>
                <div className='flex size-full max-w-[1000px] items-center'>
                    <CallLayout />
                </div>
                <div
                    className={`h-[calc(100vh-186px)] ml-2 bg-[#19232d] px-4 py-2 rounded-2xl ${
                        showParticipants ? "show-block" : "hidden"
                    }`}
                >
                    <CallParticipantsList
                        onClose={() => setShowParticipants(false)}
                    />
                </div>
            </div>
            <div className='fixed bottom-0 flex flex-wrap w-full items-center justify-center gap-5'>
                <CallControls />
                <DropdownMenu>
                    <div className='flex items-center'>
                        <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                            <LayoutList size={20} className='text-white' />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white flex flex-col'>
                        {["Grid", "Speaker-Left", "Speaker-Right"].map(
                            (item, idx) => (
                                <div
                                    key={idx}
                                    className='cursor-pointer hover:bg-[#4c535b] rounded-2xl'
                                    onClick={() =>
                                        setLayout(
                                            item.toLowerCase() as CallLayoutType
                                        )
                                    }
                                >
                                    <DropdownMenuItem>{item}</DropdownMenuItem>
                                </div>
                            )
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton />
                <Button
                    className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'
                    onClick={() => setShowParticipants((prev) => !prev)}
                >
                    <div>
                        <Users size={20} className='text-white' />
                    </div>
                </Button>
                {!isPersonalRoom && <EndCallButton />}
            </div>
        </section>
    );
};

export default MeetingRoom;
