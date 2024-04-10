import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <section className='flex w-full h-lvh justify-center items-center'>
            <SignIn />
        </section>
    );
}
