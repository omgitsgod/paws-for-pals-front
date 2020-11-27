import React, { useEffect, useReducer } from 'react';

const handleOptions = (input) => {
  let options = '';
  for (const entry in input) {
    options += `${entry}=${input[entry]}&`;
  }
  return options.slice(0, -1);
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TYPE':
      return {
        ...state,
        data: [],
        type: action.payload
      };
    case 'SET_OPTIONS':
      return {
        ...state,
        data: [],
        options: action.payload
      }
    case 'FETCH_INIT':
      return { 
        ...state,
        isLoading: true,
        isError: false,
        data: []
      };
    case 'FETCH_SUCCESS':
      return { 
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case 'FETCH_FAILURE':
      return { 
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

function useGetPets(initialType, initialOptions) {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    type: initialType,
    options: initialOptions,
    isLoading: false,
    isError: false,
    data: [],
  });

  const setOptions = (options) => {
    dispatch({type: 'SET_OPTIONS', payload: options});
  }

  const setType = (type) => {
    dispatch({type: 'SET_TYPE', payload: type});
  }

  useEffect(() => {
    const getPets = async () => {
      dispatch({ type: 'FETCH_INIT' });
      const backHost = process.env.REACT_APP_BACK_HOST;
      const url = `${backHost}/${state.type}?${handleOptions(state.options)}`;
      try {
        const result = await fetch(url).then((r) => r.json());
        const filtered = result.animals.filter((pet) => pet.photos[0]);
        const photos = filtered.map((pet) => pet.photos[0].full);
      //  setPets(filtered);
        dispatch({ type: 'FETCH_SUCCESS', payload: photos });
        console.log(photos);
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' });
      }
    }

    getPets();
  }, [state.type, handleOptions(state.options)]);

  return [state, setType, setOptions];
}

export default useGetPets;
