import React, { useEffect, useReducer } from 'react';

const handleOptions = (input) => {
  let options = '';
  for (const entry in input) {
    options += `${entry}=${input[entry]}&`;
  }
  return options.slice(0, -1);
};

const formatData = (data) => {
  let result = [];
  for (let i = 0; i < data.length; i += 10) {
    let arr = data.slice(i, i + 10);
    result.push(arr);
  }
  return result;
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TYPE':
      return {
        ...state,
        data: [],
        type: action.payload,
      };
    case 'SET_OPTIONS':
      return {
        ...state,
        data: [],
        options: action.payload,
      };
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
        visableData: action.payload[state.page]
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'NEXT_PAGE':
      return {
        ...state,
        visableData: state.data[state.page + 1],
        page: state.page + 1
      }
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
    visableData: [],
    page: 0,
  });

  const setOptions = (options) => {
    dispatch({ type: 'SET_OPTIONS', payload: options });
  };
  const setType = (type) => {
    dispatch({ type: 'SET_TYPE', payload: type });
  };
  const nextPage = () => {
    dispatch({ type: 'NEXT_PAGE'})
  }

  useEffect(() => {
    let cancelRequest = false;
    const getPets = async () => {
      dispatch({ type: 'FETCH_INIT' });
      const backHost = process.env.REACT_APP_BACK_HOST;
      const url = `${backHost}/${state.type}?${handleOptions(state.options)}`;
      try {
        const result = await fetch(url).then((r) => r.json());
        const filtered = result.animals.filter((pet) => pet.photos[0]);
        const photos = filtered.map((pet) => pet.photos[0].full);
        const formated = formatData(photos);
        //  setPets(filtered);
        if (cancelRequest) return;
        dispatch({ type: 'FETCH_SUCCESS', payload: formated });
        console.log(photos);
      } catch (error) {
        if (cancelRequest) return;
        dispatch({ type: 'FETCH_FAILURE' });
      }
    };

    getPets();

    return () => {
      cancelRequest = true;
    };
  }, [state.type, handleOptions(state.options)]);
  return [{data: state.visableData, isLoading: state.isLoading, isError: state.isError}, setType, setOptions, nextPage];
}

export default useGetPets;
