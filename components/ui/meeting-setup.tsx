"use client";
import {
    Call,
    DeviceSettings,
    VideoPreview,
    useCall,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./button";

const MeetingSetup = ({
    handler,
}: // call,
{
    handler: (param: boolean) => void;
    // call: Call;
}) => {
    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
    const call = useCall();

    if (!call) {
        throw new Error("useCall must be used within a StreamCall component");
    }

    useEffect(() => {
        if (isMicCamToggledOn) {
            call?.microphone.disable();
            call?.camera.disable();
        } else {
            call?.microphone.enable();
            call?.camera.enable();
        }
    }, [isMicCamToggledOn, call?.camera, call?.microphone]);
    return (
        <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
            <h1 className='text-2xl font-bold'>Setup</h1>
            <VideoPreview />
            <div className='flex h-16 items-center justify-center gap-3'>
                <label className='flex items-center justify-center gap-2 font-medium'>
                    <input
                        type='checkbox'
                        checked={isMicCamToggledOn}
                        onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
                    />
                    Join with mic and camera off
                </label>
                <DeviceSettings />
            </div>
            <Button
                className='rounded-md bg-green-500 px-4 py-2.5'
                onClick={() => {
                    call.join();
                    handler(true);
                }}
            >
                Join Meeting
            </Button>
        </div>
    );
};

export default MeetingSetup;
