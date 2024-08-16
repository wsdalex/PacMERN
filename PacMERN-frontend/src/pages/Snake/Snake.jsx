// src/SnakeGame.js
import React, { useState, useEffect, useRef } from 'react';

const SnakePage = () => {
  const blockSize = 25;
  const totalRow = 17;
  const totalCol = 17;
  
  const [snakeX, setSnakeX] = useState(blockSize * 5);
  const [snakeY, setSnakeY] = useState(blockSize * 5);
  const [speedX, setSpeedX] = useState(0);
  const [speedY, setSpeedY] = useState(0);
  const [snakeBody, setSnakeBody] = useState([]);
  const [foodX, setFoodX] = useState(0);
  const [foodY, setFoodY] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = totalRow * blockSize;
    canvas.width = totalCol * blockSize;
    const context = canvas.getContext('2d');

    placeFood();
    const interval = setInterval(update, 100);
    document.addEventListener('keyup', changeDirection);

    return () => {
      clearInterval(interval);
      document.removeEventListener('keyup', changeDirection);
    };
  }, []);

  const update = () => {
    if (gameOver) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = 'green';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'yellow';
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX === foodX && snakeY === foodY) {
      setSnakeBody([...snakeBody, [foodX, foodY]]);
      placeFood();
    }

    let newSnakeBody = snakeBody.slice();
    for (let i = newSnakeBody.length - 1; i > 0; i--) {
      newSnakeBody[i] = newSnakeBody[i - 1];
    }
    if (newSnakeBody.length) {
      newSnakeBody[0] = [snakeX, snakeY];
    }
    setSnakeBody(newSnakeBody);

    setSnakeX(snakeX + speedX * blockSize);
    setSnakeY(snakeY + speedY * blockSize);

    context.fillStyle = 'white';
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let part of snakeBody) {
      context.fillRect(part[0], part[1], blockSize, blockSize);
    }

    if (
      snakeX < 0 ||
      snakeX >= totalCol * blockSize ||
      snakeY < 0 ||
      snakeY >= totalRow * blockSize ||
      snakeBody.some(part => part[0] === snakeX && part[1] === snakeY)
    ) {
      setGameOver(true);
      alert('Game Over');
    }
  };

  const changeDirection = (e) => {
    if (e.code === 'ArrowUp' && speedY !== 1) {
      setSpeedX(0);
      setSpeedY(-1);
    } else if (e.code === 'ArrowDown' && speedY !== -1) {
      setSpeedX(0);
      setSpeedY(1);
    } else if (e.code === 'ArrowLeft' && speedX !== 1) {
      setSpeedX(-1);
      setSpeedY(0);
    } else if (e.code === 'ArrowRight' && speedX !== -1) {
      setSpeedX(1);
      setSpeedY(0);
    }
  };

  const placeFood = () => {
    const foodX = Math.floor(Math.random() * totalCol) * blockSize;
    const foodY = Math.floor(Math.random() * totalRow) * blockSize;
    setFoodX(foodX);
    setFoodY(foodY);
  };

  return <canvas ref={canvasRef} />;
};

export default SnakePage;
