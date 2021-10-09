import './app.css';
import IMAGE from './dog.png';

export const App = () => {
  const testGetNetworks = () => {
    fetch('/api/networks')
      .then((res) => res.json())
      .then((stuff) => console.log(stuff));
  };

  const testGetContainersByNetwork = () => {
    fetch('api/containers/by-network/?networkName=bridge')
      .then((res) => res.json())
      .then((containers) => console.log(containers));
  };

  return (
    <>
      <h1 className="test">Fullstack React Typescript</h1>
      <img src={IMAGE} alt="dog" />
      <button onClick={testGetNetworks}>Test Get Networks</button>
      <button onClick={testGetContainersByNetwork}>Test Get Containers</button>
    </>
  );
};
