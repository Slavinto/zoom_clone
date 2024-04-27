"use client";

import { useGetCalls } from "@/hooks/use-get-calls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CallCard from "./call-card";
import Loader from "./loader";
import { useToast } from "./use-toast";

const CallList = ({ type }: { type: "ended" | "recordings" | "upcoming" }) => {
    const { isLoading, callRecordings, endedCalls, upcomingCalls } =
        useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        const getCallRecordings = async () => {
            try {
                const callData = await Promise.all(
                    callRecordings.map((rec) => rec.queryRecordings())
                );

                const recordings = callData
                    .filter((call) => call.recordings.length > 0)
                    .flatMap((call) => call.recordings);
                if (recordings && recordings.length > 0) {
                    setRecordings(recordings);
                }
            } catch (error) {
                toast({ title: "Try again later" });
            }
        };
        if (type === "recordings") {
            getCallRecordings();
        }
    }, [callRecordings, type]);

    if (isLoading) {
        return <Loader />;
    }

    const getCalls = (): Call[] | CallRecording[] => {
        switch (type) {
            case "ended":
                return endedCalls;
            case "recordings":
                return callRecordings;

            default:
                return upcomingCalls;
        }
    };

    const getNoCallsMessage = () => {
        switch (type) {
            case "ended":
                return "No ended calls.";
            case "recordings":
                return "No recorded calls.";

            default:
                return "No upcoming calls.";
        }
    };

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    return (
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            {type === "recordings" && recordings.length <= 0 ? (
                <h1>{noCallsMessage}</h1>
            ) : calls && calls.length > 0 ? (
                (type === "recordings" ? recordings : calls).map(
                    (call, idx) => {
                        const callRec: CallRecording | undefined = (
                            call as CallRecording
                        )?.url
                            ? (call as CallRecording)
                            : undefined;
                        const justCall: Call | undefined = (call as Call)?.id
                            ? (call as Call)
                            : undefined;
                        return (
                            <CallCard
                                key={justCall ? justCall.id : idx}
                                title={
                                    (justCall &&
                                        justCall.state.custom.description) ||
                                    (callRec && callRec.filename) ||
                                    "No description"
                                }
                                date={
                                    justCall
                                        ? justCall.state.startsAt?.toLocaleString() ||
                                          "No date"
                                        : callRec
                                        ? callRec.start_time.toLocaleString()
                                        : "No date"
                                }
                                handleClick={
                                    type === "recordings"
                                        ? () =>
                                              router.push(
                                                  `${callRec && callRec.url}`
                                              )
                                        : () =>
                                              router.push(
                                                  `/meeting/${
                                                      justCall && justCall.id
                                                  }`
                                              )
                                }
                                type={type}
                                link={
                                    type === "recordings" && callRec
                                        ? callRec.url
                                        : `${
                                              process.env.NEXT_PUBLIC_BASE_URL
                                          }/meeting/${justCall && justCall.id}`
                                }
                            />
                        );
                    }
                )
            ) : (
                <h1>{noCallsMessage}</h1>
            )}
        </div>
    );
};

export default CallList;
