

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashBoard from './components/DashBoard.jsx';
import ProfileSection from './components/Profile.jsx';
import SignUpForm from './components/singup.jsx';
import Home from './components/home.jsx';
import QuizApp from './components/QuizApp.jsx';
import PostDetail from './components/postdetails.jsx';
import VoiceInterview from './components/Interview.jsx';
import Message from './components/Message.jsx';
import { UserProvider } from './context/usercontext'; // Import the UserProvider
import Chatbot from './components/chatbot.jsx';
import NewQuizApp from './components/NewQuizApp.jsx';
 import Result from './components/result.jsx';
import Add from './components/add.jsx';
import MyNetwork from './components/MyNetwork.jsx';
import {Provider} from "react-redux";
import InterviewMateStore from './store/store.js';
import UserProfile from './components/UserProfile.jsx';
import SavedItems from './components/saveItems.jsx';
import ProtectedRoute from './components/protectedRoute.jsx';
import FollowList from './components/followList.jsx';
import EventChat from './components/eventChat.jsx';
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/dashboard', element: <DashBoard /> },
        { path: '/profile', element: ( <ProtectedRoute><ProfileSection /></ProtectedRoute>),},
        { path: '/:id', element: <UserProfile/>},
        { path: '/signup', element: <SignUpForm /> },
        { path: '/quiz', element: <QuizApp /> },
        { path: '/quizapp', element:<NewQuizApp/>},
        { path: '/post/:postId', element: <PostDetail /> },
        { path: '/interview', element: (<ProtectedRoute><VoiceInterview/></ProtectedRoute>) },
        { path: '/message/:userId', element: (<ProtectedRoute><Message /></ProtectedRoute>) },
        {path: '/chatbot',element: <Chatbot/>},
        {path: '/result',element: <Result/>},
        {path: '/add',element: <Add/>},
        {path: '/mynetwork',element:(<ProtectedRoute><MyNetwork /></ProtectedRoute>),},
        {path: '/saved-items',element:<SavedItems/> },
        { path: '/follow-list/:username', element:(<ProtectedRoute><FollowList/></ProtectedRoute>) },
        { path: '/event-chat/:id', element:(<ProtectedRoute><EventChat/></ProtectedRoute>) },
        
        
      ],
    },
  ],
  {
    basename: '/Interview-Mate-frontend/', // Add this line
  }
);

createRoot(document.getElementById('root')).render(
    <Provider store={InterviewMateStore}>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
    </Provider>
);
