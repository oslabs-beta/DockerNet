import './app.css';
import IMAGE from './dog.png';

export const App = () => {
  const testExec = () => {
    fetch('/api')
      .then((res) => res.json())
      .then((stuff) => console.log(stuff));
  };

  return (
    <>
      <h1 className="test">Fullstack React Typescript</h1>
      <img src={IMAGE} alt="dog" />
      <button onClick={testExec}>Test Docker Terminal</button>
    </>
  );
};
