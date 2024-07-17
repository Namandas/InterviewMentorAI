import { relations } from "drizzle-orm";
import { integer, json, pgTable,serial, text, timestamp } from "drizzle-orm/pg-core";

// Define the tables using pgTable
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').unique(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const resumes = pgTable('resumes', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  name: text('name'),
  email: text('email'),
  phone: text('phone'),
  address: text('address'),
  education: text('education'),
  experience: text('experience'),
  skills: text('skills[]').default('{}'),
  summary: text('summary'),
  certifications: text('certifications'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  resumeId: integer('resume_id').references(() => resumes.id),
  title: text('title'),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  resumeId: integer('resume_id').references(() => resumes.id),
  questions: json('questions'), // Use json type to store array of questions
  sessionId: text('session_id'),
  difficulty: text('difficulty'),
  status: text('status').default('None'),
  score: integer('score').default(0),
  timeTaken: integer('time_taken'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const userAnswers = pgTable('user_answers', {
  id: serial('id').primaryKey(),
  questionId: integer('question_id').references(() => questions.id),
  answers: json('answers'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const correctAnswers = pgTable('correct_answers', {
  id: serial('id').primaryKey(),
  questionId: integer('question_id').references(() => questions.id),
  answers: json('answers'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const suggestions = pgTable('suggestions', {
  id: serial('id').primaryKey(),
  questionId: integer('question_id').references(() => questions.id),
  suggestionText: text('suggestion_text'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});


export const usersRelations = relations(users, ({ many }) => ({
  resumes: many(resumes),
  questions: many(questions),
}));

export const resumesRelations = relations(resumes, ({ many, one }) => ({
  projects: many(projects),
  questions: many(questions),
  user: one(users, {
    fields: [resumes.userId],
    references: [users.id],
  }),
}));

export const projectsRelations = relations(projects, ({ one }) => ({
  resume: one(resumes, {
    fields: [projects.resumeId],
    references: [resumes.id],
  }),
}));

export const questionsRelations = relations(questions, ({ many, one }) => ({
  user: one(users, {
    fields: [questions.userId],
    references: [users.id],
  }),
  resume: one(resumes, {
    fields: [questions.resumeId],
    references: [resumes.id],
  }),
  userAnswers: many(userAnswers),
  correctAnswers: many(correctAnswers),
  suggestions: many(suggestions),
}));

export const userAnswersRelations = relations(userAnswers, ({ one }) => ({
  question: one(questions, {
    fields: [userAnswers.questionId],
    references: [questions.id],
  }),
}));

export const correctAnswersRelations = relations(correctAnswers, ({ one }) => ({
  question: one(questions, {
    fields: [correctAnswers.questionId],
    references: [questions.id],
  }),
}));

export const suggestionsRelations = relations(suggestions, ({ one }) => ({
  question: one(questions, {
    fields: [suggestions.questionId],
    references: [questions.id],
  }),
}));
