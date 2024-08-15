// src/Error404Page.js

import React, { useState, useEffect } from 'react';
import './Error404Page.css';

export const Error404Page = () => {
  const [playerPosition, setPlayerPosition] = useState(50);
  const [bullets, setBullets] = useState([]);
  const [targets, setTargets] = useState([
    { id: 1, position: 40, number: 'M' },
    { id: 2, position: 50, number: '6' },
    { id: 3, position: 60, number: '4' },
  ]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && playerPosition > 0) {
        setPlayerPosition((pos) => pos - 5);
      } else if (e.key === 'ArrowRight' && playerPosition < 95) {
        setPlayerPosition((pos) => pos + 5);
      } else if (e.key === ' ') {
        shootBullet();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerPosition]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBullets((prevBullets) =>
        prevBullets.map((bullet) => ({
          ...bullet,
          top: bullet.top - 5,
        }))
      );
    }, 50); // Decrease interval time for faster bullet movement

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBullets((prevBullets) =>
        prevBullets.filter((bullet) => bullet.top > 0)
      );

      setTargets((prevTargets) => {
        const remainingTargets = prevTargets.filter((target) => {
          const hit = bullets.some(
            (bullet) =>
              bullet.top < 15 && // Adjusted for better collision detection
              bullet.left >= target.position &&
              bullet.left <= target.position + 5
          );
          return !hit;
        });

        if (remainingTargets.length === 0) {
          setGameOver(true);
        }

        return remainingTargets;
      });

      setBullets((prevBullets) =>
        prevBullets.filter(
          (bullet) =>
            !targets.some(
              (target) =>
                bullet.top < 15 &&
                bullet.left >= target.position &&
                bullet.left <= target.position + 5
            )
        )
      );
    }, 50); // Decrease interval time for faster collision detection

    return () => clearInterval(interval);
  }, [bullets, targets]);

  const shootBullet = () => {
    setBullets((prevBullets) => [
      ...prevBullets,
      { id: Date.now(), left: playerPosition, top: 90 }, // Start bullet at player's position
    ]);
  };

  return (
    <div className="game-area">
      <h1>404 - Page Not Found</h1>
      <div className="targets">
        {targets.map((target) => (
          <div
            key={target.id}
            className="target"
            style={{ left: `${target.position}%` }}
          >
            {target.number}
          </div>
        ))}
      </div>
      <div className="player" style={{ left: `${playerPosition}%` }} />
      <div className="bullets">
        {bullets.map((bullet) => (
          <div
            key={bullet.id}
            className="bullet"
            style={{ left: `${bullet.left}%`, top: `${bullet.top}%` }}
          />
        ))}
      </div>
      {gameOver && (
  <div className="game-over">
    You Win! Return to the{' '}
    <a href="/" className="homepage-link">
      HomePage
    </a>
  </div>
)}
    </div>
  );
};

export default Error404Page;