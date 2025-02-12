import { questions } from '@/config/database/schema'; 
import { db } from '@/config/database/index';
import {  and, eq } from 'drizzle-orm';

export async function saveQuestions(
  questionsData: { interviewQuestions: any[] }, 
  resumeId: number, 
  sessionId: string, 
  difficulty: string, 
  userId: string
) {
  // Extract the array from the object
  const { interviewQuestions } = questionsData;

  // Ensure it's an array before using map
  if (!Array.isArray(interviewQuestions)) {
    throw new Error("Invalid questionsData format: interviewQuestions must be an array");
  }

  const questionsArray = interviewQuestions.map(question => ({
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

  return questionsArray; // Return the saved questions
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
