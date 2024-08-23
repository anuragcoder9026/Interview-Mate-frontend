
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';
import { useEffect, useState } from 'react';

const VoiceInterview = () => {
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [textToCopy, setTextToCopy] = useState(transcript);
    const [isCopied, setCopied] = useClipboard(textToCopy, { successDuration: 1000 });

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

    useEffect(() => {
        if (browserSupportsSpeechRecognition) {
            startListening();
        }
        // Cleanup: Stop listening when component unmounts
        return () => SpeechRecognition.stopListening();
    }, [browserSupportsSpeechRecognition]);

    useEffect(() => {
        setTextToCopy(transcript);
    }, [transcript]);

    if (!browserSupportsSpeechRecognition) {
        return <div className="text-white bg-gray-800 p-4">Browser does not support speech recognition.</div>;
    }

    return (
        <div className="bg-gray-900 text-white flex items-center justify-center pt-5">
            <div className="flex flex-col border border-gray-700 w-full sm:w-2/3 p-1 sm:p-5 mx-2 sm:mx-auto mt-2 mb-10 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Speech to Text Converter</h2>

                <div className="h-80 border border-gray-600 p-1 bg-gray-700 rounded-lg overflow-auto">
                    {transcript}
                </div>

                <div className="flex justify-between mt-4">
                    <button className='bg-blue text-white p-2 px-4 rounded hover:bg-green-700' onClick={setCopied}>
                        {isCopied ? 'Copied!' : 'Copy'}
                    </button>
                   <div className="flex gap-2">
                   <button className='text-white p-2 px-4 rounded hover:bg-green-700' onClick={startListening}style={{backgroundColor:"green"}}>Start</button>
                   <button className='bg-red-600 text-white p-2 px-4 rounded hover:bg-red-700' onClick={SpeechRecognition.stopListening}>Stop</button>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default VoiceInterview;
