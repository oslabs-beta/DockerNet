interface IProps {
  setViewType: (view: string) => void;
  containers?: {
    id: string;
    name: string;
    ipAddress: string;
  }[];
  toggleConnectContainerModal: () => void;
}

// contains toggle between different view modes
// contains add/delete node to network??
// contains network name?
export const DataToolBar: React.FC<IProps> = ({
  setViewType,
  toggleConnectContainerModal,
}) => {
  // Grab the current State of the Main Display

  return (
    <div className="viewType">
      <button className="viewToggleButton" onClick={() => setViewType('list')}>
        List{' '}
      </button>
      <button className="viewToggleButton" onClick={() => setViewType('graph')}>
        Graph{' '}
      </button>
      <button onClick={toggleConnectContainerModal}>Connect Container</button>
      {/* <button className="viewToggleButton" onClick={() => setViewType('cards')}>Card </button> */}
    </div>
  );
};
