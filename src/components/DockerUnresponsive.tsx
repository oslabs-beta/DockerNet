import { LoadingSpinner } from '../utils/LoadingSpinner';
import './modal.scss';

export const DockerUnresponsive = () => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <LoadingSpinner />
        Unable to connect with Docker. Please make sure the Docker daemon is
        running.
      </div>
    </div>
  );
};
