import { useParams, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './mainDisplay.scss';
import { ListDisplay } from './ListDisplay';
import { DataToolBar } from './DataToolBar';
import { GraphDisplay } from './GraphDisplay';

//array of network objects
interface IProps {
  networks: {
    driver: string;
    name: string;
  }[];
  // setNetwork: Function;
}

// array of container objects
interface IState {
  viewType: string;
  containers: {
    id: string;
    name: string;
    ipAddress: string;
  }[];
}

export const MainDisplay: React.FC<IProps> = ({ networks }) => {
  // Grab the current State of the Main Displau
  const [viewType, setViewType] = useState<IState['viewType']>('list');

  const [containers, setContainers] = useState<IState['containers']>([]);
  // Grab the name of the current network from URL parameters
  const { networkName } = useParams<{ networkName: string | undefined }>();
  // Grab the network object associated with that network name
  const network = networks.find((network) => network.name === networkName);
  // fetch to backend to retrieve array of container objects
  const getContainersByNetwork = (networkName: string) => {
    fetch(`/api/containers/by-network/?networkName=${networkName}`)
      .then((res) => res.json())
      .then((containers) => setContainers(containers));
  };

  // whenever the route changes, request fresh containers
  useEffect(() => {
    setContainers([]);
    if (networkName === undefined) return;
    getContainersByNetwork(networkName);
  }, [networkName]);

  // handles unkonwn network requests and redirects to homepage
  if (network === undefined) {
    return <Redirect to="/" />;
  }

  return (
    <div className="main-display">
      <div>{networkName}</div>
      <div>{`Driver: ${network.driver}`}</div>
      <DataToolBar viewType={viewType} setViewType={setViewType}></DataToolBar>

      {viewType == 'list' ? (
        <ListDisplay
          containers={containers}
          network={network}
          setContainers={setContainers}
        />
      ) : viewType == 'graph' ? (
        <GraphDisplay containers={containers} network={network} />
      ) : null}
      {/* {if (viewType === 'list') {<ListDisplay />} 
      elseif (viewType === 'graph') { <GraphDisplay />}  */}
      {/* elseif (viewType === 'cards') { <CardDisplay /> }} */}
    </div>
  );
};
