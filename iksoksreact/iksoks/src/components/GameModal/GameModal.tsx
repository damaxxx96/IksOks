import { useContext } from "react";
import { LobbyService } from "../../services/LobbyService";
import "./GameModal.scss";
import { AppContext } from "../../contexts/AppContext";

interface GameModalProps {
  closeModal: (e: any) => void;
  opponent: string;
  message: string;
}

const GameModal = ({
  closeModal,
  opponent,
  message,
}: GameModalProps): JSX.Element => {
  const { user } = useContext(AppContext);

  const handleModalBackgroundClick = (e: React.MouseEvent) => {
    // Check if the click is outside the modal content
    if (e.target === e.currentTarget) {
      closeModal(e);
    }
  };

  const handleChallenge = async () => {
    await LobbyService.challenge(user, opponent);
  };

  return (
    <div className="modal-background" onClick={handleModalBackgroundClick}>
      <div className="modal-content">
        <div className="game-modal">
          <h2>
            {message} {opponent}
          </h2>
          <button className="game-modal__challange" onClick={handleChallenge}>
            CHALLENGE
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
