import { useContext, useEffect, useState } from "react";
import "./Game.scss";
import { GameService } from "../../services/GameService";
import { AppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const Game = (): JSX.Element => {
  const { game } = useContext(AppContext);
  const navigate = useNavigate();

  const [buttonTexts, setButtonTexts] = useState<string[]>(Array(9).fill(""));

  const [winner, setWinner] = useState<string | null>(null);

  const isDraw = () => {
    return !buttonTexts.includes("") && !winner;
  };

  const handleClick = async (index: number) => {
    const newButtonTexts = [...buttonTexts];
    // Count occurrences of "X" and "O" in newButtonTexts
    const countX = newButtonTexts.filter((move) => move === "X").length;
    const countO = newButtonTexts.filter((move) => move === "O").length;

    // Decide which symbol to place based on counts
    const newSymbol = countX > countO ? "O" : "X";
    newButtonTexts[index] = newSymbol;
    setButtonTexts(newButtonTexts);

    let newMoves = "";

    newButtonTexts.forEach((move: string, i: number) => {
      if (move == "") {
        newMoves += `${i + 1}*,`;
      } else if (move == "X") {
        newMoves += `${i + 1}X,`;
      } else if (move == "O") {
        newMoves += `${i + 1}O,`;
      } else {
        return;
      }
    });

    newMoves = newMoves.slice(0, -1);

    try {
      const response = await GameService.move(newMoves, game!);

      console.log(response);

      if (response.status == 201) {
        alert(response.data.result);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 1X,2*,3*,4*,5O,6*,7X,8*,9*

  // X,"","","",O,"",X,"",""

  const getGame = async () => {
    if (game) {
      try {
        const gameMove = await GameService.getMove(game);
        const newMoves = gameMove.move.split(",");

        const newButtonTexts: string[] = [];

        newMoves.forEach((move: string) => {
          if (move.includes("*")) {
            newButtonTexts.push("");
          } else if (move.includes("X")) {
            newButtonTexts.push("X");
          } else if (move.includes("O")) {
            newButtonTexts.push("O");
          } else {
            return;
          }
        });

        setButtonTexts(newButtonTexts);
      } catch (e: any) {
        const confirmation = window.confirm(e.response.data.result);
        if (confirmation) {
          navigate("/");
        }
      }
    }
  };

  useEffect(() => {
    // Set up an interval to call fetchData every 5 seconds
    const intervalId = setInterval(getGame, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="game">
      <div className="game__grid">
        {buttonTexts.map((text, index) => (
          <button
            className="game__button"
            key={index}
            onClick={() => handleClick(index)}
            disabled={winner !== null || isDraw() || text !== ""}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Game;
