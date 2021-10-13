/* eslint-disable jsx-a11y/no-onchange */
import './modalDisplay.scss';
import { useState, useEffect } from 'react';
import { LoadingSpinner } from '../utils/LoadingSpinner';

interface IState {
  networkContainers: {
    id: string;
    name: string;
    ipAddress: string;
  }[];
}

interface IProps {
  networkName: string | undefined;
  toggleConnectContainerModal: () => void;
  setContainers: (containers: []) => void;
  containers: {
    id: string;
    name: string;
    ipAddress: string;
  }[];
}

export const ConnectContainerModal: React.FC<IProps> = ({
  networkName,
  toggleConnectContainerModal,
  setContainers,
  containers,
}) => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [runningContainers, setRunningContainers] = useState<
    IState['networkContainers']
  >([]);
  const [containerToConnectInput, setContainerToConnectInput] =
    useState<string>('');

  const getRunningContainers = () => {
    setFetching(true);
    fetch(`/api/containers/`)
      .then((res) => res.json())
      .then((runningContainers) => {
        setRunningContainers(runningContainers);
        setFetching(false);
      });
  };

  const connectContainer = (
    networkName: string | undefined,
    containerName: string
  ) => {
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
        toggleConnectContainerModal();
        setContainers(containers);
      });
  };

  useEffect(() => {
    getRunningContainers();
  }, []);

  const currentContainerNames = containers.map((container) => container.name);
  // filter out containers already connected to the network the user is currently viewing
  const selectOptions = runningContainers.map((container, index) => {
    if (!currentContainerNames.includes(container.name))
      return (
        <option key={index} value={container.name}>
          {container.name}
        </option>
      );
  });

  console.log(containerToConnectInput);

  if (fetching) {
    return (
      <div className="deleteModalOverlay">
        <div className="deleteModalDisplay">
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  return (
    <div className="deleteModalOverlay">
      <div className="deleteModalDisplay">
        {`Choose a container to connect to ${networkName}`}
        <select
          name="containerSelect"
          value={containerToConnectInput}
          onChange={(e) => setContainerToConnectInput(e.target.value)}
        >
          <option value="">Select Container</option>
          {selectOptions}
        </select>
        <button
          onClick={() => connectContainer(networkName, containerToConnectInput)}
        >
          Connect Container
        </button>
        <button onClick={toggleConnectContainerModal}>Cancel</button>
      </div>
    </div>
  );
};
