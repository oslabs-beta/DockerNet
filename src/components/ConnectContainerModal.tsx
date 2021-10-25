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
}) => {
  const [containerToConnectInput, setContainerToConnectInput] =
    useState<string>('');
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
      .then((res) => res.json())
      .then((networks) => {
        toggleConnectContainerModal();
        setNetworks(networks);
      });
  };

  const getRunningContainers = () => {
    fetch('/api/containers')
      .then((res) => res.json())
      .then((containers) => {
        setRunningContainers(containers);
      });
  };

  const currentContainerNames = containers.map((container) => container.name);

  useEffect(() => {
    getRunningContainers();
  }, []);

  // filter out containers already connected to the network
  // the user is navigated to
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
