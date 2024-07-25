import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemonData, setCurrentPage, logout } from  '../../store/action'
import axios from 'axios';


//AllPokemon will store all the pokemons
const AllPokemon = () => {
  //Pokemon data will be in array so default initialization with empty array
  //Importing dispatch
  const dispatch = useDispatch();
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //Fetching the username from the url itself
  const {username} = useParams();
  //Setting up the limit of Pokemon popping up on the screen
  const limit = 4;
  const navigate = useNavigate();

  useEffect(() => {
    //Dependency will be the whole page
    fetchPokemonData();
  }, [currentPage]);

  const fetchPokemonData = async () => {
    const offset = (currentPage - 1) * limit;
    //Fetching data from API using axios
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await Promise.all(response.data.results.map(async (pokemon) => {
      const pokemonDetails = await axios.get(pokemon.url);
      return {
        name: pokemonDetails.data.name,
        image: pokemonDetails.data.sprites.front_default,
        height: pokemonDetails.data.height,
        weight: pokemonDetails.data.weight,
      }
    }));
    dispatch(setPokemonData(data))
    // setPokemonData(data);
  }

  //Traversing to next page
  const nextPage = () => {
    dispatch(setCurrentPage(currentPage+1));
    //setCurrentPage(currentPage + 1);
  };

  //Moving back to previous page
  const previousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage-1));
      //setCurrentPage(currentPage - 1);
    }
  };

  //Handling and navigating
  const handleCardClick = (name) => {
    navigate(`/pokemon/${name}`);
  };
  //Handling logout
  const handleLogout=()=>{
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <h1 className="text-4xl font-bold mb-8">All Pokémon</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {pokemonData.map((pokemon, index) => (
          <div 
            key={index} 
            className="pokemon-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => handleCardClick(pokemon.name)}
          >
            <img className="w-full h-32 object-contain mb-4" src={pokemon.image} alt={pokemon.name} />
            <h2 className="text-2xl font-bold mb-2">{pokemon.name}</h2>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
          </div>
        ))}
      </div>
      <div className="flex space-x-4">
        <button 
          onClick={previousPage} 
          disabled={currentPage === 1}
          className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextPage} 
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
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

export default AllPokemon;
