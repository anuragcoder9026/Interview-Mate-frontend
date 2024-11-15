import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSkillAction } from '../store/userSkillSlice';
import axios from "axios";
import {BACKEND_URL} from "../../url"
const allSkills = [
    "C++", "C#", "Python", "Java", "Go", "Rust", "SQL", "Bash", "Perl", "R", "Matlab", "Scala", "Dart",
    "HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Angular", "Vue", "Node.js", "Express.js", 
    "PHP", "Ruby", "MongoDB", "GraphQL","TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Julia",
    "Swift", "Kotlin", "Flutter", "React Native", "Objective-C", "Xamarin", "Android Studio"
];

const EditSkillsForm = ({ closeSkillpopup }) => {
  const dispatch = useDispatch();
  const [skill, setSkill] = useState(useSelector(store => store.userSkill));
  const [error,setError] =useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setError(false);
    setInputValue(value);
    setSelectedSkill(value);
    if (value) {
      const filteredSuggestions = allSkills.filter((skill) =>
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else setSuggestions([]);
  };

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setInputValue(skill);
    setSuggestions([]);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const cond=skill.indexOf(selectedSkill);
    if(cond!==-1){
        setError(true); 
    }
    else {
      setIsLoading(true); 
    try {
      const jsonFormData = JSON.stringify({skill:selectedSkill});  
      const res = await axios.post(`${BACKEND_URL}/api/users/skill`, jsonFormData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      setIsLoading(false);
      dispatch(userSkillAction.handleUserSkill(selectedSkill));
      closeSkillpopup(false);
    } catch (error) {
      setIsLoading(false);
      closeSkillpopup(false);
    }
   } 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-2 sm:p-6 rounded-lg shadow-lg w-[90%] max-w-lg ">
        {
          isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="loader animate-spin rounded-full border-t-4 border-blue border-solid h-20 w-20"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Add Skills</h3>
                <span
                  className="hover:bg-gray-200 px-2.5 pb-1"
                  style={{ borderRadius: "50%" }}
                  onClick={() => closeSkillpopup(false)}
                >
                  <button className="text-gray-500 text-3xl">&times;</button>
                </span>
              </div>
              
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                  <div className="flex justify-between"> 
                  <label className="block text-sm font-medium mb-2" htmlFor="skills">
                    Skill*
                  </label>
                  {error && <p className="text-red-500 text-sm font-medium">This Skill is Already included </p>} 
                  </div>  
                  <input
                    type="text"
                    id="skills"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type a skill..."
                    value={inputValue}
                    onChange={handleInputChange}
                    required
                  />
                  {suggestions.length > 0 && (
                    <ul className="border border-gray-300 mt-2 max-h-40 overflow-y-auto rounded-lg">
                      {suggestions.map((skill, index) => (
                        <li
                          key={index}
                          className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                          onClick={() => handleSkillClick(skill)}
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-white bg-blue mb-2 hover:cursor-pointer"
                    style={{ borderRadius: "18px" }}
                  >
                    Save
                  </button>
                </div>
              </form>
            </>
          )
        }
      </div>
    </div>
  );
};

export default EditSkillsForm;
