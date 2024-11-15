import React, { useEffect, useState } from 'react';
import {BACKEND_URL} from "../../url"
const AllResults = () => {
    const [allResults, setAllResults] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllResults = async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/api/all-results`, {
                    method: 'GET',
                    credentials: 'include', // Ensures cookies are sent with the request
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch results');
                }
                const data = await res.json();
                setAllResults(data.users);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchAllResults();
    }, []);
console.log(allResults);
    return (
        <div className="bg-gray-900 text-white p-5">
            <h2 className="text-xl font-bold mb-4">All Interview Results</h2>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {allResults.map((user, userIndex) => (
                        <div key={user._id} className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">
                                User: {user.username || user._id}
                            </h3>
                           
                            {user.sessions.map((session, sessionIndex) => (
                               
                                <div key={session.session_id} className="border border-gray-700 p-4 mb-4 rounded-lg bg-gray-800">
                                    <h4 className="text-md font-bold mb-2">Session {sessionIndex + 1} - ID: {session.session_id}</h4>
                                    <p className="mb-2"><strong>Start Time:</strong> {new Date(session.start_time).toLocaleString()}</p>
                                    <p className="mb-2"><strong>End Time:</strong> {new Date(session.end_time).toLocaleString()}</p>
                                    <p className="mb-2"><strong>role: </strong>{session.role}</p>
                                    <p className="mb-2"><strong>company: </strong>{session.comapany}</p>
                                    {session.responses.map((response, responseIndex) => (
                                        <div key={responseIndex} className="mt-4 bg-gray-900 p-4 rounded-lg">
                                            <h5 className="font-semibold">Question {responseIndex + 1}:</h5>
                                            <p><strong>Question:</strong> {response.question}</p>
                                            <p><strong>Answer:</strong> {response.answer}</p>
                                            <p><strong>Rating:</strong> {response.rating}</p>
                                            <p><strong>Evaluation:</strong> {response.evaluation}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllResults;
