import { Link } from 'react-router-dom';
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
      <Link key={index} to={`/networks/${network.name}`}>
        {network.name}
      </Link>
    );
  });

  return <div className="side-nav">{networkLinks}</div>;
};
