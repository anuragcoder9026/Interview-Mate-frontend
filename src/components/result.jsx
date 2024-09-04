import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Result = () => {
    const { sessionId } = useParams();
    const [results, setResponses] = useState([]);
    const [error, setError] = useState(null);
    console.log(sessionId);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await fetch(`http://localhost:3200/result/${sessionId}`, {
                    method: 'GET',
                    credentials: 'include', // This ensures cookies are sent with the request
                });
                if (!res.ok) {
                    throw new Error('Session not found');
                }
                const data = await res.json();
                setResponses(data.results);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchResult();
    }, [sessionId]);

    return (
        <div className="bg-gray-900 text-white p-5">
            <h2 className="text-xl font-bold mb-4">Interview Results</h2>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {results.map((results, index) => (
                        <div key={index} className="border border-gray-700 p-4 mb-4 rounded-lg bg-gray-800">
                            <h3 className="text-lg font-bold mb-2">Question {index + 1}:</h3>
                            <p className="mb-2"><strong>Question:</strong> {results.question}</p>
                            <p className="mb-2"><strong>Answer:</strong> {results.answer}</p>
                            <p className="mb-2"><strong>Rating:</strong> {results.rating}</p>
                            <p className="mb-2"><strong>Evaluation:</strong></p>
                            <div className="bg-gray-900 p-2 rounded">
                                <p>{results.evaluation}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Result;
