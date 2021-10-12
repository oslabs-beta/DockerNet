import { useState } from 'react';
import './addNetworkModalDisplay.scss';

interface IProps {
  networks: {
    driver: string;
    name: string;
  }[];
  //   networkName: string;
}

export const AddNetworkModalDisplay: React.FC<IProps> = ({
  networks,
  //   networkName,
}) => {
  const [toggleAddModal, setToggleAddModal] = useState(false);

  const toggleAddNetworkModalDisplay = () => {
    setToggleAddModal(!toggleAddModal);
    console.log({ networks });
  };

  if (toggleAddModal === true) {
    return (
      <div>
        <div className="addModalDisplay">
          <h1>Add Network</h1>
          <input type="text" placeholder="Network Name"></input>
          <input type="text" placeholder="Driver Type"></input>
          <select name="driverType">
            <option value="bridge">Bridge</option>
            <option value="host">Host</option>
            <option value="none">None</option>
          </select>
          <button>Add</button>
          <button onClick={toggleAddNetworkModalDisplay}>Go Back</button>
        </div>
      </div>
    );
  } else {
    return <button onClick={toggleAddNetworkModalDisplay}>Add Network</button>;
  }
};
