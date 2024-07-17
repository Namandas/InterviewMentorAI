'use client'
import { getCorrectAnswers, getUserAnswers, getSuggestions } from '@/lib/actions/answer.actions';
import { getQuestionsBySessionId } from '@/lib/actions/question.actions';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {  ChevronsUpDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';



const Feedback = ({ params }: { params: { interviewId: string } }) => {
  const sessionId = params.interviewId;
  const { user } = useUser();
  const [combinedData, setCombinedData] = useState<CombinedData[]>([]);
  const [questionIds, setQuestionIds] = useState<number[]>([]);
 const  [isLoading, setIsLoading] = useState(true);
  const route = useRouter();

  const formatUsername = (username: string) => {
    if (!username) return "";
    const firstName = username.split(" ")[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  };

  const getRatingColorClass = (rating: string) => {
    switch (rating.toLowerCase()) {
      case 'excellent':
        return 'text-green-500';
      case 'good':
        return 'text-blue-500'; 
      case 'average':
        return 'text-yellow-500';
      case 'below average':
        return 'text-orange-500'; 
      case 'poor':
        return 'text-red-500'; 
      default:
        return 'text-gray-500';
    }
  };

  
  useEffect(() => {
    const fetchQuestionsAndAnswers = async () => {
      if (user) {
        try {
          const response = await getQuestionsBySessionId(sessionId, user.id);
          if (response.length > 0) {
            const parsedQuestions = response[0];
            console.log("parsed : ",parsedQuestions);
            const questions: Question[] = parsedQuestions.questions as Question[];
            const questionIds: number[] = questions.map((_, index) => parsedQuestions.id + index);
            setQuestionIds(questionIds);

            const correctAnswersPromises = questionIds.map(id => getCorrectAnswers(id));
            const userAnswersPromises = questionIds.map(id => getUserAnswers(id));
            const suggestionsPromises = questionIds.map(id => getSuggestions(id));

            const correctAnswersArray = await Promise.all(correctAnswersPromises);
            const userAnswersArray = await Promise.all(userAnswersPromises);
            const suggestionsArray = await Promise.all(suggestionsPromises);

            const combined: CombinedData[] = questions.map((question, index) => ({
              question: question,
              correctAnswer: correctAnswersArray[0]?.[index]?.answers?.modelAnswer || 'No correct answer found',
              userAnswer: userAnswersArray[0]?.[index]?.answers?.userAnswer || 'No user answer found',
              userRating: userAnswersArray[0]?.[index]?.answers?.rating || 'No rating',
              suggestions: suggestionsArray[0]?.[index]?.suggestionText || 'No suggestion'
            }));
            console.log(combined);
            setCombinedData(combined);
          }
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    };

    fetchQuestionsAndAnswers();
  }, [sessionId, user]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
    </div>
    );
  }
else{
  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-green-500'>
        Congratulations {formatUsername(user?.username || "")}
      </h2>

      <h2 className='font-bold text-2xl my-4'>Here is Your Interview Feedback:</h2>
      
      <h2 className='text-sm text-gray-500'>
        Find below interview questions with the correct answer, your answer, and feedback for improvement.
      </h2>
      
      {combinedData.length > 0 && combinedData.map((data, index) => (
           <Collapsible  key={index} className='my-5'>
         <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-1'>
         <div>
         <h3 className='text-md font-bold'>Question {index + 1}:</h3>
         <p>{data.question.question}</p>
         </div>
         <ChevronsUpDownIcon className='h-5 w-5'/>
         </CollapsibleTrigger>
         <CollapsibleContent>
         <div className={'mt-2 p-2 border rounded-lg'}>
            <h4 className={`font-semibold ${getRatingColorClass(data.userRating)}`}> <strong>Rating:</strong> </h4>
            <p className={`${getRatingColorClass(data.userRating)}`}>{data.userRating}</p>
          </div>

          <div className='mt-2 p-2 border rounded-lg bg-blue-100'>
            <h4 className='font-bold'>Your Answer:</h4>
            <p>{data.userAnswer}</p>
          </div>

         <div className='mt-2 p-2 border rounded-lg bg-green-100'>
            <h4 className='font-bold'>Correct Answer:</h4>
            <p>{data.correctAnswer}</p>
          </div>
          
          <div className='mt-2 p-2 border rounded-lg bg-yellow-100'>
            <h4 className='font-bold'>Suggestions:</h4>
            <ul>
              {data.suggestions}
            </ul>
          </div>
         </CollapsibleContent>
       </Collapsible> 
      ))}

      <div>
        <Button onClick={()=>{route.replace('/dashboard')}}>Go Home</Button>
      </div>
    </div>
  );
}
};

export default Feedback;
