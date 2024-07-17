import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <div className="flex flex-wrap">
        <div className="flex w-full h-screen flex-col md:w-1/2">
          <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
            <SignUp />
            <div className="py-3 text-center">
              <p className="whitespace-nowrap text-gray-600">
                Already have an account?
                <a href="/sign-in" className="underline-offset-4 font-semibold text-gray-900 underline">Sign In </a>
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
          <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
            <p className="mb-8 text-3xl font-semibold leading-10">We work 10x faster than our competitors and stay consistent. While they're bogged down with technical debt, we're releasing new features.</p>
            <p className="mb-4 text-3xl font-semibold">Naman Kumar Das</p>
            <p className="">Founder, InterviewMentor AI</p>
            <p className="mb-7 text-sm opacity-70">Online AI Interview</p>
          </div>
          <img className="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src="https://images.unsplash.com/photo-1565301660306-29e08751cc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
        </div>
      </div>
    </div>
  );
}
