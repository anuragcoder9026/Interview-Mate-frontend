import { useState } from 'react'
import NavBar from './components/navbar'
import Header from './components/header'
import { FooterWithSocialLinks } from './components/footer'
import About from './components/about'


import './App.css'

function App() {

  return (
    <>
    <Header/>
<NavBar/>
<About/>

<FooterWithSocialLinks/>

    </>
  )
}

export default App
