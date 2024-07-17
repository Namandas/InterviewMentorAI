'use client'
import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';
import { SignInButton, useUser } from '@clerk/nextjs';

const HomeContent = () => {
    const {isSignedIn} = useUser();
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="mx-auto sm:text-center lg:max-w-2xl">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              New Release
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="5dc90b42-5ed4-45a6-8e63-2d78ca9d3d95"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#5dc90b42-5ed4-45a6-8e63-2d78ca9d3d95)"
                  width="52"
                  height="24"
                />
              </svg>
              <span className="relative">Introducing</span>
            </span>{' '}
            InterviewMentorAI
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            Welcome to InterviewMentorAI, your go-to platform for practicing and improving your interview skills with AI-generated interviews. Hone your skills and boost your confidence for your next big opportunity.
          </p>
        </div>
        <div className="mb-4 transition-shadow duration-300 hover:shadow-xl lg:mb-6">
          <img
            className="object-cover w-full h-56 rounded shadow-lg sm:h-64 md:h-80 lg:h-96"
            src="https://images.pexels.com/photos/3727459/pexels-photo-3727459.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
            alt="Interview Practice"
          />
        </div>
        <p className="max-w-xl mb-4 text-base text-gray-700 sm:mx-auto">
          Our platform leverages advanced AI technology to generate realistic interview questions, provide feedback, and help you track your progress over time. Get ready to impress your future employers with InterviewMentorAI.
        </p>
      </div>
      <div className="bg-white py-16">
      <div className="relative container mx-auto px-4 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold leading-none tracking-tight text-gray-900 sm:text-5xl">
            Explore Our Services
          </h2>
          <p className="mt-4 text-gray-600">
            Discover the range of services we offer to help you excel in your career.
          </p>
        </div>
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col justify-between overflow-hidden text-center transition-shadow duration-200 bg-gray-50 rounded-lg shadow-xl group hover:shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-50">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0a12 12 0 110 24 12 12 0 010-24zm0 2a10 10 0 100 20 10 10 0 000-20zm5 9H7v2h10v-2zm-5 4H7v2h5v-2z" />
                </svg>
              </div>
              <h6 className="mb-2 font-bold text-lg">Resume Review</h6>
              <p className="text-gray-700">
                Get professional feedback on your resume to make it stand out.
              </p>
            </div>
            <div className="w-full h-1 bg-blue-500 group-hover:scale-x-100 duration-300 transform scale-x-0 origin-left" />
          </div>
          <div className="flex flex-col justify-between overflow-hidden text-center transition-shadow duration-200 bg-gray-50 rounded-lg shadow-xl group hover:shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-green-50">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0a12 12 0 110 24 12 12 0 010-24zm0 2a10 10 0 100 20 10 10 0 000-20zm5 9H7v2h10v-2zm-5 4H7v2h5v-2z" />
                </svg>
              </div>
              <h6 className="mb-2 font-bold text-lg">Mock Interviews</h6>
              <p className="text-gray-700">
                Practice with real interview questions and get instant feedback.
              </p>
            </div>
            <div className="w-full h-1 bg-green-500 group-hover:scale-x-100 duration-300 transform scale-x-0 origin-left" />
          </div>
          <div className="flex flex-col justify-between overflow-hidden text-center transition-shadow duration-200 bg-gray-50 rounded-lg shadow-xl group hover:shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-red-50">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0a12 12 0 110 24 12 12 0 010-24zm0 2a10 10 0 100 20 10 10 0 000-20zm5 9H7v2h10v-2zm-5 4H7v2h5v-2z" />
                </svg>
              </div>
              <h6 className="mb-2 font-bold text-lg">Career Coaching</h6>
              <p className="text-gray-700">
                Get personalized career advice from AI.
              </p>
            </div>
            <div className="w-full h-1 bg-red-500 group-hover:scale-x-100 duration-300 transform scale-x-0 origin-left" />
          </div>
          <div className="flex flex-col justify-between overflow-hidden text-center transition-shadow duration-200 bg-gray-50 rounded-lg shadow-xl group hover:shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-purple-50">
                <svg
                  className="w-8 h-8 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0a12 12 0 110 24 12 12 0 010-24zm0 2a10 10 0 100 20 10 10 0 000-20zm5 9H7v2h10v-2zm-5 4H7v2h5v-2z" />
                </svg>
              </div>
              <h6 className="mb-2 font-bold text-lg">Skill Development</h6>
              <p className="text-gray-700">
                Enhance your skills with Practicing More.
              </p>
            </div>
            <div className="w-full h-1 bg-purple-500 group-hover:scale-x-100 duration-300 transform scale-x-0 origin-left" />
          </div>
        </div>
        <div className="mt-12 text-center">
        {isSignedIn?
          <Link href={'/dashboard'}>
          <Button className='className="inline-block px-8 py-3 text-lg font-semibold text-white transition-colors duration-200 bg-blue-500 rounded hover:bg-blue-700"'>Dashboard</Button>
         </Link>
        : <SignInButton>
          <Button className='className="inline-block px-8 py-3 text-lg font-semibold text-white transition-colors duration-200 bg-blue-500 rounded hover:bg-blue-700"'>Get Started</Button>
        </SignInButton>
        }
        </div>
      </div>
    </div>
    </div>
  );
};

export default HomeContent
