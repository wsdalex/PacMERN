import React, { useState, useEffect } from 'react';
import './Error404Page.css';
import Footer from '../../components/footer';
import theme from '../../assets/theme';
import { Typography } from "@mui/material";
import GlobalNavBar from '../../components/GlobalNavBar';

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
          top: bullet.top - 12, // Further increase bullet speed
        }))
      );
    }, 20); // Decrease interval time for faster bullet movement

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
              bullet.top < 20 && // Adjusted for better collision detection
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
                bullet.top < 20 &&
                bullet.left >= target.position &&
                bullet.left <= target.position + 5
            )
        )
      );
    }, 15); // Further decrease interval time for faster collision detection

    return () => clearInterval(interval);
  }, [bullets, targets]);

  const shootBullet = () => {
    setBullets((prevBullets) => [
      ...prevBullets,
      { id: Date.now(), left: playerPosition, top: 90 }, // Start bullet at player's position
    ]);
  };

  return (
    <div>
      <GlobalNavBar/>
      <div className="game-area">
        <Typography
          variant="h4"
          sx={{
            fontFamily: theme.typography.retro,
            color: theme.palette.text.primary,
            textAlign: "center",
            marginBottom: 4,
          }}
        >
          404 - Page Not Found
        </Typography>
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
              <Typography
          variant="h4"
          sx={{
            fontFamily: theme.typography.retro,
            color: theme.palette.text.green,
            textAlign: "center",
            marginBottom: 4,
          }}
        >
            You Win! Return to the{" "}
            <a href="/" className="homepage-link">
              HomePage
            </a>
            </Typography>
          </div>
        )}
      </div>
      <Typography
          variant="body1"
          sx={{
            fontFamily: theme.typography.retro,
            color: theme.palette.text.primary,
            textAlign: "center",
            marginBottom: 4,
          }}
        >
          Use space bar and arrows to play
        </Typography>
      <Footer />
    </div>
  );
};

export default Error404Page;
