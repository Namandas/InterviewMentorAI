# InterviewMentorAI: Online Interview Preparation Tool

[Live Demo](https://interview-mentor-ai-ten.vercel.app/)

InterviewMentorAI is an innovative SaaS application designed to help users prepare for interviews by uploading their resume and participating in simulated online interviews. Built with Next.js, TypeScript, and Drizzle ORM, InterviewMentorAI leverages the Google Gemini API for advanced interview functionalities. User authentication is managed by Clerk, ensuring secure access and management.

## Features

InterviewMentorAI offers the following capabilities:

1. **Resume Upload**: Upload your resume for personalized interview preparation.
2. **Simulated Interviews**: Participate in mock interviews tailored to your resume.
3. **Response Analysis**: Receive real-time feedback and analysis on your interview responses.

## Technology Stack

- **Frontend**: Next.js
- **Database**: Drizzle ORM
- **Programming Language**: TypeScript
- **Interview Functionality**: Google Gemini API
- **Account Management**: Clerk

## Usage

### Account Management

InterviewMentorAI uses Clerk for managing user accounts. Users can sign up and log in securely to access their personalized dashboard and manage their interview preparation tasks.

### Interview Preparation

To prepare for interviews using InterviewMentorAI, users can:

1. **Log in to their account.**
2. **Navigate to the resume upload section.**
3. **Upload your resume in PDF format.**
4. **Participate in the simulated interview and receive feedback.**

### Response Analysis

Users can view and analyze their interview responses directly from their dashboard. The feedback can be viewed anytime for further review and improvement.

## Installation and Setup

To set up the InterviewMentorAI application locally for development purposes, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Namandas/InterviewMentorAI

2. **Navigate to the project directory:**
   ```bash
   cd InterviewMentorAI

3. **Install the dependencies:**
   ```bash
   npm i
   
4. **Set up environment variables:**
    ```bash
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
     CLERK_SECRET_KEY=
     
     NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
     NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
     WEBHOOK_SECRET=
     
     NEXT_PUBLIC_GEMINI_API_KEY=
     NEXT_PUBLIC_DRIZZLE_DATABASE_URL=

5. **Run the application:**
   ```bash
   npm run dev

6. **Open your browser and navigate to:**
     ```bash
     http://localhost:3000
