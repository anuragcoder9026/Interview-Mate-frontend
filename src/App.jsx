import { useState } from 'react'
import NavBar from './components/navbar'
import Header from './components/header'
import { FooterWithSocialLinks } from './components/footer';
import './App.css'
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollTop";
import 'regenerator-runtime/runtime';

function App() {

  return (
    <>
     <ScrollToTop/>
     <Header/>
     <NavBar/>
     <Outlet/>
     <FooterWithSocialLinks/>
    </>
  )
}

export default App
