import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/usercontext';
import axios from "axios";
import {BACKEND_URL} from "../../url"
const VoiceInterview = () => {
  const { user } = useUserContext();  // Access user context
  const [showResult, setShowResult] = useState(false);  // Track if the result should be displayed
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
  const [textToCopy, setTextToCopy] = useState(transcript);
  const [isCopied, setCopied] = useClipboard(textToCopy, { successDuration: 1000 });
  const [response, setResponse] = useState('');  // AI response
  const [hasStarted, setHasStarted] = useState(false);  // Track if the interview has started
  const [company, setCompany] = useState(''); // Store company name
  const [role, setRole] = useState(''); // Store role name
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Track if the form is submitted
  const [formId, setFormId] = useState('');  // Store unique form ID
  const navigate = useNavigate();

  const getresult = () => {
    navigate(`/result/`);
  };

  // Function to start listening
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    setHasStarted(true);
  };

  const generateFormId = () => {
    return `form-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  };

  // Function to send the transcript to the backend with additional form data
  const sendTranscriptToApi = async (message) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/gemini`, {
        message: message,
        company: company,  // Include company name
        role: role,
        formId: formId    // Include unique form ID        // Include role name
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.data;
      if (data.redirect) {
        window.location.href = data.redirect;  // Redirect if the response contains a redirect URL
      } else {
        setResponse(data.response);  // Set the AI response
        speakText(data.response);  // Use speech synthesis to speak the AI response
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

  // Update textToCopy whenever transcript changes
  useEffect(() => {
    setTextToCopy(transcript);
  }, [transcript]);

  // If the browser does not support speech recognition, display a message
  if (!browserSupportsSpeechRecognition) {
    return <div className="text-white bg-gray-800 p-4">Browser does not support speech recognition.</div>;
  }

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newFormId = generateFormId(); // Generate unique form ID
    setFormId(newFormId);  // Store the unique form ID
    setIsFormSubmitted(true);  // Set form submission flag to true
  };

  return (
    <div className="bg-gray-900 text-white flex items-center justify-center pt-5">
      <div className="flex flex-col border border-gray-700 w-full sm:w-2/3 p-1 sm:p-5 mx-2 sm:mx-auto mt-2 mb-10 bg-gray-800 rounded-lg shadow-lg">
        {!isFormSubmitted ? (
          <form onSubmit={handleFormSubmit} className="flex flex-col mb-4">
            <h2 className="text-xl font-bold mb-4">Enter Company and Role</h2>
            <label className="text-lg">Company Name</label>
            <input
              type="text"
              className="p-2 mb-4 bg-gray-700 text-white rounded"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            <label className="text-lg">Role</label>
            <input
              type="text"
              className="p-2 mb-4 bg-gray-700 text-white rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 px-4 rounded hover:bg-blue-700"
            >
              Start Interview
            </button>
          </form>
        ) : (
          <>
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
                  onClick={startListening}
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
          </>
        )}
      </div>
    </div>
  );
};

export default VoiceInterview;
