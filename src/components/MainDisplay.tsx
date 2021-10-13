import { useParams, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './mainDisplay.scss';
import { ListDisplay } from './ListDisplay';
import { DataToolBar } from './DataToolBar';
import { GraphDisplay } from './GraphDisplay';
import { LoadingSpinner } from '../utils/LoadingSpinner';
import { ConnectContainerModal } from './ConnectContainerModal';

//array of network objects
interface IProps {
  networks: {
    driver: string;
    name: string;
  }[];
  toggleConnectContainerModal: (display: boolean) => void;
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
  const [fetching, setFetching] = useState<boolean>(true);
  const [connectContainerModalDisplay, setConnectContainerModalDisplay] =
    useState<boolean>(false);

  // Grab the current State of the Main Displau
  const [viewType, setViewType] = useState<IState['viewType']>('list');

  const [containers, setContainers] = useState<IState['containers']>([]);
  // Grab the name of the current network from URL parameters
  const { networkName } = useParams<{ networkName: string | undefined }>();
  // Grab the network object associated with that network name

  const network = networks.find((network) => network.name === networkName);
  // fetch to backend to retrieve array of container objects

  const toggleConnectContainerModal = () => {
    setConnectContainerModalDisplay(!connectContainerModalDisplay);
  };

  const getContainersByNetwork = (networkName: string) => {
    setFetching(true);
    fetch(`/api/containers/by-network/?networkName=${networkName}`)
      .then((res) => res.json())
      .then((containers) => {
        setContainers(containers);
        setFetching(false);
      });
  };

  // whenever the route changes, request fresh containers
  useEffect(() => {
    setContainers([]);
    if (networkName === undefined) return <Redirect to="/" />;
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
      <DataToolBar
        viewType={viewType}
        setViewType={setViewType}
        toggleConnectContainerModal={toggleConnectContainerModal}
      ></DataToolBar>

      {fetching ? (
        <LoadingSpinner />
      ) : viewType == 'list' ? (
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
      {connectContainerModalDisplay ? (
        <ConnectContainerModal
          networkName={networkName}
          toggleConnectContainerModal={toggleConnectContainerModal}
          setContainers={setContainers}
          containers={containers}
        />
      ) : null}
    </div>
  );
};
