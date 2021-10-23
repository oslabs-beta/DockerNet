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
      <div className="tool-bar-buttons">
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
        <button onClick={toggleConnectContainerModal}>Connect Container</button>
      </div>
    </div>
  );
};
