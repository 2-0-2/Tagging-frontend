import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/index';
import Typing from './pages/Typing/index';


function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL} >
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/typing" element={<Typing/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
