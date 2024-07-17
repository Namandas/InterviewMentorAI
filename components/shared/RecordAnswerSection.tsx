'use client'
import Image from 'next/image'
import React, { useState, useEffect, useCallback } from 'react'
import Webcam from 'react-webcam'
import { Button } from '../ui/button'
import { Mic } from 'lucide-react'
import useVoiceToText from '@/app/hooks/useVoiceToText'

const RecordAnswerSection = ({ activeQuestion, saveAnswer }: { activeQuestion: number, saveAnswer: any }) => {
  const { startListening, stopListening, resetTranscript, transcript } = useVoiceToText();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedTranscript, setRecordedTranscript] = useState("");

  const handleSave = useCallback(() => {
    if (recordedTranscript) {
      saveAnswer(activeQuestion, recordedTranscript); 
      resetTranscript();
      setRecordedTranscript(""); 
      setIsRecording(false);
    }
  }, [activeQuestion, recordedTranscript, resetTranscript, saveAnswer]);

  useEffect(() => {
    if (!isRecording && transcript) {
      setRecordedTranscript(transcript);
      handleSave(); // Automatically save when recording stops
    }
  }, [isRecording, transcript, handleSave]);

  const handleRecord = () => {
    if (isRecording) {
      stopListening();
      setIsRecording(false);
    } else {
      startListening();
      setIsRecording(true);
      setRecordedTranscript("");
    }
  };

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex flex-col justify-center items-center bg-black rounded-lg p-5 mt-20'>
        <Image src={'/webcam.png'} width={150} height={150} alt='webcam' className='absolute' />
        <Webcam
          mirrored={true}
          style={{
            height: '400px',
            width: '100%',
            zIndex: 10
          }}
        />
      </div>
      <div className='flex '>
        <Button variant={'outline'} className='my-8' onClick={handleRecord}>
          {isRecording ? <div className='text-red-600 flex'><Mic /> Stop Recording </div> : 'Record Answer'}
        </Button>
      </div>
    </div>
  );
}

export default RecordAnswerSection;
