import { questions } from '@/config/database/schema'; 
import { db } from '@/config/database/index';
import {  and, eq } from 'drizzle-orm';

export async function saveQuestions(questionsData: any[], resumeId: number, sessionId: string,difficulty: string,userId:string) {
    const questionsArray = questionsData.map(question => ({
        question: question.question,
        difficulty: question.difficulty,
        // Add other necessary fields from question object if needed
      }));
    
      await db.insert(questions).values({
        resumeId,
        sessionId,
        userId,
        questions: questionsArray,
        difficulty,
      }).returning();
  const savedQuestions = await Promise.all(questionsArray);

  return savedQuestions;
}


export async function getQuestionsBySessionId(sessionId: string,userId:string){
    // Fetch questions matching the given sessionId and userId
    const fetchedQuestions = await db.select()
    .from(questions)
    .where(and(eq(questions.sessionId, sessionId),eq(questions.userId, userId))) // Ensure userId matches
    .execute();

  // Process the fetched questions if needed
  const processedQuestions = fetchedQuestions.map(question => ({
    id: question.id,
    userId: question.userId,
    resumeId: question.resumeId,
    questions: question.questions,
    difficulty: question.difficulty,
    status: question.status,
    score: question.score,
    timeTaken: question.timeTaken,
    createdAt: question.createdAt,
    updatedAt: question.updatedAt,
  }));

  return processedQuestions;
}
