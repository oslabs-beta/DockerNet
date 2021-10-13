// import { useRef } from 'react';
import { useEffect, useState } from 'react';
import './deleteNetworkModalDisplay.scss';

interface IProps {
  // networks: {
  //   driver: string;
  //   name: string;
  // }[];
  // networkName: string;
  toggleDeleteNetworkModal: () => void;
  networkToDelete: string;
  setNetworks: (networks: []) => void;
}

interface IState {
  networkContainers: {
    id: string;
    name: string;
    ipAddress: string;
  }[];
  toggleModal: boolean;
}

export const DeleteNetworkModal: React.FC<IProps> = ({
  toggleDeleteNetworkModal,
  networkToDelete,
  setNetworks,
}) => {
  const [networkContainers, setNetworkContainers] = useState<
    IState['networkContainers']
  >([]);

  // const currNetwork = networks.find((network) => network.name === networkName);

  const getContainersByCurrNetwork = (networkName: string) => {
    fetch(`/api/containers/by-network/?networkName=${networkName}`)
      .then((res) => res.json())
      .then((networkContainers) => setNetworkContainers(networkContainers));
  };

  const deleteNetwork = (networkName: string) => {
    fetch(`/api/networks/?networkName=${networkName}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((networks) => {
        setNetworks(networks);
        toggleDeleteNetworkModal();
      });
  };

  useEffect(() => {
    getContainersByCurrNetwork(networkToDelete);
  }, [networkToDelete]);

  const numberOfContainers = networkContainers.length;
  console.log(numberOfContainers);

  if (networkContainers.length) {
    return (
      <div className="deleteModalOverlay">
        <div className="deleteModalDisplay">
          <div>
            {`${numberOfContainers} containers are currently connected to ${networkToDelete}. Please disconnect them before removing the network`}
          </div>
          <div className="deleteModalButtons">
            <button onClick={toggleDeleteNetworkModal}>Cancel</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="deleteModalOverlay">
        <div className="deleteModalDisplay">
          <div>{`Are you sure you want to delete ${networkToDelete}?`}</div>
          <div className="deleteModalButtons">
            <button onClick={() => deleteNetwork(networkToDelete)}>
              Delete Network
            </button>
            <button onClick={toggleDeleteNetworkModal}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
};

// } else if (toggleModal === true && currContainers === 0) {
//   console.log('hello');
// }
// if (currContainers === 0) {
//   return (
//     <div className="deleteModalOverlay">
//       <div className="deleteModalDisplay">
//         <h1>{`Cannot delete Network when there are containers running`}</h1>
//         <div className="deleteModalButtons">
//           <button
//             onClick={() => {
//               console.log('HELLO');
//             }}
//           >
//             Yes
//           </button>
//           <button onClick={toggleDeleteNetworkModalDisplay}>No</button>
//         </div>
//       </div>
//     </div>
//   );
// }
