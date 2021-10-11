import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
//array of network objects
interface IProps {
  networks: {
    driver: string;
    name: string;
  }[];
}

// array of container objects
interface IState {
  containers: {
    id: string;
    name: string;
    ipAddress: string;
  }[];
}

export const MainDisplay: React.FC<IProps> = ({ networks }) => {
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
    if (networkName === undefined) return;
    getContainersByNetwork(networkName);
  }, [networkName]);
  // console.log(networkName);

  const containerList = containers.map((container, index) => {
    return (
      <ul key={index}>
        <li>{`ID: ${container.id}`}</li>
        <li>{`Name: ${container.name}`}</li>
        <li>{`IP Address: ${container.ipAddress}`}</li>
      </ul>
    );
  });

  return (
    <div>
      {network ? network.driver : 'hello'}
      {containerList}
    </div>
  );
};