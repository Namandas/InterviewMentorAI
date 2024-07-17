'use client';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { getInterviewsByUserId } from '@/lib/actions/interview.actions';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const PreviousInterview = () => {
  const { user } = useUser();
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      if (user) {
        try {
          const userInterviews = await getInterviewsByUserId(user.id);
          setInterviews(userInterviews);
          console.log(userInterviews);
        } catch (error) {
          console.error('Failed to fetch interviews:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchInterviews();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (interviews.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        <p>No previous interviews found.</p>
      </div>
    );
  }

 
  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-10">Previous Interviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {interviews.map((interview, index) => {
          // Split the skills string into an array if needed
          const skillsArray = interview.resumeSkills ? interview.resumeSkills.split(',') : [];
          // Slice to get only the first 5 skills
          const limitedSkills = skillsArray.slice(0, 5);

          return (
            <Card key={index} className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4">Interview {index + 1}</h3>
              <p className="text-lg mb-2"><strong>Difficulty:</strong> {interview.difficulty}</p>
              <p className="text-lg mb-2"><strong>Date:</strong> {new Date(interview.createdAt).toLocaleDateString()}</p>
              <p className="text-lg mb-2"><strong>Resume Name:</strong> {interview.resumeName}</p>
              <div className="text-lg mb-2"><strong>Skills:</strong></div>
              <div className="flex flex-wrap gap-2 mb-4">
                {limitedSkills.map((skill:any, skillIndex:any) => (
                  <span key={skillIndex} className="inline-block bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold">
                    {skill.trim()}
                  </span>
                ))}
              </div>
              <Link href={`/interview/${interview.sessionId}/feedback`}>
                <Button className="inline-block mt-4 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  View Feedback
                </Button>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PreviousInterview;
