import { LoadingSpinner } from '../utils/LoadingSpinner';

export const ErrorModal = () => {
  return (
    <div className="deleteModalOverlay">
      <div className="deleteModalDisplay">
        <LoadingSpinner />
        Unable to connect with the Docker daemon. Please make sure Docker is
        running.
      </div>
    </div>
  );
};
