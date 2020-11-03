import React, { useState, useEffect } from 'react';
import { useSprings, animated, to as interpolate } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import PetCard from './PetCard';

const handlePetOptions = (input) => {
  let options = ''
  for (const entry in input) {
    options+=`${entry}=${input[entry]}&`
  }
  return options.slice(0, -1)
}
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

function PetCardContainer() {
  const [gone] = useState(() => new Set());
  const [pets, setPets] = useState([]);
  const [cards, setCards] = useState([]);
  const [petOptions, setPetOptions] = useState({
    location: '10002',
    distance: '10',
  });
  const fetchDogs = async () => {
    const backHost = process.env.REACT_APP_BACK_HOST;
    const options = handlePetOptions(petOptions);
    const url = `${backHost}/Dog?${options}`
    const result = await fetch(url).then((r) => r.json());
    const photos = result.animals.map(x => x.photos[0].full)
    setCards(photos);
    setPets(result.animals);
    console.log(photos);
  };
  const [props, set] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  useEffect(() => {
    fetchDogs(petOptions)
  }, [])
  
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
      if (!down && trigger) gone.add(index);
      set((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
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
      if (!down && gone.size === cards.length)
        setTimeout(() => gone.clear() || set((i) => to(i)), 600);
    }
  );
  return props.map(({ x, y, rot, scale }, i) => (
    <PetCard
      key={i}
      i={i}
      x={x}
      y={y}
      rot={rot}
      scale={scale}
      trans={trans}
      cards={cards}
      bind={bind}
    />
  ));
}

export default PetCardContainer;
