import { Link } from 'react-router-dom';
import { DeleteNetworkModalDisplay } from './DeleteNetworkModalDisplay';
import '../app.css';

// array of network objects
interface IProps {
  networks: {
    driver: string;
    name: string;
  }[];
}

export const SideNav: React.FC<IProps> = ({ networks }) => {
  // create link components based on networks, each navigating the user to
  // a URL where the param is the name of the network
  const networkLinks = networks.map((network, index) => {
    return (
      <div key={index}>
        <Link to={`/networks/${network.name}`}>{network.name}</Link>
        <DeleteNetworkModalDisplay
          networks={networks}
          networkName={network.name}
        />
      </div>
    );
  });

  return <div className="side-nav">{networkLinks}</div>;
};
