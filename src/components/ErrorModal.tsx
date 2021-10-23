import { LoadingSpinner } from '../utils/LoadingSpinner';
import './modal.scss';

export const ErrorModal = () => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <LoadingSpinner />
        Unable to connect with the Docker daemon. Please make sure Docker is
        running.
      </div>
    </div>
  );
};
