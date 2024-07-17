import { db } from "@/config/database";
import { questions, resumes } from "@/config/database/schema";
import { eq } from "drizzle-orm";

// Modify the function to include resume details
export const getInterviewsByUserId = async (userId: string) => {
  try {
    const interviews = await db
      .select({
        sessionId:questions.sessionId,
        interviewId: questions.id,
        difficulty: questions.difficulty,
        createdAt: questions.createdAt,
        resumeName: resumes.name,
        resumeSkills: resumes.skills,
        resumeId : resumes.id
  })
      .from(questions)
      .innerJoin(resumes, eq(questions.resumeId, resumes.id)) 
      .where(eq(questions.userId, userId))
      

    return interviews;
  } catch (error) {
    console.error("Failed to fetch interviews:", error);
    throw error;
  }
};
