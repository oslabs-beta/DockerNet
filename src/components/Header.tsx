import './header.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/ship-wheel.png';
interface IProps {
  toggleSideNav: () => void;
}

export const Header: React.FC<IProps> = ({ toggleSideNav }) => {
  return (
    <div className="header">
      <button onClick={toggleSideNav} className="header-button">
        <div className="menuIcon" id="bar1"></div>
        <div className="menuIcon" id="bar2"></div>
        <div className="menuIcon" id="bar3"></div>
      </button>
      <Link className="homepage-link" to={`/`}>
        <div className="header-title">
          <img alt="anchor-logo" className="header-logo" src={logo}></img>
          <div>DockerNet</div>
        </div>
      </Link>
    </div>
  );
};
