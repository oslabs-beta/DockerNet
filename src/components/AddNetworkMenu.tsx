/* eslint-disable jsx-a11y/no-onchange */
import { useState } from 'react';
import './addNetworkMenu.scss';

interface IProps {
  setNetworks: (networks: []) => void;
  setErrorModalDisplay: (error: string) => void;
}

export const AddNetworkMenu: React.FC<IProps> = ({
  setNetworks,
  setErrorModalDisplay,
}) => {
  const [toggleAddModal, setToggleAddModal] = useState(false);

  const [networkNameInput, setNetworkNameInput] = useState('');

  const [driverTypeInput, setDriverTypeInput] = useState('');

  const toggleAddNetworkModalDisplay = () => {
    setToggleAddModal(!toggleAddModal);
  };

  const addNetwork = () => {
    // Prevent empty container names and names with spaces
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
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failure to create network');
        }
        return res.json();
      })
      .then((networks) => setNetworks(networks))
      .catch(() => {
        setErrorModalDisplay('create-network-error');
      });
  };

  if (toggleAddModal) {
    return (
      <div className="add-network-menu">
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
        <button className="add-network-button" onClick={addNetwork}>
          Add
        </button>
        <button
          className="add-network-button"
          onClick={toggleAddNetworkModalDisplay}
        >
          Cancel
        </button>
      </div>
    );
  } else {
    return (
      <button
        className="add-network-display-button"
        onClick={toggleAddNetworkModalDisplay}
      >
        Add Network
      </button>
    );
  }
};
