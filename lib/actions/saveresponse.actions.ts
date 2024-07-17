import { db } from "@/config/database";
import { correctAnswers, suggestions, userAnswers } from "@/config/database/schema";


export const saveResponses = async (responses: any,questionId:number) => {
  try {
    for (const response of responses) {
      const { userAnswer, modelAnswer, rating, feedback } = response;

      await db.insert(userAnswers).values({
        questionId,
        answers: {
          userAnswer,
          rating,
        },
      });

      await db.insert(correctAnswers).values({
        questionId,
        answers: {
          modelAnswer,
        },
      });

      if (feedback) {
        await db.insert(suggestions).values({
          questionId,
          suggestionText: feedback,
        });
      }
    }

    console.log('Responses saved successfully.');
  } catch (error) {
    console.error('Failed to save responses:', error);
  }
};
