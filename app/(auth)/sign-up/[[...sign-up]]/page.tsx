import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <section className='flex w-full h-lvh justify-center items-center'>
            <SignUp />
        </section>
    );
}
