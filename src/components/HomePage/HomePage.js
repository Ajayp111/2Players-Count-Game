import React, { useEffect, useState } from "react";
import "./HomePage.css";

export default function HomePage() {
  const [timer, setTimer] = useState(0);
  const [player1Count, setPlayer1Count] = useState(0); // Count for player 1
  const [player2Count, setPlayer2Count] = useState(0); // Count for player 2
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1 for player 1, 2 for player 2

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  // Function to handle click for the current player
  const handleCurrentPlayerClick = () => {
    if (timer !== 0) {
      if (currentPlayer === 1) {
        setPlayer1Count(player1Count + 1);
      } else {
        setPlayer2Count(player2Count + 1);
      }
    }
  };

  // Function to start player 2's timer
  const startPlayer2Timer = () => {
    setCurrentPlayer(2);
    setTimer(10);
  };

  // Function to determine the winner
  const determineWinner = () => {
    if (player1Count > player2Count) {
      return "Player 1 Wins!";
    } else if (player1Count < player2Count) {
      return "Player 2 Wins!";
    } else {
      return "It's a Tie!";
    }
  };

  return (
    <div className="home-container">
      <div className="home-timer">Timer: {timer}</div>
      <div className="home-count">{currentPlayer} Player</div>
      <div className="home-player-counts">
        <div className="player-score">Player 1 Count: {player1Count}</div>
        <div className="player-score">Player 2 Count: {player2Count}</div>
      </div>
      <button
        className="home-btn-start btn"
        onClick={() => {
          setTimer(10);
          setPlayer1Count(0);
          setPlayer2Count(0);
          setCurrentPlayer(1); // Start with player 1's turn
        }}
        disabled={timer !== 0}
      >
        Start
      </button>
      <button
        className="home-btn-click btn"
        onClick={handleCurrentPlayerClick}
        disabled={timer === 0}
      >
        {currentPlayer === 1 ? "Player 1 Click" : "Player 2 Click"}
      </button>
      <button
        className="home-btn-reset btn"
        onClick={() => {
          setPlayer1Count(0);
          setPlayer2Count(0);
          setTimer(0);
        }}
      >
        Reset
      </button>
      {timer === 0 && (
        <div className="home-winner">
          {currentPlayer === 1 ? (
            <button className="player-2" onClick={startPlayer2Timer}>
              Start Player 2
            </button>
          ) : (
            determineWinner()
          )}
        </div>
      )}
    </div>
  );
}
