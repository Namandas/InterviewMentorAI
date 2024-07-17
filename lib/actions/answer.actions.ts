import { db } from "@/config/database";
import { correctAnswers, suggestions, userAnswers } from "@/config/database/schema";
import { eq, asc } from "drizzle-orm";


export async function getCorrectAnswers(questionId: number): Promise<CorrectAnswer[]> {
  const correctAns = await db
    .select()
    .from(correctAnswers)
    .where(eq(correctAnswers.questionId, questionId))
    .orderBy(asc(correctAnswers.id))  
    .execute();

    //console.log("getCorrectAnswers : ",correctAns);

  return correctAns.map(result => ({
    id: result.id,
    questionId: result.questionId ?? -1,
    answers: result.answers,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  }));
}

export async function getUserAnswers(questionId: number): Promise<UserAnswer[]> {
    const userAns = await db
      .select()
      .from(userAnswers)
      .where(eq(userAnswers.questionId, questionId))
      .execute();
  
    return userAns.map(result => ({
      id: result.id,
      questionId: result.questionId ?? -1,
      answers: result.answers,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    }));
  }


  export async function getSuggestions(questionId: number): Promise<any> {
    const suggestionResults = await db
      .select()
      .from(suggestions)
      .where(eq(suggestions.questionId, questionId))
      .orderBy(asc(suggestions.id))
      .execute();
      console.log("suggestionResults : ",suggestionResults)
    return suggestionResults;
  }