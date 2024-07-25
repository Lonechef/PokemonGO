export const login = (username) => ({
    type: 'LOGIN',
    payload: { username },
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  
  export const setPokemonData = (data) => ({
    type: 'SET_POKEMON_DATA',
    payload: data,
  });
  
  export const setCurrentPage = (page) => ({
    type: 'SET_CURRENT_PAGE',
    payload: page,
  });
  