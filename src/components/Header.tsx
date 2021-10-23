import './header.scss';

interface IProps {
  toggleSideNav: () => void;
}

export const Header: React.FC<IProps> = ({ toggleSideNav }) => {
  // Add Header to be updated later.  Needs to include expand nav bar button

  return (
    <div className="header">
      <button onClick={toggleSideNav} className="header-button">
        <div className="menuIcon" id="bar1"></div>
        <div className="menuIcon" id="bar2"></div>
        <div className="menuIcon" id="bar3"></div>
      </button>
      <div className="header-title">
        <img
          alt="anchor-logo"
          className="header-logo"
          src="https://pngimg.com/uploads/anchor/anchor_PNG11.png"
        ></img>
        <div>DockerNet</div>
      </div>
    </div>
  );
};
