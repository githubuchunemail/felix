import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Error from './Pages/Error/Error';
import { useContext, useState } from 'react';
import { AuthContext } from './Context/AuthContext';

function App() {
  const { token } = useContext(AuthContext)

  return (
    <div className='App'>
    {
      token ? (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Error />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Error />} />
        </Routes>
      )
    }
    </div>
  );
}

export default App;
