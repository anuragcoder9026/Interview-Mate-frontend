import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const VoiceInterview = () => {
    const [showResult, setShowResult] = useState(false); // Track if the result should be displayed
    const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
    const [textToCopy, setTextToCopy] = useState(transcript);
    const [isCopied, setCopied] = useClipboard(textToCopy, { successDuration: 1000 });
    const [response, setResponse] = useState('');
    const [hasStarted, setHasStarted] = useState(false);  // Track if the interview has started
    const navigate = useNavigate();

    const getresult = () => {
        
         navigate(`/result/`);
        
    };
      

    // Function to start listening
    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    };

    // Function to send transcript to API and handle AI response
    const sendTranscriptToApi = async (message) => {
        try {
            const res = await fetch('http://localhost:3200/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                credentials: 'include', // This ensures the session cookie is sent
                body: JSON.stringify({ message }),
            });

            const data = await res.json();
            const { response, session_id } = data;
            if (data.redirect) {
                window.location.href = data.redirect; // Redirect if the response contains a redirect URL
            } else {
                setResponse(response);
                speakText(response); // Convert the response to speech
                console.log(session_id);
            }
        } catch (error) {
            console.error('Error sending transcript:', error);
            setResponse('An error occurred while sending the transcript.');
        }
    };

    // Function to handle stopping the listening and sending the transcript
    const handleStopListening = () => {
        SpeechRecognition.stopListening();
        sendTranscriptToApi(transcript);  // Send transcript after stopping the speech recognition
        resetTranscript();  // Optionally reset the transcript after sending it
    };

   

    // Function to speak the text using speech synthesis
    const speakText = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-IN';  // Set the language
        speechSynthesis.speak(utterance);
    };

    // // useEffect to start the interview by triggering the first AI response
    // useEffect(() => {
    //     if (browserSupportsSpeechRecognition && !hasStarted) {
    //         setHasStarted(true);
    //         sendTranscriptToApi('');  // Trigger the first AI response with an empty message
    //     }

    //     return () => SpeechRecognition.stopListening();
    // }, [browserSupportsSpeechRecognition, hasStarted]);

    // Update textToCopy whenever transcript changes

    useEffect(() => {
        setTextToCopy(transcript);
    }, [transcript]);

    // If the browser does not support speech recognition, display a message
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
                        <button
                            className='text-white p-2 px-4 rounded hover:bg-green-700'
                            onClick={() => {
                               
                                    startListening();
                                
                            }}
                            style={{ backgroundColor: "green" }}>
                            {hasStarted ? "Start Listening" : "Start"}
                        </button>
                        <button
                            className='bg-red-600 text-white p-2 px-4 rounded hover:bg-red-700'
                            onClick={handleStopListening}>
                            Stop
                        </button>

                        <button
                            className='bg-blue text-white p-2 px-4 rounded hover:bg-orange'
                            onClick={() => setShowResult(true)}>
                            Result
                        </button>
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
                {showResult && getresult()}
            </div>
        </div>
    );
};

export default VoiceInterview;