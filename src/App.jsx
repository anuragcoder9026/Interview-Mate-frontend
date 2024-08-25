import { useState ,useEffect} from 'react'
import NavBar from './components/navbar'
import Header from './components/header'
import { FooterWithSocialLinks } from './components/footer';
import './App.css'
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollTop";
import 'regenerator-runtime/runtime';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll the page to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <>
     <ScrollToTop/>
     <Header/>
     <NavBar/>
     <Outlet/>
     <FooterWithSocialLinks/>
     {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue text-white p-3 px-5 shadow-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-75 transition duration-300 ease-in-out"
          style={{borderRadius:"50%",fontSize:"20px"}}>
          ↑
        </button>
      )}
    </>
  )
}

export default App;
