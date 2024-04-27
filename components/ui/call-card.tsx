"use client";

import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { userAvatars } from "@/app/constants";

import Image from "next/image";
import { Button } from "./button";
import { toast } from "./use-toast";

const CallCard = ({
    title,
    date,
    handleClick,
    type,
    link,
}: {
    // call: Call | CallRecording;
    title: string;
    date: string;
    handleClick: () => void;
    type: "ended" | "recordings" | "upcoming";
    link: string;
}) => {
    const getIconPath = () => {
        switch (type) {
            case "ended":
                return "/icons/previous.svg";
            case "upcoming":
                return "/icons/upcoming.svg";

            default:
                return "/icons/recordings.svg";
        }
    };

    return (
        <section className='flex flex-col gap-9 bg-dark-1 px-6 py-8 max-w-[533px] rounded-[14px]'>
            <div className='flex flex-col gap-2.5'>
                <Image
                    className='pb-1'
                    src={getIconPath()}
                    width={30}
                    height={30}
                    alt='call icon'
                />
                <h2 className='font-bold text-2xl truncate'>{title}</h2>
                <p className='text-base'>{date}</p>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex'>
                    {type !== "recordings" &&
                        userAvatars.map((img, idx) =>
                            idx < 4 ? (
                                <Image
                                    src={img.imgUrl}
                                    key={idx}
                                    alt='user avatar'
                                    width={50}
                                    height={50}
                                    className={`border-4 border-blue-2 rounded-full${
                                        idx === 0 ? "" : " -ml-3"
                                    }`}
                                />
                            ) : (
                                <div
                                    key={idx}
                                    className='flex flex-center -ml-3 rounded-full bg-blue-2 w-[50px] h-[50px]'
                                >
                                    <p>9+</p>
                                </div>
                            )
                        )}
                </div>
                <div
                    className={`${type === "recordings" ? "w-full" : "w-1/2"}`}
                >
                    {type !== "ended" && (
                        <div
                            className={`flex gap-[7px] ${
                                type === "recordings" ? "w-full" : ""
                            }`}
                        >
                            <Button
                                onClick={handleClick}
                                className={`flex justify-center bg-blue-1 w-full${
                                    type === "upcoming" ? " max-w-[80px]" : ""
                                }`}
                                variant={"default"}
                            >
                                {type === "upcoming" ? (
                                    <p>Start</p>
                                ) : (
                                    <div className='flex gap-[5px]'>
                                        <Image
                                            src={"/icons/play.svg"}
                                            width={14}
                                            height={14}
                                            alt='play'
                                        />
                                        <p>Play</p>
                                    </div>
                                )}
                            </Button>
                            <Button className='bg-blue-2 w-full flex gap-1.5'>
                                {type === "upcoming" ? (
                                    <div
                                        className='flex gap-[5px] w-full'
                                        onClick={() => {
                                            navigator.clipboard.writeText(link);
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
                                ) : (
                                    <div className='flex gap-[5px] justify-center'>
                                        <Image
                                            src='/icons/share.svg'
                                            width={14}
                                            height={14}
                                            alt='share'
                                        />
                                        <p>Share</p>
                                    </div>
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CallCard;
