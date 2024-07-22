import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Axios from './components/Axios API/Axios';
import PokemonModal from './components/redux/PokemonModal';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Favorite from './components/Favorites';
import SignOut from './components/Signout';
import Loader from './components/Loader';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 8000); // Total of 8 seconds loading
  }, []);

  if (loading) {
    return <Loader />;
  } 

  return (
    <div>
      <Router>
        <Navbar />
        <div className='flex justify-center items-center '>
          <img className='flex justify-center items-center w-[300px] h-[200px] object-cover mt-16' src="/images/Pokemon Logo.png" alt="" />
        </div>
        <div className='flex flex-row justify-center items-center mt-5 flex-wrap'>
          <Routes>
            <Route path="/" element={<Axios />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/favorites" element={<Favorite />} />
          </Routes>
        </div>
        <PokemonModal />
      </Router>
    </div>
  );
}
