import React, { useState, useEffect } from 'react';
import { useSprings } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import useGetPets from './useGetPets';
import PetCard from './PetCard';

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

function PetCardContainer(props) {
  const { zip, type } = props;
  const [disliked] = useState(() => new Set());
  const [liked] = useState(() => new Set());
  const [petOptions, setPetOptions] = useState({
    location: zip,
    distance: '10',
  });
  const [state, setType, setOptions, nextPage] = useGetPets(type, petOptions);
  const { data, isLoading, isError } = state;
  const [springProps, set] = useSprings(data.length, (i) => ({
    ...to(i),
    from: from(i),
  }));
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
      console.log(dir)
      if (!down && trigger && xDir <= -.5) disliked.add(index);
      if (!down && trigger && xDir >= .5) liked.add(index);
      console.log('liked', liked)
      console.log('disliked', disliked)
      set((i) => {
        if (index !== i) return;
        const isGone = disliked.has(index) || liked.has(index);
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
        setTimeout(() => disliked.clear() || set((i) => to(i)), 600);
        //next()
    }
  );
  useEffect(() => {
    setType(type);
  }, [type]);
  
  if (isLoading) {
    return <p>loading...</p>;
  } else if (data) {
    return springProps.map(({ x, y, rot, scale }, i) => (
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
    ));
  }
}

export default PetCardContainer;
