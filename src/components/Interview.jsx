import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';
import { useEffect, useState } from 'react';

const VoiceInterview = () => {
    const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
    const [textToCopy, setTextToCopy] = useState(transcript);
    const [isCopied, setCopied] = useClipboard(textToCopy, { successDuration: 1000 });
    const [response, setResponse] = useState('');

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

    const sendTranscriptToApi = async () => {
        try {
            const response = await fetch('http://localhost:3200/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: transcript }),
            });

            const data = await response.json();
            if (data.redirect) {
                window.location.href = data.redirect; // Redirect if the response contains a redirect URL
            } else {
                setResponse(data.response);
                speakText(data.response); // Convert the response to speech
            }
        } catch (error) {
            console.error('Error sending transcript:', error);
            setResponse('An error occurred while sending the transcript.');
        }
    };

    const handleStopListening = () => {
        SpeechRecognition.stopListening();
        sendTranscriptToApi(); // Send transcript after stopping the speech recognition
        resetTranscript(); // Optionally reset the transcript after sending it
    };

    const speakText = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; // Set the language
        speechSynthesis.speak(utterance);
    };

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
                        <button className='text-white p-2 px-4 rounded hover:bg-green-700' onClick={startListening} style={{ backgroundColor: "green" }}>Start</button>
                        <button className='bg-red-600 text-white p-2 px-4 rounded hover:bg-red-700' onClick={handleStopListening}>Stop</button>
                    </div>
                </div>

                {response && (
                    <div className="mt-4 p-4 border border-gray-700 bg-gray-800 rounded-lg">
                        <h3 className="text-lg font-bold mb-2">AI Response:</h3>
                        <p>{response}</p>
                        <button 
                            className='mt-2 bg-blue text-white p-2 px-4 rounded hover:bg-orange' 
                            onClick={() => speakText(response)}>
                            Play Response
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VoiceInterview;
