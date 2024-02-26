import { useContext } from "react";
import { LobbyService } from "../../services/LobbyService";
import "./ChallengedModal.scss";
import { AppContext } from "../../contexts/AppContext";

interface ChallengedModalProps {
  closeModal: () => void;
  challenge: any;
}

const ChallengedModal = ({
  closeModal,
  challenge,
}: ChallengedModalProps): JSX.Element => {
  const { user } = useContext(AppContext);

  const handleModalBackgroundClick = (e: React.MouseEvent) => {
    // Check if the click is outside the modal content
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleAccept = async () => {
    await LobbyService.challengeDecision(challenge.id, true);
    closeModal();
  };

  const handleDecline = async () => {
    await LobbyService.challengeDecision(challenge.id, false);
    closeModal();
  };

  return (
    <div className="challenged-background" onClick={handleModalBackgroundClick}>
      <div className="challenged-content">
        <div className="challenged-modal">
          <h2>You are challenged by {challenge.challenger}</h2>
          <div className="challenged-modal__container">
            <button
              className="challenged-modal__challange"
              onClick={handleAccept}
            >
              ACCEPT
            </button>
            <button
              className="challenged-modal__challange"
              onClick={handleDecline}
            >
              DECLINE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengedModal;
