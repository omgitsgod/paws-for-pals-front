import React, { useState, useEffect } from 'react';
import { useSprings } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import CircularProgress from '@material-ui/core/CircularProgress';
import useGetPets from '../hooks/useGetPets';
import PetCard from './PetCard';
import Card from './Card';
import { backHost } from '../config';

const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

function PetCardContainer({ type, options, handlePet, pet, selected }) {
  const [disliked] = useState(() => new Set());
  const [liked] = useState(() => new Set());
  const [state, setType, setOptions, nextPage] = useGetPets(type, options);
  const { data, isLoading, isError } = state;
  const [springProps, set] = useSprings(data.length, (i) => ({
    ...to(i),
    from: from(i),
  }));
  const handleTimeout = () => {
    liked.clear();
    disliked.clear();
    set((i) => to(i));
    nextPage();
  };
  const saveToDatabase = async (item) => {
    console.log(item)
    const success = await fetch(`${backHost}/save_favorite`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(item),
      headers: {
      'Content-Type': 'application/json'
      }
    }).then((r) => r.json());
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
      console.log('distance', distance);
      const dir = xDir < 0 ? -1 : 1;
      console.log(dir);
      if (!down && trigger && xDir <= -0.5) addPetDisliked(index);
      if (!down && trigger && xDir >= 0.5) addPetLiked(index);
      console.log('liked', liked)
      console.log('disliked', disliked);
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
    if (data.length > 0 && selected === 'list') {
    handlePet(data, liked.size, disliked.size);
    console.log('pet: ', data[data.length - 1])
    }
  }, [data.length])

  if (!data.length && selected === 'list') {
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
        {springProps.map(({ x, y, rot, scale }, i) => (
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
