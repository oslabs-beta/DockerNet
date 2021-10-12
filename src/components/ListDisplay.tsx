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

  const containerList = containers.map((container, index) => {
    return (
      <ul key={index}>
        <li>{`ID: ${container.id}`}</li>
        <li>{`Name: ${container.name}`}</li>
        <li>{`IP Address: ${container.ipAddress}`}</li>
      </ul>
    );
  });

  return (
    <div className="list-display">
      {/* <div> View Type </div>
      <div> List | Graph | Card </div> */}
      {network.driver}
      {containerList}
    </div>
  );
};
