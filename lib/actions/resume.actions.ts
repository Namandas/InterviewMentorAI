import { db } from '@/config/database';
import { projects, resumes } from '@/config/database/schema'; // Adjust path to your schema

export async function saveResume(resumeData: ResumeData,userId:string): Promise<any> {
    try {
      // Convert skills array to PostgreSQL array format
      const skillsArray = resumeData.skills.join(',');
  
      const savedResume = await db.insert(resumes).values({
        name: resumeData.name,
        userId: userId,
        email: resumeData.email,
        phone: resumeData.phone,
        address: resumeData.address,
        education: resumeData.education,
        experience: resumeData.experience,
        skills: `{${skillsArray}}`, 
        summary: resumeData.summary,
        certifications: resumeData.certifications,
      }).returning(); 

      const projectPromises = resumeData.projects.map(project =>
        db.insert(projects).values({
          resumeId: savedResume[0].id,
          title: project.title,
          description: project.description,
        }).returning()
      );
      
      await Promise.all(projectPromises);
      return savedResume[0];
    } catch (error) {
      console.error('Error saving resume:', error);
      throw new Error('Failed to save resume');
    }
  }
  
