/* eslint-disable jsx-a11y/no-onchange */
import { useState } from 'react';
import './addNetworkMenu.scss';

interface IProps {
  setNetworks: (networks: []) => void;
}

export const AddNetworkMenu: React.FC<IProps> = ({ setNetworks }) => {
  const [toggleAddModal, setToggleAddModal] = useState(false);

  const [networkNameInput, setNetworkNameInput] = useState('');

  const [driverTypeInput, setDriverTypeInput] = useState('');

  const toggleAddNetworkModalDisplay = () => {
    setToggleAddModal(!toggleAddModal);
    //console.log({ networks });
  };

  const addNetwork = () => {
    if (!networkNameInput || networkNameInput.includes(' ') || !driverTypeInput)
      return;

    fetch('/api/networks', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify({
        networkName: networkNameInput,
        driver: driverTypeInput,
      }),
    })
      .then((res) => res.json())
      .then((networks) => setNetworks(networks));
  };

  if (toggleAddModal === true) {
    return (
      <div>
        <div className="addModalDisplay">
          <h1>Add Network</h1>
          <input
            type="text"
            value={networkNameInput}
            placeholder="Network Name"
            onChange={(e) => setNetworkNameInput(e.target.value)}
          ></input>
          <select
            name="driverType"
            placeholder="Driver Type"
            value={driverTypeInput}
            onChange={(e) => setDriverTypeInput(e.target.value)}
          >
            <option value="null">Select Driver Type</option>
            <option value="bridge">Bridge</option>
            <option value="host">Host</option>
            <option value="none">None</option>
          </select>
          <button onClick={addNetwork}>Add</button>
          <button onClick={toggleAddNetworkModalDisplay}>Cancel</button>
        </div>
      </div>
    );
  } else {
    return (
      <button
        className="addNetworkButton"
        onClick={toggleAddNetworkModalDisplay}
      >
        Add Network
      </button>
    );
  }
};
