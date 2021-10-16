import { formatDockerJSON } from '../server/helpers/formatDockerJSON';
import { formatRawContainers } from '../server/helpers/formatRawContainers';

describe('Format Docker JSON Unit Tests', () => {
  const fakeDockerJSON = `{"ports": "8080/tcp", "name": "thirsty_goldberg", "id": "4699f7630470"}
  {"ports": "8080/tcp", "name": "vigorous_blackburn", "id": "623d25672467"}
  {"ports": "8080/tcp", "name": "unruffled_lumiere", "id": "528f7309badd"}`;

  it('should return an array', () => {
    expect(formatDockerJSON(fakeDockerJSON)).toBeInstanceOf(Array);
  });

  it('should return an array of objects', () => {
    formatDockerJSON(fakeDockerJSON).forEach((obj) => {
      expect(typeof obj === 'object').toBe(true);
    });
  });

  it('should return an array of objects with properties "name," "id", and "ports"', () => {
    formatDockerJSON(fakeDockerJSON).forEach((obj) => {
      expect(obj).toHaveProperty('name');
      expect(obj).toHaveProperty('id');
      expect(obj).toHaveProperty('ports');
      // hello there
    });
  });
});

describe('Format raw containers unit tests', () => {
  const fakeRawContainers = {
    '4699f7630470cd267778b30331cc3987ce25f399cfc90657e39699cde169ad62': {
      Name: 'thirsty_goldberg',
      EndpointID:
        '18ea0319cd8dbb869d8172a145d205e2164bbba980277a48388842160a83d558',
      MacAddress: '02:42:ac:11:00:02',
      IPv4Address: '172.17.0.2/16',
      IPv6Address: '',
    },
    '528f7309badda9c4b89e4a0ed77328b1560c7010349cd3dcc5cfd8f5c86c8386': {
      Name: 'unruffled_lumiere',
      EndpointID:
        '8ca6a19b9d798038fc96d5cbf262bb5d550e1d1db74fbca0c7c1b36c31701905',
      MacAddress: '02:42:ac:11:00:03',
      IPv4Address: '172.17.0.3/16',
      IPv6Address: '',
    },
  };

  it('should return an array', () => {
    expect(formatRawContainers(fakeRawContainers)).toBeInstanceOf(Array);
  });

  it('should return an array of objects', () => {
    formatRawContainers(fakeRawContainers).forEach((obj) => {
      expect(typeof obj === 'object').toBe(true);
    });
  });

  it('should return an array of objects with properties "id," "name", and "ipAddress"', () => {
    formatRawContainers(fakeRawContainers).forEach((obj) => {
      expect(obj).toHaveProperty('name');
      expect(obj).toHaveProperty('id');
      expect(obj).toHaveProperty('ipAddress');
    });
  });

  it('should return objects with property id length of 12', () => {
    formatRawContainers(fakeRawContainers).forEach((obj) => {
      expect(obj.id.length).toEqual(12);
    });
  });
});
