import React from "react"
// import Doctors from "./pages/Doctors"
// import Navbar from "./components/Navbar"
import {Doctors, About, Contact, HomePage} from './pages'
import {Navbar, Footer} from './components'
// import HomePage from "./pages/Home"
// import Navbar from "./components/Navbar"
// import Footer from "./components/Footer"

function App() {
  return (
    <>
    <Navbar/>

    {/* <HomePage/> commenting temporary  */}

    <Doctors/>
    <Footer/>

    </>
  )
}

export default App
