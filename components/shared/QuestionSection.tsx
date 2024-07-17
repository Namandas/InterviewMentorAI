'use client'
import { getQuestionsBySessionId } from '@/lib/actions/question.actions';
import { useUser } from '@clerk/nextjs';
import { Lightbulb, Volume2, ChevronLeft, ChevronRight, LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const QuestionSection = ({ params, activeQuestion, setActiveQuestion, setQuestions,setQuestionId, endInterview,isLoading }:{ params:any, activeQuestion:any, setActiveQuestion:any, setQuestions:any, setQuestionId:any,endInterview:any,isLoading:any }) => {
  const { user } = useUser();
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState<any>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const textToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const speech = new SpeechSynthesisUtterance(text);
        speech.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(speech);
        setIsSpeaking(true);
      }
    } else {
      alert('Sorry, your browser does not support Text to Speech Synthesis');
    }
  };

  useEffect(() => {
    const sessionId = params.interviewId;
    user && getQuestionsBySessionId(sessionId, user?.id).then((response) => {
      try {
        const parsedQuestions = response[0];
        setMockInterviewQuestions(parsedQuestions.questions);
        console.log("parsed questions : ",parsedQuestions.id);
        setQuestionId(parsedQuestions.id);
        setQuestions(parsedQuestions.questions); 
      } catch (error) {
        console.error("Failed to parse questions:", error);
      }
    });
  }, [params.interviewId, user]);

  const handleNextQuestion = () => {
    if (activeQuestion < mockInterviewQuestions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (activeQuestion > 0) {
      setActiveQuestion(activeQuestion - 1);
    }
  };

  return (
    <div className='p-5 border rounded-lg my-10 gap-5'>
      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestions && mockInterviewQuestions.map((question: any, index: number) => (
          <div key={index}>
            <h2
              className={`p-2 bg-gray-300 rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestion === index && 'bg-purple-700 text-white'}`}
              onClick={() => setActiveQuestion(index)}
            >
              Question# {index + 1}
            </h2>
          </div>
        ))}
      </div>
      <div className='flex items-center my-5'>
        <h2 className='text-md md:text-lg flex-grow'>{mockInterviewQuestions[activeQuestion]?.question}</h2>
      </div>

      <Volume2 className={`cursor-pointer ${isSpeaking && 'animate-bounce'}`} onClick={() => textToSpeech(mockInterviewQuestions[activeQuestion]?.question)} />

      <div className='border rounded-lg p-5 bg-blue-100 mt-20 my-8'>
        <h2 className='flex gap-2 items-center text-blue-900'>
          <Lightbulb />
          <strong>Note :</strong>
        </h2>
        <p className='text-sm text-blue-800 my-3'>
          When you're ready to answer this question, click "Record Answer". After your interview, we'll provide feedback and compare your responses with the correct answers for each question.
        </p>
      </div>
      <div className='flex justify-between items-center mt-5'>
        <ChevronLeft className='cursor-pointer' onClick={handlePrevQuestion} />
        {activeQuestion < mockInterviewQuestions.length - 1 ? (
          <ChevronRight className='cursor-pointer' onClick={handleNextQuestion} />
        ) : (
          <Button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isLoading}
          onClick={endInterview}
        >
          {isLoading?<><LoaderCircle className='animate-spin'/>Loading FeedBack</>: "End Interview"}
          
        </Button>
        )}
      </div>
    </div>
  );
}

export default QuestionSection;
