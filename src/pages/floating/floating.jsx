import React, { useState, useEffect } from 'react';
import './floating.css';

const FloatingComponent = (props) => {
  const componentWidth = 300; // Width of the component
  const componentHeight = 300; // Height of the component

  const [position, setPosition] = useState({
    x: Math.random() * (window.innerWidth - componentWidth), // Ensure it starts inside the screen horizontally
    y: Math.random() * (window.innerHeight - componentHeight), // Ensure it starts inside the screen vertically
    speedX: (Math.random() - 0.5) * 4,
    speedY: (Math.random() - 0.5) * 4,
  });

  // Call the onClick prop passed from the parent to indicate that this component was clicked.
  const handleClick = () => {
    props.onClick(props.data);
  };

  useEffect(() => {
    const updatePosition = () => {
      requestAnimationFrame(() => {
        const { x, y, speedX, speedY } = position;
        let newSpeedX = speedX;
        let newSpeedY = speedY;
        let newX = x + newSpeedX;
        let newY = y + newSpeedY;

        // Check if the component collides with the edge of the screen
        if (newX < 0 || newX + 350 > window.innerWidth) {
          newSpeedX = -newSpeedX; // Change the direction of the speed instead of modifying speedX directly
          newX = x + newSpeedX;
        }
        if (newY < 0 || newY + 250 > window.innerHeight) {
          newSpeedY = -newSpeedY; // Change the direction of the speed instead of modifying speedY directly
          newY = y + newSpeedY;
        }

        setPosition({ x: newX, y: newY, speedX: newSpeedX, speedY: newSpeedY });
      });
    };

    updatePosition();
  }, [position]);

  const { x, y } = position;

  return (
    <div className="floating-component" style={{ left: x, top: y }} onClick={handleClick}>
      <img alt='profile' src={props.data.userImg} />
      <div className='floating-component-text'>
      <p>{props.data.userName}</p>
      <p>Now playing:  {props.data.userSong}</p>
      </div>
    </div>
  );
};

export default FloatingComponent;
