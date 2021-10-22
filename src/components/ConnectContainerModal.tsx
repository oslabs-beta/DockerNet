/* eslint-disable jsx-a11y/no-onchange */
import './modalDisplay.scss';
import { useState } from 'react';
import uniqid from 'uniqid';

interface IProps {
  networkName: string | undefined;
  toggleConnectContainerModal: () => void;
  containers: {
    id: string;
    name: string;
    ipAddress: string;
  }[];
  networks: {
    driver: string;
    name: string;
    containers: [];
  }[];
  setNetworks: (networks: []) => void;
}

type Cache = {
  [key: string]: boolean;
};

type Container = {
  [key: string]: string;
};

export const ConnectContainerModal: React.FC<IProps> = ({
  networkName,
  toggleConnectContainerModal,
  containers,
  networks,
  setNetworks,
}) => {
  const [containerToConnectInput, setContainerToConnectInput] =
    useState<string>('');

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
      .then((networks) => {
        toggleConnectContainerModal();
        setNetworks(networks);
      });
  };

  const currentContainerNames = containers.map((container) => container.name);
  // filter out containers already connected to the network the user is currently viewing
  const containerCache: Cache = {};
  const selectOptions = networks.reduce((acc, network) => {
    network.containers.forEach((container: Container) => {
      if (
        !currentContainerNames.includes(container.name) &&
        !containerCache.hasOwnProperty(container.name)
      ) {
        containerCache[container.name] = true;
        acc.push(
          <option key={uniqid()} value={container.name}>
            {container.name}{' '}
          </option>
        );
      }
    });
    return acc;
  }, [] as JSX.Element[]);

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
