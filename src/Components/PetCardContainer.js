import React, { useState, useEffect, useCallback } from 'react';
import { useSprings } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import CircularProgress from '@material-ui/core/CircularProgress';
import useGetPets from '../hooks/useGetPets';
import PetCard from './PetCard';
import Card from './Card';
import { backHost, to, from, trans } from '../config';

function PetCardContainer({ type, options, handlePet, pet, selected, isAuthenticated, handleShelters }) {
  const [disliked] = useState(() => new Set());
  const [liked] = useState(() => new Set());
  const { state, setType, nextPage } = useGetPets(type, options);
  const { data, isError } = state;
  const unauthFavLimit = 10;
  const [springProps, set] = useSprings(data?.length || 0, (i) => ({
    ...to(i),
    from: from(i),
  }));
  const handleTimeout = () => {
    liked.clear();
    disliked.clear();
    set((i) => to(i));
    nextPage();
  };
  const saveToDatabase = isAuthenticated ? async (item) => {
    console.log(item)
    await fetch(`${backHost}/save_favorite`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(item),
      headers: {
      'Content-Type': 'application/json'
      }
    }).then((r) => r.json());
  } : async (item) => {
      const storedFavorites = localStorage.getItem('favorites');
      let favorites
      if (storedFavorites) {
        favorites = JSON.parse(storedFavorites);
        if (favorites.length < unauthFavLimit) {
          if (!favorites.filter((x) => x.id === item.id)[0]) {
            favorites.push(item);
            localStorage.setItem('favorites', JSON.stringify(favorites));
          }
        } else {
          alert(`Log in to account to add more than ${unauthFavLimit} favorites!`)
        }
      } else {
        localStorage.setItem('favorites', JSON.stringify([item]));
      }
  }
  const addPetLiked = (index) => {
    const selectedPet = data[index];
    liked.add(selectedPet)
    saveToDatabase(selectedPet)
    handlePet(data, liked.size, disliked.size);
  }
  const addPetDisliked = (index) => {
    const selectedPet = data[index];
    disliked.add(selectedPet);
    handlePet(data, liked.size, disliked.size);
  }
  const handleNewData = useCallback(() => {
    if (data?.length > 0 && selected === 'list') {
      handlePet(data, liked.size, disliked.size);
      handleShelters(new Set(data.map((pet) => pet.organization_id)));
    }
  }, [data, liked.size, disliked.size])
  const bind = useDrag(
    ({
      args: [index],
      down,
      movement: [mx],
      distance,
      direction: [xDir],
      velocity,
    }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger && xDir <= -0.5) addPetDisliked(index);
      if (!down && trigger && xDir >= 0.5) addPetLiked(index);
      set((i) => {
        if (index !== i) return;
        const isGone = disliked.has(data[index]) || liked.has(data[index]);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && disliked.size + liked.size === data.length)
        setTimeout(() => handleTimeout() || set((i) => to(i)), 600);
      //next()
    }
  );
  useEffect(() => {
    setType(type);
  }, [type]);
  useEffect(() => {
    handleNewData();
  }, [data, handleNewData])

  if (!data?.length && selected === 'list') {
    return (
      <CircularProgress style={{marginTop: '40vh', height: '80px', width: '80px'}}/>
    );
  } else if (selected === 'pet' && pet) {
    return (
      <Card source='profile' card={pet} />
    )
  } else if (selected === 'list' && data) {
    return (
      <>
        {!isError && springProps.map(({ x, y, rot, scale }, i) => (
          <PetCard
            key={i}
            i={i}
            x={x}
            y={y}
            rot={rot}
            scale={scale}
            trans={trans}
            cards={data}
            bind={bind}
          />
        ))}
      </>);
  } else {
    return <p>Coming Soon</p>
  }
}

export default PetCardContainer;
