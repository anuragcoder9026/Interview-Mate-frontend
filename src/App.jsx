import { useState ,useEffect} from 'react'
import NavBar from './components/navbar'
import Header from './components/header'
import { FooterWithSocialLinks } from './components/footer';
import './App.css'
import { Outlet,useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollTop";
import 'regenerator-runtime/runtime';
import SplashScreen from './components/SplashScreen';
function App() {
  const location = useLocation();
  const noFooterRoutes = ["/message","/chatbot","/quizapp"];
  const [splash,setSplash]=useState(true);
  useEffect(()=>{
     setTimeout(()=>{
      setSplash(false);
     },2000)
  },[])
  return (
    splash?<SplashScreen/>:
    <>
     <ScrollToTop/>
     <Header/>
     <NavBar/>
     <Outlet/>
     {!noFooterRoutes.includes(location.pathname) &&  <FooterWithSocialLinks/>}
     
    </>
    
  )
}

export default App;
