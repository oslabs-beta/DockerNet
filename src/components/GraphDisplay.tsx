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

export const GraphDisplay: React.FC<IProps> = ({ containers, network }) => {
  const createGraphData = (
    containers: { id: string; name: string; ipAddress: string }[],
    networkName: string
  ) => {
    const containerNodes = containers.map((container) => {
      return {
        id: container.name,
        type: 'container',
      };
    });

    const nodes = [{ id: networkName, type: 'network' }, ...containerNodes];
    const links = containers.map((container) => {
      return {
        source: networkName,
        target: container.name,
      };
    });

    return {
      nodes: nodes,
      links: links,
    };
  };

  const graphData = createGraphData(containers, network.name);

  return <div>HELLO FROM GRAPH</div>;
};
