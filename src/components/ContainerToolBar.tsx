import './containerToolBar.scss';

interface IProps {
  setViewType: (view: string) => void;
  toggleConnectContainerModal: () => void;
  network: {
    name: string;
    driver: string;
  };
}

export const ContainerToolBar: React.FC<IProps> = ({
  setViewType,
  toggleConnectContainerModal,
  network,
}) => {
  return (
    <div className="container-tool-bar">
      <div className="network-info">
        <div className="network-name">{network.name}</div>
        <div className="driver">Driver: {network.driver}</div>
      </div>
      {/* For toggling between list and graph view of containers */}
      <div className="tool-bar-buttons">
        <div className="view-buttons">
          <button
            className="viewToggleButton"
            onClick={() => setViewType('list')}
          >
            List{' '}
          </button>
          <button
            className="viewToggleButton"
            onClick={() => setViewType('graph')}
          >
            Graph{' '}
          </button>
        </div>
        {/* Opens the modal for connecting a container to the current network */}
        <button
          className="connect-container-display-button"
          onClick={toggleConnectContainerModal}
        >
          Connect Container
        </button>
      </div>
    </div>
  );
};
