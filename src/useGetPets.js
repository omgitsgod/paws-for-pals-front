import React, { useState } from 'react';

function useGetPets ({ type, options }) {
  const [pets, setPets] = useState([]);
  const [petPhotos, setPetPhotos] = useState([]);
  const [stringifiedType, stringifiedOptions] = [JSON.stringify(type), JSON.stringify(options)];

  useEffect(() => {
    const handlePetOptions = (input) => {
      let options = '';
      for (const entry in input) {
        options += `${entry}=${input[entry]}&`;
      }
      return options.slice(0, -1);
    };
    const getPets = async () => {
      const backHost = process.env.REACT_APP_BACK_HOST;
      const petOptions = handlePetOptions(options);
      const url = `${backHost}/${type}?${petOptions}`;
      try {
        const result = await fetch(url).then((r) => r.json());
        if (result.status === 200) {
          const filtered = result.animals.filter((pet) => pet.photos[0]);
          const photos = filtered.map((pet) => pet.photos[0].full);
          setPets(filtered);
          setPetPhotos(photos);
          console.log(photos);
        } else {
          console.error(`Error ${result.status} ${result.statusText}`);
        }
      } catch (error) {
        console.error(`Error ${error}`);
      }
    };
  }, [stringifiedType, stringifiedOptions]);

  return petPhotos;
}

export default useGetPets;
