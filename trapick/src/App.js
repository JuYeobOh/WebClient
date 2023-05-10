import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import MainPage from './pages/Mainpage.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          {/* <Route path='/login' element={<LoginPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;