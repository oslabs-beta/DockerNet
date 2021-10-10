export const formatDockerJSON = (dockerJSON: string) => {
  // docker JSON often not separated by commas
  // here we format a string list of objects separated by
  // line breaks into a normal array of objects
  const dockerObjects = dockerJSON
    .trim()
    .split('\n')
    .map((object) => {
      return JSON.parse(object);
    });

  return dockerObjects;
};
