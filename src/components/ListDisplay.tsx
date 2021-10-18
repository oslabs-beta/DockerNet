import './listDisplay.scss';

interface IProps {
  // viewType: 'list' | 'graph' | 'cards';
  containers: {
    id: string;
    name: string;
    ipAddress: string;
  }[];
  network?: {
    driver: string;
    name: string;
  };
}

export const ListDisplay: React.FC<IProps> = ({ containers, network }) => {
  // Grab the current State of the Main Displau

  const disconnectContainer = (networkName: string, containerName: string) => {
    fetch('/api/containers', {
      method: 'DELETE',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify({
        networkName: networkName,
        containerName: containerName,
      }),
    })
      .then((res) => res.json())
      .then((containers) => {
        console.log(containers);
      });
  };

  const containerList = containers.map((container) => {
    return (
      <>
        <div className="container-list-item">{`${container.name}`}</div>
        <div className="container-list-item">{`${container.id}`}</div>
        <div className="container-list-item">{`${container.ipAddress}`}</div>
        <button
          onClick={() => disconnectContainer(network.name, container.name)}
        >
          Disconnect
        </button>
      </>
    );
  });

  return (
    <>
      <div className="list-display">
        <div>Name</div>
        <div>ID</div>
        <div>IP Address</div>
        <div>Remove Container</div>
        {containerList}
      </div>
    </>
  );
};
