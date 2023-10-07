import './App.scss'
import {Login} from "./components/login/Login.jsx";
import {Route, Routes} from "react-router-dom";
import {NavBar} from "./components/header/NavBar.jsx";


function App() {



  return (
    <>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/navbar" element={<NavBar/>} />
        </Routes>
    </>
  )
}

export default App
