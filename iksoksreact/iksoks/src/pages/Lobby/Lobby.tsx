import { useContext, useEffect, useState } from "react";
import "./Lobby.scss";
import GameModal from "../../components/GameModal/GameModal";
import { LobbyService } from "../../services/LobbyService";
import { AppContext } from "../../contexts/AppContext";
import ChallengedModal from "../../components/ChallengedModal/ChallengedModal";
import { useNavigate } from "react-router-dom";

const Lobby = (): JSX.Element => {
  const { user, setGame } = useContext(AppContext);
  const navigate = useNavigate();
  const [players, setPlayers] = useState<string[]>([]);
  const [gameModalOpened, setGameModalOpened] = useState<boolean>(false);
  const [challengedModalOpened, setChallengedModalOpened] =
    useState<boolean>(false);

  const [incomingChallenge, setIncomingChallenge] = useState<any>("");
  const [selectedOpponent, setSelectedOpponent] = useState<string>("");

  const [opponentMessage, setOpponentMessage] = useState<string>(
    "You are challenging"
  );

  const handleClick = (e: any) => {
    if (!gameModalOpened) {
      setSelectedOpponent(e.currentTarget.textContent);
      setOpponentMessage("You are challenging");
    } else {
      setSelectedOpponent("");
    }

    setGameModalOpened(!gameModalOpened);
  };

  const closeChallengerModal = () => {
    setChallengedModalOpened(false);
  };

  const getLobby = async () => {
    const lobby = await LobbyService.getLobby();
    const realLobby = lobby.filter((player) => player != user);
    setPlayers(realLobby);
  };

  const getIsChallenged = async () => {
    const challenge = await LobbyService.isChallenged(user);

    if (challenge) {
      // IF GAME STARTED
      if (challenge.hasOwnProperty("game")) {
        setGame(challenge["game"]);
        navigate("/game");
      }

      // Opponent has not decided yet
      if (challenge.decision === null && challenge.challenger != user) {
        setChallengedModalOpened(true);
        setIncomingChallenge(challenge);
      }
      // Opponent declined the challenge
      else if (challenge.decision === false && challenge.challenger == user) {
        setOpponentMessage("You got declined by");
        setIncomingChallenge("");
        await LobbyService.challengeResult(challenge.id);
      }
      // Opponent accepted the challenge
      else if (challenge.decision === true && challenge.challenger == user) {
        setOpponentMessage("Challenge accepted by");
        await LobbyService.challengeResult(challenge.id);
      }
    }
  };

  useEffect(() => {
    void getLobby();

    // Set up an interval to call fetchData every 5 seconds
    const intervalId = setInterval(getIsChallenged, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="lobby">
      <h1 className="lobby__heading">LOBBY</h1>
      <div className="lobby__container">
        <ol>
          {players.map((player, i) => {
            return (
              <li onClick={handleClick} className="lobby__list-item" key={i}>
                {player}
              </li>
            );
          })}
        </ol>
      </div>
      {gameModalOpened && !challengedModalOpened && (
        <GameModal
          closeModal={handleClick}
          opponent={selectedOpponent}
          message={opponentMessage}
        />
      )}
      {challengedModalOpened && !gameModalOpened && (
        <ChallengedModal
          closeModal={closeChallengerModal}
          challenge={incomingChallenge}
        />
      )}
    </div>
  );
};

export default Lobby;
