export const formatDockerJSON = (dockerJSON: string) => {
  const dockerObjects = dockerJSON
    .trim()
    .split('\n')
    .map((object) => {
      return JSON.parse(object);
    });

  return dockerObjects;
};
