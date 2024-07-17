'use client';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { AichatSession } from '@/config/AIModal';
import { saveResume } from '@/lib/actions/resume.actions';
import { saveQuestions } from '@/lib/actions/question.actions';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';


const Form: React.FC<FormProps> = ({ resumeData }) => {
  const {user} = useUser();
  const route = useRouter();
  const userId = user?.id;
  const [isloading,setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ResumeData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    experience: '',
    skills: [],
    summary: '',
    certifications: '',
    projects: [],
  });

  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
    education: false,
    experience: false,
    skills: false,
    summary: false,
    certifications: false,
    projects: false,
  });

  const [difficulty, setDifficulty] = useState('easy');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  useEffect(() => {
    setFormData({ ...resumeData });
  }, [resumeData]);

  const handleEditToggle = (field: keyof typeof editMode) => {
    setEditMode((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData((prevState) => ({
      ...prevState,
      skills: newSkills,
    }));
  };

  const handleAddSkill = () => {
    setFormData((prevState) => ({
      ...prevState,
      skills: [...prevState.skills, ''],
    }));
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      skills: newSkills,
    }));
  };

  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const newProjects = [...formData.projects];
    newProjects[index][field] = value;
    setFormData((prevState) => ({
      ...prevState,
      projects: newProjects,
    }));
  };

  const handleAddProject = () => {
    setFormData((prevState) => ({
      ...prevState,
      projects: [...prevState.projects, { title: '', description: '' }],
    }));
  };

  const handleRemoveProject = (index: number) => {
    const newProjects = formData.projects.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      projects: newProjects,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (numberOfQuestions > 10) {
      alert('The maximum number of questions is 10.');
      return;
    }  
    setIsLoading(true);
    const savedResume = await saveResume(formData,userId || ""); 
    const resumeId = savedResume.id;
    const sessionId = uuidv4();
    //console.log('Resume saved with ID:', resumeId);
    const resumeDetails = `
    Name: ${formData.name}
    Email: ${formData.email}
    Phone: ${formData.phone}
    Address: ${formData.address}
    Education: ${formData.education}
    Experience: ${formData.experience}
    Skills: ${formData.skills.join(', ')}
    Summary: ${formData.summary}
    Certifications: ${formData.certifications}
    Projects: ${formData.projects.map(project => `Title: ${project.title}, Description: ${project.description}`).join('; ')}
  `;
    const result = await AichatSession.sendMessage(
    `Generate a set of always new mock interview questions based on the resume details provided below.
    Resume Details: ${resumeDetails}
    The questions should cover a range of areas, including complex technical topics, problems, scenarios, and general questions, similar to those used in Google interviews. 
    The difficulty level of the questions should be ${difficulty}, 
    and the total number of questions to be generated is ${numberOfQuestions}.
    Please include problem-solving approaches similar to those found on platforms like LeetCode, and questions available on other platforms.`
      );
    const parsedData = result.response.text();
    console.log(parsedData);
    await saveQuestions(JSON.parse(parsedData), resumeId, sessionId,difficulty,userId || "");
   //console.log('Questions:',ResponseForSavedQuestion);
   // console.log('Questions:', parsedData);
   setIsLoading(false);
   route.push(`/interview/${sessionId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="space-y-6 p-4 bg-white border shadow-md rounded-lg max-w-screen-2xl mx-auto">
        {Object.keys(formData).map((field) =>
          field !== 'skills' && field !== 'projects' ? (
            <div key={field} className="flex items-center space-x-4">
              <Label className="w-1/4 text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}:</Label>
              {editMode[field as keyof typeof editMode] ? (
                <Input
                  type="text"
                  name={field}
                  value={formData[field as keyof ResumeData] as string}
                  onChange={handleChange}
                  className="w-3/4 p-2 border border-gray-700 rounded"
                />
              ) : (
                <span className="w-3/4 p-2 border border-gray-700 rounded">{formData[field as keyof ResumeData] as string}</span>
              )}
              <Button
                type="button"
                onClick={() => handleEditToggle(field as keyof typeof editMode)}
                className="bg-primary text-white border border-primary rounded px-4 py-2 hover:bg-primary-dark"
              >
                {editMode[field as keyof typeof editMode] ? 'Save' : 'Edit'}
              </Button>
            </div>
          ) : null
        )}
        <div>
          <Label className="block text-gray-700">Skills:</Label>
          <div className="flex flex-wrap">
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2 mr-2">
                {editMode.skills ? (
                  <Input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="p-2 border border-gray-700 rounded"
                  />
                ) : (
                  <span className="p-2 border border-gray-700 rounded">{skill}</span>
                )}
                {editMode.skills && (
                  <Button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="bg-white text-red-600 border border-black rounded px-2 py-1 hover:bg-gray-200"
                  >
                    &times;
                  </Button>
                )}
              </div>
            ))}
          </div>
          {editMode.skills && (
            <Button
              type="button"
              onClick={handleAddSkill}
              className="mt-2 bg-white text-black border border-black rounded px-4 py-2 hover:bg-gray-200"
            >
              Add Skill
            </Button>
          )}
          <Button
            type="button"
            onClick={() => handleEditToggle('skills')}
            className={`mt-2 ${editMode.skills ? 'bg-primary text-white' : 'bg-white text-black'} border border-primary rounded px-4 py-2 hover:bg-primary-dark`}
          >
            {editMode.skills ? 'Save Skills' : 'Edit Skills'}
          </Button>
        </div>

        <div>
          <Label className="block text-gray-700">Projects:</Label>
          {formData.projects.map((project, index) => (
            <div key={index} className="space-y-2 mt-2">
              {editMode.projects ? (
                <>
                  <Input
                    type="text"
                    placeholder="Title"
                    value={project.title}
                    onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                    className="p-2 border border-gray-700 rounded w-full"
                  />
                  <Textarea
                    placeholder="Description"
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                    className="p-2 border border-gray-700 rounded w-full"
                  />
                </>
              ) : (
                <>
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="p-2 border border-gray-700 rounded">{project.description}</p>
                </>
              )}
              {editMode.projects && (
                <Button
                  type="button"
                  onClick={() => handleRemoveProject(index)}
                  className="bg-white text-red-600 border border-black rounded px-2 py-1 hover:bg-gray-200"
                >
                  &times;
                </Button>
              )}
            </div>
          ))}
          {editMode.projects && (
            <Button
              type="button"
              onClick={handleAddProject}
              className="mt-2 bg-white text-black border border-black rounded px-4 py-2 hover:bg-gray-200"
            >
              Add Project
            </Button>
          )}
          <Button
            type="button"
            onClick={() => handleEditToggle('projects')}
            className={`mt-2 ${editMode.projects ? 'bg-primary text-white' : 'bg-white text-black'} border border-primary rounded px-4 py-2 hover:bg-primary-dark`}
          >
            {editMode.projects ? 'Save Projects' : 'Edit Projects'}
          </Button>
        </div>

        <div>
          <Label className="block text-gray-700">Difficulty:</Label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="p-2 border border-gray-700 rounded w-full"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <Label className="block text-gray-700">Number of Questions:</Label>
          <Input
            type="number"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
            className="p-2 border border-gray-700 rounded w-full"
          />
        </div>

        <Button
          type="submit"
          className="mt-6 bg-primary text-white border border-primary rounded px-4 py-2 hover:bg-primary-dark"
          disabled={isloading}
        >
          {isloading?<><LoaderCircle className='animate-spin'/> Generating Questions</>: "Submit"}
          
        </Button>
      </Card>
    </form>
  );
};

export default Form;
