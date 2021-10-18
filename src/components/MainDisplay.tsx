import { useParams, Redirect } from 'react-router-dom';
import { useState } from 'react';
import './mainDisplay.scss';
import { ListDisplay } from './ListDisplay';
import { DataToolBar } from './DataToolBar';
import { GraphDisplay } from './GraphDisplay';
import { ConnectContainerModal } from './ConnectContainerModal';

//array of network objects
interface IProps {
  networks: {
    driver: string;
    name: string;
    containers: [];
  }[];
}

// array of container objects
interface IState {
  viewType: string;
}

export const MainDisplay: React.FC<IProps> = ({ networks }) => {
  const [connectContainerModalDisplay, setConnectContainerModalDisplay] =
    useState<boolean>(false);

  const [viewType, setViewType] = useState<IState['viewType']>('list');

  // Grab the name of the current network from URL parameters
  const { networkName } = useParams<{ networkName: string | undefined }>();
  // Grab the network object associated with that network name

  const network = networks.find((network) => network.name === networkName);

  if (network === undefined) {
    return <Redirect to="/" />;
  }
  const containers = network.containers;

  const toggleConnectContainerModal = () => {
    setConnectContainerModalDisplay(!connectContainerModalDisplay);
  };

  return (
    <div className="main-display">
      <div>{networkName}</div>
      <div>{`Driver: ${network.driver}`}</div>
      <DataToolBar
        setViewType={setViewType}
        toggleConnectContainerModal={toggleConnectContainerModal}
      />

      {viewType == 'list' ? (
        <ListDisplay containers={containers} network={network} />
      ) : viewType == 'graph' ? (
        <GraphDisplay containers={containers} network={network} />
      ) : null}
      {connectContainerModalDisplay ? (
        <ConnectContainerModal
          networkName={networkName}
          toggleConnectContainerModal={toggleConnectContainerModal}
          containers={containers}
          networks={networks}
        />
      ) : null}
    </div>
  );
};
