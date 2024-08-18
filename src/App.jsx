import { useState } from 'react'
import NavBar from './components/navbar'
import Header from './components/header'
import { FooterWithSocialLinks } from './components/footer'
import About from './components/about'
import Card from './components/card'
import CardGrid from './components/homearrangecard'


import './App.css'

function App() {

  return (
    <>
     <Header/>
     <NavBar/>
     <CardGrid/>
     {/* <Card/> */}
     
     {/* <About/> */}
     <FooterWithSocialLinks/>
    </>
  )
}

export default App
