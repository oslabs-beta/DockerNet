import './modalDisplay.scss';
import { useState } from 'react';

interface IState {
  networkContainers: {
    id: string;
    name: string;
    ipAddress: string;
  }[];
}

interface IProps {
  networkName: string | undefined;
  toggleConnectContainerModal: (display: boolean) => void;
  setContainers: (containers: []) => void;
}

export const ConnectContainerModal: React.FC<IProps> = ({
  networkName,
  toggleConnectContainerModal,
  setContainers,
}) => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [runningContainers, setRunningContainers] = useState<
    IState['networkContainers']
  >([]);
  const [containerToConnect, setContainerToConnect] = useState<string>('');

  const getRunningContainers = () => {
    setFetching(true);
    fetch(`/api/containers/`)
      .then((res) => res.json())
      .then((runningContainers) => {
        setRunningContainers(runningContainers);
        setFetching(false);
      });
  };

  const connectContainer = (networkName: string, containerName: string) => {
    fetch('/api/containers', {
      method: 'PUT',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify({
        networkName: networkName,
        containerName: containerName,
      }),
    })
      .then((res) => res.json())
      .then((containers) => {
        setContainers(containers);
      });
  };

  return (
    <div className="deleteModalOverlay">
      <div className="deleteModalDisplay">
        {networkName}
        <button onClick={toggleConnectContainerModal}>Cancel</button>
      </div>
    </div>
  );
};
