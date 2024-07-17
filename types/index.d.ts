// interface SidenavItem {
//     id: number;
//     name: string;
//     icon: LucideIcon;
//     path: string;
//   }
//   interface CreateUserParams {
//     id: string;
//     email: string;
//     createdAt?: Date;
//     updatedAt?: Date;
//   }
  
//   interface UpdateUserParams {
//     email?: string;
//     updatedAt?: Date;
//   }
//   interface Project {
//     title: string;
//     description: string;
//   }
  
//   interface ResumeData {
//     name: string;
//     email: string;
//     phone: string;
//     address: string;
//     education: string;
//     experience: string;
//     skills: string[];
//     summary: string;
//     certifications: string;
//     projects: Project[];
//   }
  
//   interface FormProps {
//     resumeData: ResumeData;
//   }
  
//   interface Question {
//     question: string;
//     difficulty: string;
//   }
  
//   interface CombinedData {
//     question: Question;
//     correctAnswer: string;
//     userAnswer: string;
//     userRating: string;
//     suggestions: string[]; 
//   }

//   interface CorrectAnswer {
//     id: number;
//     questionId: number;
//     answers: any;
//     createdAt: Date | null;
//     updatedAt: Date | null;
//   }
  
//   interface UserAnswer {
//       id: number;
//       questionId: number;
//       answers: any;
//       createdAt: Date | null;
//       updatedAt: Date | null;
//     }
//     interface Suggestion {
//       id: number;
//       questionId: number;
//       suggestionText: string;
//       createdAt: Date | null;
//       updatedAt: Date | null;
//     }
    
  







    interface SidenavItem {
      id: number;
      name: string;
      icon: LucideIcon;
      path: string;
    }
    
    interface CreateUserParams {
      id: string;
      email: string;
      createdAt?: Date;
      updatedAt?: Date;
    }
    
    interface UpdateUserParams {
      email?: string;
      updatedAt?: Date;
    }
    
    interface Project {
      title: string;
      description: string;
    }
    
    interface ResumeData {
      name: string;
      email: string;
      phone: string;
      address: string;
      education: string;
      experience: string;
      skills: string[];
      summary: string;
      certifications: string;
      projects: Project[];
    }
    
    interface FormProps {
      resumeData: ResumeData;
    }
    
    interface Question {
      question: string;
      difficulty: string;
    }
    
    interface CombinedData {
      question: Question;
      correctAnswer: string;
      userAnswer: string;
      userRating: string;
      suggestions: string; 
    }
    
    interface CorrectAnswer {
      id: number;
      questionId: number;
      answers: any;
      createdAt: Date | null;
      updatedAt: Date | null;
    }
    
    interface UserAnswer {
      id: number;
      questionId: number;
      answers: any;
      createdAt: Date | null;
      updatedAt: Date | null;
    }
    
    interface Suggestion {
      id: number;
      questionId: number;
      suggestionText: string;
      createdAt: Date | null;
      updatedAt: Date | null;
    }