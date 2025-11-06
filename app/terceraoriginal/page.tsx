
"use client";
import { useState, useEffect } from "react";

const ICONS = ["🍎", "🍌", "🍇", "🍒", "💣"];
const GRID_SIZE = 3;

export default function TerceraOriginal() {
  const [grid, setGrid] = useState<string[][]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  // Generar tablero aleatorio
  const generateGrid = () => {
    const newGrid = Array(GRID_SIZE)
      .fill(null)
      .map(() =>
        Array(GRID_SIZE)
          .fill(null)
          .map(() => ICONS[Math.floor(Math.random() * ICONS.length)])
      );
    setGrid(newGrid);
  };

  // Iniciar el juego
  useEffect(() => {
    generateGrid();
    const interval = setInterval(generateGrid, 1000);

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, []);

  const handleClick = (item: string) => {
    if (gameOver) return;

    if (item === "💣") {
      setGameOver(true);
    } else {
      setScore((s) => s + 1);
    }
  };

  const reiniciar = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    generateGrid();
  };

  return (
    <div className="game-container">
      <div className="card">
        <h1 className="text-3xl font-bold mb-4">No toques la bomba!</h1>
        <p className="text-gray-300 mb-2">⏱️ Tiempo: {timeLeft}s</p>
        <p className="text-gray-300 mb-4">⭐ Puntos: {score}</p>

        <div className="flex flex-col items-center gap-2">
          {grid.map((row, i) => (
            <div key={i} className="flex gap-2">
              {row.map((item, j) => (
                <button
                  key={j}
                  onClick={() => handleClick(item)}
                  className="w-20 h-20 bg-gray-800 text-3xl rounded-lg hover:scale-105 transition-transform flex items-center justify-center"
                  disabled={gameOver}
                >
                  {gameOver ? item : "❓"}
                </button>
              ))}
            </div>
          ))}
        </div>

        {gameOver && (
          <p className="mt-4 text-lg font-semibold text-red-400">
            {timeLeft === 0
              ? `⏰ ¡Se acabó el tiempo! Puntos: ${score}`
              : `💣 ¡BOOM! Tocaste una bomba. Puntos: ${score}`}
          </p>
        )}

        <button
          onClick={reiniciar}
          className="btn-primary mt-5"
        >
          🔄 Reiniciar
        </button>
      </div>
    </div>
  );
}
