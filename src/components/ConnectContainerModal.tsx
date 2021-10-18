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
  const selectOptions = networks.reduce((acc, network) => {
    network.containers.forEach((container: any) => {
      if (!currentContainerNames.includes(container.name)) {
        acc.push(
          <option key={uniqid()} value={container.name}>
            {container.name}{' '}
          </option>
        );
      }
    });
    return acc;
  }, [] as JSX.Element[]);

  console.log(selectOptions);

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

// networks.reduce((acc, network) => {
//   network.containers.forEach((container, index) => {
//     if (!currentContainerNames.includes(container['name'])) {
//       acc.push(
//         <option key={index} value={container['name']}>
//           {container['name']}
//         </option>
//       );
//     }
//   });
// }, []);

// const selectOptions = runningContainers.map((container, index) => {
//   if (!currentContainerNames.includes(container.name))
//     return (
//       <option key={index} value={container.name}>
//         {container.name}
//       </option>
//     );
// });
