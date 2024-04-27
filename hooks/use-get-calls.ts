import { toast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import {
    Call,
    CallRecording,
    useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
    const [calls, setCalls] = useState<Call[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const client = useStreamVideoClient();
    const { user } = useUser();
    useEffect(() => {
        const getCalls = async () => {
            if (!user?.id || !client) {
                return;
            }
            setIsLoading(true);
            const queryCallsReq = {
                sort: [
                    {
                        field: "starts_at",
                        direction: -1,
                    },
                ],
                filter_conditions: {
                    starts_at: { $exists: true },
                    $or: [
                        { created_by_user_id: user.id },
                        { members: { $in: [user.id] } },
                    ],
                },
                limit: 25,
                watch: true,
            };
            try {
                const response = await client?.queryCalls(queryCallsReq);
                if (response?.calls) {
                    setCalls(response.calls);
                } else {
                    throw new Error("Error. Fetching upcoming calls failed.");
                }
            } catch (error) {
                const msg =
                    error instanceof Error
                        ? error.message
                        : JSON.stringify(error);
                console.error({ msg });
                toast({
                    title: "Error. Fetching calls failed.",
                });
            } finally {
                setIsLoading(false);
            }
        };
        getCalls();
    }, [client, user?.id]);

    const now = new Date();

    const endedCalls = calls.filter(
        ({ state: { startsAt, endedAt } }: Call) => {
            return (startsAt && new Date(startsAt) < now) || !!endedAt;
        }
    );
    const upcomingCalls = calls.filter(({ state: { startsAt } }: Call) => {
        return startsAt && new Date(startsAt) > now;
    });
    // const callRecordings = calls.map((call) => call.queryRecordings(call.cid));

    return {
        isLoading,
        endedCalls,
        callRecordings: calls,
        upcomingCalls,
    };
};
