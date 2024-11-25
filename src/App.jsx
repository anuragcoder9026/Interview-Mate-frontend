import { useState ,useEffect} from 'react'
import NavBar from './components/navbar'
import Header from './components/header'
import { FooterWithSocialLinks } from './components/footer';
import './App.css'
import { Outlet,useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollTop";
import 'regenerator-runtime/runtime';
import SplashScreen from './components/SplashScreen';
import { useUserContext } from './context/usercontext';
function App() {
  const location = useLocation();
  const noFooterRoutes = ["/chatbot","/quizapp"];
  const isMessageRoute = location.pathname.startsWith("/message/");
  const iseventRoute = location.pathname.startsWith("/event-chat/");
  const {userdata,logout}=useUserContext();
  return (
    !logout && !userdata ?<SplashScreen/>:
    <>
     <ScrollToTop/>
     <Header/>
     <NavBar/>
     <Outlet/>
     {!isMessageRoute && !iseventRoute && !noFooterRoutes.includes(location.pathname) &&  <FooterWithSocialLinks/>}
    </>
    
  )
}

export default App;