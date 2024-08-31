import { useState ,useEffect} from 'react'
import NavBar from './components/navbar'
import Header from './components/header'
import { FooterWithSocialLinks } from './components/footer';
import './App.css'
import { Outlet,useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollTop";
import 'regenerator-runtime/runtime';

function App() {
  const location = useLocation();
  const noFooterRoutes = ["/message","/chatbot"];
  return (
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
