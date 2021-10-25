import { Link } from 'react-router-dom';
import { AddNetworkMenu } from './AddNetworkMenu';
import './sideNav.scss';

// array of network objects
interface IProps {
  networks: {
    driver: string;
    name: string;
  }[];
  setNetworks: (networks: []) => void;
  toggleDeleteNetworkModal: () => void;
  setNetworkToBeDeleted: (networkName: string) => void;
}

export const SideNav: React.FC<IProps> = ({
  networks,
  setNetworks,
  toggleDeleteNetworkModal,
  setNetworkToBeDeleted,
}) => {
  // create link components based on networks, each navigating the user to
  // a URL where the param is the name of the network
  // const [sideNavOpen, setSideNavOpen] = useState<boolean>(true);

  const networkLinks = networks.map((network) => {
    if (
      network.name !== 'bridge' &&
      network.name !== 'none' &&
      network.name !== 'host'
    ) {
      return (
        <div className="network-display" key={network.name}>
          <Link className="network-link" to={`/networks/${network.name}`}>
            {network.name}
          </Link>
          <button
            className="delete-network-button"
            onClick={() => {
              setNetworkToBeDeleted(network.name);
              toggleDeleteNetworkModal();
            }}
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      );
    } else {
      return (
        <div className="network-display" key={network.name}>
          <Link className="network-link" to={`/networks/${network.name}`}>
            {network.name}
          </Link>
        </div>
      );
    }
  });

  return (
    <div className="side-nav">
      <div className="networkLinkContainer">{networkLinks}</div>
      <AddNetworkMenu setNetworks={setNetworks} />
    </div>
  );
};
