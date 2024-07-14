import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/index';
import Typing from './pages/Typing/index';
import Game from './pages/Game/index';


function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL} >
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/typing" element={<Typing/>} />
        <Route path="/game" element={<Game/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
