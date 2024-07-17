"use client";
import QuestionSection from "@/components/shared/QuestionSection";
import RecordAnswerSection from "@/components/shared/RecordAnswerSection";
import { AichatSession } from "@/config/AIModal";
import { saveResponses } from "@/lib/actions/saveresponse.actions";
import React, { useEffect, useState } from "react";

const StartInterview = ({ params }: { params: { interviewId: string } }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionid, setQuestionId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(answers);
  }, [answers, questionid]);

  const saveAnswer = async (index: number, answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  const endInterview = async () => {
    setIsLoading(true);
    try {
      const result = await AichatSession.sendMessage(
        `For each of the following questions and user answers, provide the following in JSON format:
      1. If a user answer is provided, give:
          - A rating (Excellent, Good, Average, Below Average, Poor)
          - Feedback explaining the rating
          - A model correct answer that is detailed and comprehensive not more than 3 lines.
          - Suggestions for improvement if the rating is not Excellent
      2. If a user answer is not provided, do not include a rating or a feedback just provide model correct answer and keep the rest null.
    
      questions: ${JSON.stringify(questions, null, 2)}
      user answers: ${JSON.stringify(answers, null, 2)}
      
      Example JSON Output:
      [
        {
          "question": "Example question?",
          "userAnswer": "Example user answer.",
          "rating": "Good",
          "feedback": "Your answer covers the basic points but lacks details.",
          "modelAnswer": "This is a detailed and comprehensive correct answer.",
          "suggestions": "Include more specific examples to improve your answer."
        },
        {
          "question": "Example question with no answer?",
          "modelAnswer": "This is a detailed and comprehensive correct answer.",
          "userAnswer": null,
          "rating": null,
          "feedback": null,
          "suggestions":null
        }
      ]
      `
      );
      const response = JSON.parse(result.response.text());
      //console.log(response);
      await saveResponses(response, questionid);
      console.log("Answers saved successfully.", answers);
      console.log("questions saved successfully.", questions);
    } catch (error) {
      console.error("Failed to save answers:", error);
    } finally {
      setIsLoading(false);
      // Navigate to the feedback page
      window.location.href = `/interview/${params.interviewId}/feedback`;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Questions */}
      <QuestionSection 
        activeQuestion={activeQuestion}
        setActiveQuestion={setActiveQuestion}
        params={params}
        setQuestions={setQuestions}
        endInterview={endInterview}
        setQuestionId={setQuestionId}
        isLoading={isLoading}
      />

      {/* Answers */}
      <RecordAnswerSection 
        activeQuestion={activeQuestion}
        saveAnswer={saveAnswer}
      />
    </div>
  );
};

export default StartInterview;
