import { useEffect, useMemo, useRef, useState } from 'react';

interface Options {
  lang?: string;
  continuous?: boolean;
}

const useVoiceToText = ({ lang, continuous }: Options = { lang: 'en-US', continuous: true }) => {
  const [transcript, setTranscript] = useState<string>('');
  const isContinuous = useRef<boolean>(continuous ?? true);
  const recognitionRef = useRef<any>(null); // Use any type for recognitionRef

  const SpeechRecognition = useMemo(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition; // Use type assertion as any
  }, []);

  useEffect(() => {
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
    }
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current = null;
      }
    };
  }, [SpeechRecognition,transcript]);

  useEffect(() => {
    if (lang && recognitionRef.current) {
      recognitionRef.current.lang = lang;
    }
  }, [lang]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      if (continuous) {
        isContinuous.current = true;
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      isContinuous.current = false;
    }
  };

  const resetTranscript = () => {
    console.log('Transcript reset')
    setTranscript('');
  };

  if (recognitionRef.current) {
    recognitionRef.current.onend = () => {
      if (isContinuous.current) {
        // if the listening is continuous, it starts listening even the speaker is quiet till it will be stopped manually
        startListening();
      }
    };
    recognitionRef.current.onerror = (event: any) => {
      console.error(`Speech recognition error detected: ${event.error}`);
    };

    recognitionRef.current.onresult = (event: any) => {
      setTranscript((prevTranscript: string) => prevTranscript + ' ' + event.results[0][0].transcript);
    };
  }

  return { startListening, stopListening, resetTranscript, transcript };
};

export default useVoiceToText;
