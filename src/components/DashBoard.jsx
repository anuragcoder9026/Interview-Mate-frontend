'use client'

import React, { useEffect, useState } from 'react';
import Button from "../ui/button"
import axios from 'axios'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { BookOpen, Brain, ChevronRight, Clock, Cpu, GraduationCap, LayoutDashboard, LogOut, User, BarChart, TrendingUp, TrendingDown } from "lucide-react"
import { FaArrowDown,FaArrowUp } from "react-icons/fa";
import {BACKEND_URL} from "../../url"
import { useUserContext } from '../context/usercontext';
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />
      case 'quizzes':
        return <QuizzesContent />
      case 'interviews':
        return <InterviewsContent />
      default:
        return <DashboardContent />
    }
  }
  const [isVisible, setIsVisible] = useState(false);

  const toggleDiv = () => {
    setIsVisible(!isVisible);
  };
  const handleActiveTab=(data)=>{
     setActiveTab(data);
     setIsVisible(!isVisible);
  }
  return (
    <div className="flex flex-col lg:flex-row bg-gray-200">
      {/* Sidebar */}
      <div className="min-h-full w-full lg:w-64 bg-white  shadow-lg">
        <div className="lg:sticky lg:top-0 flex items-center justify-center h-20 border-b border-gray-200  ">
          <h1 className="text-xl font-bold text-gray-800 ">Interview Mate</h1>
          {!isVisible ? <FaArrowDown className="absolute right-0 mr-6 text-2xl flex lg:hidden" onClick={toggleDiv}/>:
           <FaArrowUp className="absolute right-0 mr-6 text-2xl flex lg:hidden" onClick={toggleDiv}/>}
        </div>
        <nav className={`lg:sticky lg:top-[100px] transition-transform duration-500 ease-in-out mt-6 transform ${isVisible && 'hidden'} lg:block`}>
          {[
            { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
            { name: 'Quizzes', icon: BookOpen, id: 'quizzes' },
            { name: 'AI Interviews', icon: Cpu, id: 'interviews' },
            { name: 'Profile', icon: User, id: 'profile' },
          ].map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center px-6 py-3 text-gray-600  hover:bg-gray-100  transition-colors duration-200 ${
                activeTab === item.id ? 'bg-gray-100  border-r-4 border-blue-500' : ''
              }`}
              onClick={() => handleActiveTab(item.id)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </a>
          ))}
        <div className={`w-64 p-6`}>
          <Button variant="outline" className="w-full flex items-center justify-center">
            <LogOut className="mr-2 h-4 w-4" /> Log out
          </Button>
        </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {renderContent()}
      </div>
    </div>
  )
}

function DashboardContent() {
  const recentActivities = [
    { type: 'quiz', name: 'JavaScript Basics', score: 90, date: '2023-05-22' },
    { type: 'interview', name: 'Frontend Developer', score: 85, date: '2023-05-20' },
    { type: 'quiz', name: 'React Fundamentals', score: 88, date: '2023-05-18' },
  ]

  // Generate mock data for the last 3 months
  const generateMockData = () => {
    const data = []
    const today = new Date()
    for (let i = 150; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)
      const dateString = date.toISOString().split('T')[0]
      data.push({
        date: dateString,
        count: Math.floor(Math.random() * 5) // 0-4 activities per day
      })
    }
    return data
  }

  const activityData = generateMockData()

  // Group activity data into months (30-day periods)
  const groupedActivityData = activityData.reduce((acc, day, index) => {
    const monthIndex = Math.floor(index / 30)
    if (!acc[monthIndex]) {
      acc[monthIndex] = []
    }
    acc[monthIndex].push(day)
    return acc
  }, [])

  const months = ['Current Month', 'Last Month', '2 Months Ago']

  const [interviewCount, setInterviewCount] = useState(null);
  const [quizcount,setquizcount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch interview count from the server
  const fetchInterviewCount = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`${BACKEND_URL}/api/interview-count`, {
              withCredentials: true, // Include if session-based auth is used
          });

          console.log(response.data); // Log to check the structure of response data
          setInterviewCount(response.data.interviewCount);
      } catch (err) {
          console.error("Error fetching interview count:", err);
          setError('Failed to fetch interview count');
      } finally {
          setLoading(false);
      }
  };

  // Fetch interview count on component mount
  useEffect(() => {
      fetchInterviewCount();
  }, []);



  //quiz 

   // Fetch interview count from the server
   const fetchquizCount = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${BACKEND_URL}/api/quiz-count`, {
            withCredentials: true, // Include if session-based auth is used
        });

        console.log(response.data); // Log to check the structure of response data
        setquizcount(response.data.quizCount);
    } catch (err) {
        console.error("Error fetching interview count:", err);
        setError('Failed to fetch interview count');
    } finally {
        setLoading(false);
    }
};

