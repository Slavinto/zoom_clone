import CallList from "@/components/ui/call-list";
import React from "react";

const PreviousPage = () => {
    return (
        <section className='flex size-full flex-col gap-10 text-white'>
            <h1 className='text-3xl font-bold'>Personal Room</h1>
            <CallList type='ended' />
        </section>
    );
};

export default PreviousPage;
