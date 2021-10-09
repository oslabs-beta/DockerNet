import { Link } from 'react-router-dom';
import './sidenav.css';

interface IProps {
  networks: {
    driver: string;
    name: string;
  }[];
}

export const SideNav: React.FC<IProps> = ({ networks }) => {
  const networkLinks = networks.map((network, index) => {
    return (
      <Link key={index} to={`/networks/${network.name}`}>
        {network.name}
      </Link>
    );
  });

  return <div className="side-nav">{networkLinks}</div>;
};