// Fetch quiz count on component mount
useEffect(() => {
    fetchquizCount();
}, []);
const { userdata } = useUserContext();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 ">Welcome {userdata?.name}</h2>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[
          { title: 'Quizzes Completed', value: quizcount, icon: BookOpen, color: 'bg-blue' },
          { title: 'AI Interviews Done', value: interviewCount, icon: Cpu, color: 'bg-green' },
          { title: 'Overall Score', value: '85%', icon: GraduationCap, color: 'bg-purple' },
        ].map((stat) => (
          <Card key={stat.title}>
            <CardContent className="flex flex-col lg:flex-row items-center p-6">
              <div className={`rounded-full h-14 w-14 p-3 ${stat.color}`}>
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-center font-medium text-gray-500 ">{stat.title}</p>
                <p className="text-2xl text-center font-bold text-gray-900 ">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>Daily activity over the last 3 months</CardDescription>
        </CardHeader>
           <CardContent className='overflow-x-auto'>
         
            <div className="flex gap-8 pb-2">
              {groupedActivityData.map((month, monthIndex) => (
                <div key={monthIndex} className="flex flex-col gap-1 lg:gap-2">
                  <h3 className="text-sm font-semibold mb-2">Month {monthIndex + 1}</h3>
                  <div className="grid grid-cols-7 gap-1 lg:gap-4 w-[150px] lg:w-[200px]">
                    {month.map((day) => (
                      <Dialog key={day.date}>
                        <DialogTrigger asChild>
                          <div
                            className={`w-4 h-4 lg:w-6 lg:h-6 rounded-sm cursor-pointer ${
                              day.count === 0 ? 'bg-gray-100 ' :
                              day.count === 1 ? 'bg-green-200 ' :
                              day.count === 2 ? 'bg-green-300 ' :
                              day.count === 3 ? 'bg-green-400 ' :
                              'bg-green-500 '
                            }`}
                            title={`${day.date}: ${day.count} activities`}
                          />
                        </DialogTrigger>
                        <DialogContent className="min-w-[90%] md:min-w-[50%] p-4 pb-7">
                          <DialogHeader>
                            <DialogTitle>Activity on {day.date}</DialogTitle>
                            <DialogDescription>
                              You completed {day.count} {day.count === 1 ? 'activity' : 'activities'} on this day.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4">
                            <h4 className="font-semibold mb-2">Activities:</h4>
                            <ul className="list-disc pl-5">
                              {Array(day.count).fill(0).map((_, i) => (
                                <li key={i}>
                                  {Math.random() > 0.5 ? 'Completed a quiz' : 'Participated in an AI interview'}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest quiz and interview performances</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivities.map((activity, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {activity.type === 'quiz' ? <BookOpen className="inline mr-2" /> : <Cpu className="inline mr-2" />}
                    {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                  </TableCell>
                  <TableCell>{activity.name}</TableCell>
                  <TableCell>
                    <Progress value={activity.score} className="w-full max-w-xs" />
                  </TableCell>
                  <TableCell>{activity.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function QuizzesContent() {
  const pastQuizzes = [
    { id: 1, name: 'JavaScript Basics', score: 15, totalScore: 20, date: '2023-05-15', averageScore: 85, timeSpent: '25 mins', feedback: 'Excellent understanding of core concepts. Work on advanced topics.' },
    { id: 2, name: 'React Fundamentals', score: 10, totalScore: 25, date: '2023-05-10', averageScore: 80, timeSpent: '35 mins', feedback: 'Good grasp of React basics. Practice more with hooks and state management.' },
    { id: 3, name: 'CSS Flexbox', score: 10, totalScore: 15, date: '2023-05-05', averageScore: 78, timeSpent: '20 mins', feedback: 'Solid understanding of Flexbox. Review alignment properties for improvement.' },
  ]

  const availableQuizzes = [
    { id: 1, name: 'Advanced JavaScript', category: 'Programming', questions: 30, timeLimit: '45 mins', difficulty: 'Advanced' },
    { id: 2, name: 'Vue.js Basics', category: 'Web Development', questions: 25, timeLimit: '40 mins', difficulty: 'Intermediate' },
    { id: 3, name: 'CSS Grid Layout', category: 'Web Design', questions: 20, timeLimit: '30 mins', difficulty: 'Intermediate' },
  ]


  const [allResults, setAllResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchAllResults = async () => {
          try {
                const res = await fetch(`${BACKEND_URL}/api/all-quiz`, {
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
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 ">Quizzes</h2>
      <Tabs defaultValue="past">
        <TabsList className='mb-3'>
          <TabsTrigger value="past" className="py-2">Past Quizzes</TabsTrigger>
          <TabsTrigger value="available" className="py-2 ">Trending Quizzes</TabsTrigger>
        </TabsList>
        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle>Your Quiz History</CardTitle>
              <CardDescription>Review your past quiz performances</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quiz Name</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Date Taken</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
  {allResults.map((user, userIndex) => (
    user.quizzes.map((quiz, quizIndex) => (
      <TableRow key={`${userIndex}-${quizIndex}`}>
        <TableCell className="font-medium">{quiz.topic}</TableCell> {/* Display Quiz Name */}
        <TableCell>
          <div className="flex flex-col lg:flex-row items-center">
            <Progress value={(quiz.correct / quiz.total) * 100} className="w-full mr-4" />
            <span>{quiz.correct}/{quiz.total}</span>
          </div>
        </TableCell>
        <TableCell>{new Date(quiz.date).toLocaleDateString()}</TableCell> {/* Format quiz date */}
        <TableCell>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className='py-2'>Review</Button>
            </DialogTrigger>
            <DialogContent className='min-w-[90%] md:min-w-[50%] px-6 pt-4 pb-7'>
              <DialogHeader>
                <DialogTitle>{quiz.topic} - Review</DialogTitle>
                <DialogDescription>
                  Quiz taken on {new Date(quiz.date).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="flex justify-between">
                  <span>Your Score:</span>
                  <span>{quiz.correct}/{quiz.total} ({((quiz.correct / quiz.total) * 100).toFixed(2)}%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Score:</span>
                  <span>{quiz.total}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Spent:</span>
                  <span>{quiz.timeSpent}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">Performance:</span>
                  {quiz.correct > quiz.averageScore ? (
                    <TrendingUp className="text-green-500" />
                  ) : (
                    <TrendingDown className="text-red-500" />
                  )}
                  <span className={quiz.correct >= quiz.total ? "text-green-500 ml-1" : "text-red-500 ml-1"}>
                    {Math.abs(quiz.correct - quiz.total).toFixed(2)}% {quiz.correct > quiz.total ? "above" : "below"} average
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold">Feedback:</h4>
                  <p className="text-sm text-gray-600 mt-1">{quiz.feedback}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TableCell>
      </TableRow>
    ))
  ))}
</TableBody>

              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="available">
          <Card>
            <CardHeader>
              <CardTitle>Available Quizzes</CardTitle>
              <CardDescription>Start a new quiz to test your knowledge</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quiz Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Questions</TableHead>
                    <TableHead>Time Limit</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableQuizzes.map((quiz) => (
                    <TableRow key={quiz.id}>
                      <TableCell className="font-medium">{quiz.name}</TableCell>
                      <TableCell>{quiz.category}</TableCell>
                      <TableCell>{quiz.questions}</TableCell>
                      <TableCell>{quiz.timeLimit}</TableCell>
                      <TableCell>{quiz.difficulty}</TableCell>
                      <TableCell className='min-w-[200px]'>
                        <Button className="py-2" variant="outline" size="sm">Start Quiz</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function InterviewsContent() {
  const pastInterviews = [
    { id: 1, role: 'Frontend Developer', company: 'Tech Co', score: 85, date: '2023-05-20', feedback: 'Strong technical skills, could improve on communication.' },
    { id: 2, role: 'UX Designer', company: 'Design Agency', score: 78, date: '2023-05-12', feedback: 'Good design thinking, needs more practice with prototyping tools.' },
    { id: 3, role: 'Full Stack Engineer', company: 'Startup Inc', score: 92, date: '2023-05-05', feedback: 'Excellent problem-solving skills, very well-rounded candidate.' },
  ]

  const availableInterviews = [
    { id: 1, role: 'Backend Developer', company: 'Cloud Services', duration: '35 mins', difficulty: 'Intermediate', topics: ['Node.js', 'Express', 'MongoDB'] },
    { id: 2, role: 'DevOps Engineer', company: 'Tech Solutions', duration: '40 mins', difficulty: 'Advanced', topics: ['Docker', 'Kubernetes', 'CI/CD'] },
    { id: 3, role: 'Mobile App Developer', company: 'App Innovators', duration: '30 mins', difficulty: 'Intermediate', topics: ['React Native', 'iOS', 'Android'] },
  ]

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
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 ">AI Interview Simulations</h2>
      <Tabs defaultValue="past">
        <TabsList className='mb-1'>
          <TabsTrigger value="past" className='py-1'>Past Interviews</TabsTrigger>
          <TabsTrigger value="available" className='py-1'>Trending Interviews</TabsTrigger>
        </TabsList>
        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle>Your Interview History</CardTitle>
              <CardDescription>Review your past interview performances</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {allResults.map((user, userIndex) => (
  user.sessions.map((session, sessionIndex) => (
    <TableRow key={session.id}>
      <TableCell className="font-medium">{session.role}</TableCell>
      <TableCell>{session.company}</TableCell>
      <TableCell>
        <div className="flex flex-col lg:flex-row items-center">
          <Progress value={session.score} className="w-full max-w-xs mr-4" />
          <span>{session.score}%</span>
        </div>
      </TableCell>
      <TableCell>{new Date(session.start_time).toLocaleDateString()}</TableCell>
      <TableCell>
      <Dialog>
  <DialogTrigger asChild>
    <Button className="py-2" variant="outline" size="sm">Review</Button>
  </DialogTrigger>
  <DialogContent className="min-w-[90%] md:min-w-[60%] px-6 pt-4 pb-7 max-h-[80vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>{session.role} Interview Review</DialogTitle>
      <DialogDescription>
        Interview with {session.company} on {new Date(session.start_time).toLocaleDateString()}
      </DialogDescription>
    </DialogHeader>
    <div className="mt-4 space-y-4">
      <div>
        <h4 className="font-semibold">Score</h4>
        <Progress value={session.score} className="w-full mt-2" />
        <p className="text-sm text-gray-500 mt-1">{session.score}%</p>
      </div>
      
      <div>
        <h4 className="font-semibold">Responses</h4>
        <div className="max-h-96 overflow-y-auto"> {/* Scrollable container for responses */}
          {session.responses && session.responses.length > 0 ? (
            session.responses.map((response, index) => (
              <div key={index} className="mt-4 bg-white p-4 rounded-lg">
                <h5 className="font-semibold">Question {index + 1}:</h5>
                <p><strong>Question:</strong> {response.question}</p>
                <p><strong>Answer:</strong> {response.answer}</p>
                <p><strong>Rating:</strong> {response.rating}</p>
                <p><strong>Evaluation:</strong> {response.evaluation}</p>
              </div>
            ))
          ) : (
            <p>No responses available</p>
          )}
        </div>
      </div>
    </div>
  </DialogContent>
</Dialog>


      </TableCell>
    </TableRow>
  ))
))}

                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="available">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableInterviews.map((interview) => (
              <Card key={interview.id} className='flex flex-col justify-between'>
                <CardHeader className='pb-0'>
                  <CardTitle>{interview.role}</CardTitle>
                  <CardDescription>{interview.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600 ">{interview.duration}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Brain className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600 ">{interview.difficulty}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {interview.topics.map((topic) => (
                      <span key={topic} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <Button className="w-full text-gray-900">
                    Start Interview <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}