// import { useRef } from 'react';
import { useState } from 'react';
import './deleteNetworkModalDisplay.scss';

interface IProps {
  networks: {
    driver: string;
    name: string;
  }[];
  networkName: string;
}

export const DeleteNetworkModalDisplay: React.FC<IProps> = ({
  networks,
  networkName,
}) => {
  const numOfContainers = Object.keys({ networks }).length;

  const [toggleModal, setToggleModal] = useState(false);

  const toggleDeleteNetworkModalDisplay = () => {
    setToggleModal(!toggleModal);
    // console.log({ networkName });
    // console.log({ numOfContainers });
    console.log({ networks });
    // console.log({ containers });
  };

  // const networkToBeDeleted = useRef(null);

  // const setNetworkToBeDeleted = ({networks}) => {

  // }

  if (toggleModal === true) {
    return (
      <div className="deleteModalOverlay">
        <div className="deleteModalDisplay">
          <h1>
            {`Are you sure you want to delete this network: ${networkName}? There are currently ${numOfContainers} container(s) running.`}
          </h1>
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
    );
  } else {
    return (
      <div>
        <button onClick={toggleDeleteNetworkModalDisplay}>Trash</button>
      </div>
    );
  }
};
