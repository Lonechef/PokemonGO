  import React, { useState, useEffect } from 'react';
  import { useParams, useNavigate} from 'react-router-dom';
  import axios from 'axios';


  const PokemonDetail = () => {
    const navigate = useNavigate();
    const { name } = useParams(); // Get the Pokemon name from the URL parameters
    const [pokemon, setPokemon] = useState(null); // Initialize state to hold Pokemon data

    useEffect(() => {
      // Fetch Pokemon details when the component mounts or the name changes
      const fetchPokemonDetail = async () => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon({
          name: response.data.name,
          image: response.data.sprites.other['official-artwork'].front_default,
          height: response.data.height,
          weight: response.data.weight,
        });
      };

      fetchPokemonDetail();
    }, [name]);

    if (!pokemon) {
      return <div className="text-center text-xl">Loading...</div>; // Show loading message if Pokemon data is not yet available
    }
    const handleLogout=()=>{
      navigate('/login')
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
        <div className="bg-white p-12 rounded-lg shadow-lg text-center max-w-lg w-full">
          <h1 className="text-5xl font-bold mb-6 capitalize">{pokemon.name}</h1>
          <img className="w-72 h-72 object-contain mb-6 mx-auto" src={pokemon.image} alt={pokemon.name} />
          <p className="text-xl mb-2">Height: {pokemon.height}</p>
          <p className="text-xl">Weight: {pokemon.weight}</p>
        </div>
        <button 
  onClick={handleLogout} 
  className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
>
  Logout
</button>
      </div>
    );
  };

  export default PokemonDetail;
