import { formatRawContainers } from './formatRawContainers';

type network = {
  Name: string;
  Driver: string;
  Containers: RawContainers;
};

type RawContainers = {
  [key: string]: {
    Name: string;
    EndpointID: string;
    MacAddress: string;
    IPv4Address: string;
    IPv6Address: string;
  };
};

export const formatNetworksAndContainers = (networks: network[]) => {
  return networks
    .map((network) => {
      return {
        name: network.Name,
        driver: network.Driver,
        containers: formatRawContainers(network.Containers),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};
