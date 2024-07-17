"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Lightbulb, LoaderCircle, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const InterviewPage = ({ params }: { params: {interviewId: string} }) => {
  const { user } = useUser();
  const [isloading,setIsLoading] = useState(false);
  const [webcamenable, setWebcamEnable] = useState(false);
  const formatUsername = (username: string) => {
    if (!username) return "";
    const firstName = username.split(" ")[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  };

  return (
    <div className="my-10 flex justify-center flex-col items-center">
      <h2 className="font-bold text-2xl p-5">
        Lets Get Started {formatUsername(user?.username || "")} !!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* //info */}
        <div className="flex flex-col m-5 my-5 p-5 border border-yellow-300 rounded-lg bg-yellow-100 text-yellow-900 shadow-lg">
    <h2 className="flex gap-2 mb-3 items-center">
        <Lightbulb className="text-yellow-500" />
        <strong>Important Information:</strong>
    </h2>
    <p className="mb-2">
        To ensure the best experience with your AI-generated interview, please follow the steps below:
    </p>
    <ol className="list-decimal list-inside mb-2">
        <li className="mb-1">
            <strong>Enable your video webcam:</strong> This will allow the AI to assess your non-verbal communication and provide more accurate feedback.
        </li>
        <li className="mb-1">
            <strong>Enable your microphone:</strong> Clear audio is essential for the AI to understand your responses and evaluate your verbal communication skills.
        </li>
    </ol>
    <p className="mb-2">
        Once both the webcam and microphone are enabled, click "Start Interview" to begin. If you encounter any issues, please check your device settings.
    </p>
    <p className="mb-2">
        Please note that we do not save any video or audio recordings. Your privacy and security are our top priorities.
    </p>
    <p className="mb-2">
        After completing the interview, you will receive a detailed review and answers from the interview. This will help you understand your strengths and areas for improvement.
    </p>
    <p className="font-semibold">
        Good luck with your interview!
    </p>
</div>


        
        {/* //Webcam */}
        <div>
        {webcamenable ? (
            <>
            <div className = "mt-16 ml-16 mr-16">
          <Webcam
            onUserMedia={() => setWebcamEnable(true)}
            onUserMediaError={() => setWebcamEnable(false)}
            mirrored={true}
            style={{
              height: 400,
              width: 500,
            }}
          />
          </div>
          <div className="flex justify-center items-center mt-2 mr-24">
            <Link href={`/interview/${params?.interviewId}/start`}>
                <Button onClick={()=>setIsLoading(true)} disabled={isloading}>
                {isloading?<><LoaderCircle className='animate-spin'/>Loading...</>: "Start Interview"}
                </Button>
            </Link>
          </div>
          </>
        ) : (
          <>
            <WebcamIcon className="h-72 w-96  my-7 p-20 bg-secondary rounded-lg border mr-5" />
            <Button onClick={() => setWebcamEnable(true)}>
              Enable WebCam
            </Button>
          </>
        )}
      </div>

      </div>
      
    </div>
  );
};

export default InterviewPage;
