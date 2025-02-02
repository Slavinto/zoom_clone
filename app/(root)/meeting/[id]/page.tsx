"use client";

import Loader from "@/components/ui/loader";
import MeetingRoom from "@/components/ui/meeting-room";
import MeetingSetup from "@/components/ui/meeting-setup";
import { useGetCallById } from "@/hooks/use-get-call-by-id";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

const MeetingPage = ({
    params,
}: {
    params: {
        id: string;
    };
}) => {
    const { id } = params;
    const { user, isLoaded } = useUser();
    const [isSetupComplete, setIsSetupComplete] = useState(false);

    const { call, isCallLoading } = useGetCallById(id);

    if (!isLoaded || isCallLoading) {
        return <Loader />;
    }
    return (
        <StreamCall call={call}>
            <main className='h-screen w-full'>
                <StreamTheme>
                    {isSetupComplete ? (
                        <MeetingRoom />
                    ) : (
                        <MeetingSetup
                            // call={call}
                            handler={setIsSetupComplete}
                        />
                    )}
                </StreamTheme>
            </main>
        </StreamCall>
    );
};

export default MeetingPage;
