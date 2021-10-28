type RawContainers = {
  [key: string]: {
    Name: string;
    EndpointID: string;
    MacAddress: string;
    IPv4Address: string;
    IPv6Address: string;
  };
};

export const formatRawContainers = (rawContainers: RawContainers) => {
  return Object.keys(rawContainers).map((containerId) => {
    return {
      id: containerId.slice(0, 12),
      name: rawContainers[containerId].Name,
      ipAddress: rawContainers[containerId].IPv6Address
        ? rawContainers[containerId].IPv6Address
        : rawContainers[containerId].IPv4Address,
    };
  });
};
