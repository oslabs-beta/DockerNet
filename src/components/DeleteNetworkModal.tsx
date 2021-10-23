import './modal.scss';

interface IProps {
  toggleDeleteNetworkModal: () => void;
  networkToDelete: string;
  setNetworks: (networks: []) => void;
  networks: {
    driver: string;
    name: string;
    containers: [];
  }[];
}

export const DeleteNetworkModal: React.FC<IProps> = ({
  toggleDeleteNetworkModal,
  networkToDelete,
  setNetworks,
  networks,
}) => {
  const currNetwork = networks.find(
    (network) => network.name === networkToDelete
  );

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

  const numberOfContainers = currNetwork?.containers.length;

  if (numberOfContainers) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <div>
            {`${numberOfContainers} containers are currently connected to ${networkToDelete}. Please disconnect them before removing the network`}
          </div>
          <button className="modal-button" onClick={toggleDeleteNetworkModal}>
            Cancel
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <div>{`Are you sure you want to delete ${networkToDelete}?`}</div>
          <div className="modal-buttons">
            <button
              className="modal-button"
              onClick={() => deleteNetwork(networkToDelete)}
            >
              Delete Network
            </button>
            <button className="modal-button" onClick={toggleDeleteNetworkModal}>
              Cancel
            </button>
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
