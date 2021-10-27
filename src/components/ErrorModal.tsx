import { LoadingSpinner } from '../utils/LoadingSpinner';
import './modal.scss';

interface IProps {
  error: string;
  setErrorModalDisplay: (error: string) => void;
}

export const ErrorModal: React.FC<IProps> = ({
  error,
  setErrorModalDisplay,
}) => {
  // Render the appropriate error message depending on the error

  let errorModalContent;
  if (error === 'connect-container-error') {
    errorModalContent = (
      <>
        Error connecting container. Please try again.
        <button onClick={() => setErrorModalDisplay('')}>Close</button>
      </>
    );
  } else if (error === 'disconnect-container-error') {
    errorModalContent = (
      <>
        Error disconnecting container. Please try again.
        <button onClick={() => setErrorModalDisplay('')}>Close</button>
      </>
    );
  } else if (error === 'create-network-error') {
    errorModalContent = (
      <>
        Error creating network. Please try again.
        <button onClick={() => setErrorModalDisplay('')}>Close</button>
      </>
    );
  } else if (error === 'remove-network-error') {
    errorModalContent = (
      <>
        Error deleting network. Please try again.
        <button onClick={() => setErrorModalDisplay('')}>Close</button>
      </>
    );
  } else if (error === 'get-running-containers-error') {
    errorModalContent = (
      <>
        Error getting running containers. Please try again.
        <button onClick={() => setErrorModalDisplay('')}>Close</button>
      </>
    );
  }
  return (
    <div className="modal-overlay">
      <div className="modal">
        <LoadingSpinner />
        {errorModalContent}
      </div>
    </div>
  );
};
