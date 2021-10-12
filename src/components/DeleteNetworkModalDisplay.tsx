// import { useRef } from 'react';
import { useEffect, useState } from 'react';
import './deleteNetworkModalDisplay.scss';

interface IProps {
  networks: {
    driver: string;
    name: string;
  }[];
  networkName: string;
}

interface IState {
  networkContainers: {
    id: string;
    name: string;
    ipAddress: string;
  }[];
  toggleModal: boolean;
}

export const DeleteNetworkModalDisplay: React.FC<IProps> = ({
  // networks,
  networkName,
}) => {
  // const numOfContainers = Object.keys({ networks }).length;

  const [toggleModal, setToggleModal] = useState<IState['toggleModal']>(false);

  const [networkContainers, setNetworkContainers] = useState<
    IState['networkContainers']
  >([]);

  // const currNetwork = networks.find((network) => network.name === networkName);

  const getContainersByCurrNetwork = (networkName: string) => {
    fetch(`/api/containers/by-network/?networkName=${networkName}`)
      .then((res) => res.json())
      .then((networkContainers) => setNetworkContainers(networkContainers));
  };

  useEffect(() => {
    getContainersByCurrNetwork(networkName);
  });

  const currContainers = Object.keys(networkContainers).length;

  const toggleDeleteNetworkModalDisplay = () => {
    setToggleModal(!toggleModal);
    // getContainersByCurrNetwork(networkName);
    // console.log(networkContainers);
    // getContainersByCurrNetwork(networkName);
  };

  // const networkToBeDeleted = useRef(null);

  // const setNetworkToBeDeleted = ({networks}) => {

  // }

  if (toggleModal === true && currContainers === 0) {
    return (
      <div className="deleteModalOverlay">
        <div className="deleteModalDisplay">
          <h1>
            {`Are you sure you want to delete this network: ${networkName}? There are currently` +
              /*` ${numOfContainers}`*/ ` ${currContainers} container(s) running.`}
          </h1>
          <div className="deleteModalButtons">
            <button
              onClick={() => {
                console.log('HELLO');
              }}
            >
              Yes
            </button>
            <button onClick={toggleDeleteNetworkModalDisplay}>No</button>
          </div>
        </div>
      </div>
    );
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
  } else {
    return (
      <div>
        <button onClick={toggleDeleteNetworkModalDisplay}>Trash</button>
      </div>
    );
  }
};
