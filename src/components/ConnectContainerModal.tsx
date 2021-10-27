/* eslint-disable jsx-a11y/no-onchange */
import './modal.scss';
import { useState, useEffect } from 'react';

interface IProps {
  networkName: string | undefined;
  toggleConnectContainerModal: () => void;
  containers: {
    id: string;
    name: string;
    ipAddress: string;
  }[];
  setNetworks: (networks: []) => void;
  setErrorModalDisplay: (error: string) => void;
}

interface IState {
  runningContainers: {
    name: string;
  }[];
}

export const ConnectContainerModal: React.FC<IProps> = ({
  networkName,
  toggleConnectContainerModal,
  containers,
  setNetworks,
  setErrorModalDisplay,
}) => {
  // controlled component state for select input
  const [containerToConnectInput, setContainerToConnectInput] =
    useState<string>('');

  // for storing list of currently running containers
  // these are used to create options for conntect in select input
  const [runningContainers, setRunningContainers] = useState<
    IState['runningContainers']
  >([]);

  const connectContainer = (
    networkName: string | undefined,
    containerName: string
  ) => {
    if (!networkName || !containerName) return;
    fetch('/api/containers', {
      method: 'PUT',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify({
        networkName: networkName,
        containerName: containerName,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error connecting container');
        }
        return res.json();
      })
      .then((networks) => {
        toggleConnectContainerModal();
        setNetworks(networks);
      })
      .catch(() => {
        toggleConnectContainerModal();
        setErrorModalDisplay('connect-container-error');
      });
  };

  const getRunningContainers = () => {
    fetch('/api/containers')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failure to get running containers');
        }
        return res.json();
      })
      .then((containers) => {
        setRunningContainers(containers);
      })
      .catch(() => {
        toggleConnectContainerModal();
        setErrorModalDisplay('get-running-containers-error');
      });
  };

  const currentContainerNames = containers.map((container) => container.name);

  useEffect(() => {
    getRunningContainers();
  }, []);

  // filter out containers already connected to the network:
  // for preventing attempt to doubly connect a container
  const selectOptions = runningContainers.map((container) => {
    if (!currentContainerNames.includes(container.name)) {
      return (
        <option key={container.name} value={container.name}>
          {container.name}
        </option>
      );
    }
  });

  return (
    <div className="modal-overlay">
      <div className="modal">
        {`Choose a container to connect to ${networkName}`}
        <select
          className="modal-select"
          name="containerSelect"
          value={containerToConnectInput}
          onChange={(e) => setContainerToConnectInput(e.target.value)}
        >
          <option value="">Select Container</option>
          {selectOptions}
        </select>
        <button
          className="modal-button"
          onClick={() => connectContainer(networkName, containerToConnectInput)}
        >
          Connect
        </button>
        <button className="modal-button" onClick={toggleConnectContainerModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};
