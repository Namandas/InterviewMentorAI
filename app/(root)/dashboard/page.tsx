// Home.tsx
'use client'
import React, { useState } from 'react';
import FileUpload from '@/components/shared/FileUpload';
import Form from '@/components/shared/Form';
import { AichatSession } from '@/config/AIModal';

// Define default resume data
const defaultResumeData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '123-456-7890',
  address: '123 Example St, Example City, EX',
  education: 'Example University, BSc in Computer Science',
  experience: '5 years of experience in software development',
  skills: ['React', 'JavaScript', 'Node.js'],
  summary: 'Experienced software developer with a focus on web technologies.',
  certifications: 'Certified React Developer, AWS Certified Developer',
  projects: [
    { title: 'Project A', description: 'Built a web application using React and Node.js.' },
    { title: 'Project B', description: 'Developed an e-commerce platform using Angular and MongoDB.' },
  ],
};

const Home: React.FC = () => {
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle file upload completion
  const handleUploadComplete = async (response: string) => {
    try {
    //  console.log(response);
      setIsLoading(true);
      // Assuming AichatSession.sendMessage returns JSON string
      const result = await AichatSession.sendMessage(`Please convert the following parsed text into a JSON format with the specified structure:
        ${response}
        Desired JSON Format:
        {
          "name":"",
          "email": "",
          "phone": "",
          "address": "",
          "education": "",
          "experience": "",
          "skills": ["", "", ""],
          "summary": "",
          "certifications": "",
          "projects": [
            { "title": "", "description": "" },
            { "title": "", "description": "" }
          ]
        }
          Never miss summary skills name feild`);
      
        const parsedData = JSON.parse(result.response.text());
    
        // Update resumeData state with parsed data
        setResumeData(parsedData);
      } catch (error) {
        console.error("Error parsing response:", error);
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {/* Conditional rendering of loading bar */}
      {isLoading && (
        <div className="w-full bg-blue-500 text-white text-center py-2">
          Loading...
        </div>
      )}
      <div className='w-96'>
        <FileUpload onUploadComplete={handleUploadComplete} />
      </div>
      <div className="container mx-auto">
        <h1 className="text-xl font-bold my-4">Edit Resume</h1>
        <Form resumeData={resumeData} />
      </div>
    </main>
  );
};

export default Home;
