import './App.css';

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>  
        <Routes>


          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/about" element={<About/>}/>

        </Routes>
      
      </BrowserRouter>
          
      
    </>
  );
}

export default App;
