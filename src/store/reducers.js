const initialState = {
    isLoggedIn: false,
    username: '',
    pokemonData: [],
    currentPage: 1,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, isLoggedIn: true, username: action.payload.username };
      case 'LOGOUT':
        return { ...state, isLoggedIn: false, username: '' };
      case 'SET_POKEMON_DATA':
        return { ...state, pokemonData: action.payload };
      case 'SET_CURRENT_PAGE':
        return { ...state, currentPage: action.payload };
      default:
        return state;
    }
  };
  
  export default authReducer;
  