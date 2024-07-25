import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthForm from './components/Pages/AuthForm';
import AllPokemon from './components/Pages/AllPokemon';
import PokemonDetail from './components/Pages/PokemonDetails';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to='/login'/>} />
          <Route path='/login' element={<AuthForm/>}/>
          <Route path="/signup" element={<AuthForm/>} />
          <Route path="/allpokemon/:username" element={<AllPokemon/>} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
