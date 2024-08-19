import { useState } from 'react'
import NavBar from './components/navbar'
import Header from './components/header'
import { FooterWithSocialLinks } from './components/footer'
import About from './components/about'
import Card from './components/card'
import CardGrid from './components/homearrangecard'
import './App.css'
import { Outlet } from "react-router-dom";
function App() {

  return (
    <>
     <Header/>
     <NavBar/>
     <Outlet/>
     <FooterWithSocialLinks/>
    </>
  )
}

export default App
