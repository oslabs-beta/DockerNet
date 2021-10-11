import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { MainDisplay } from './MainDisplay';
import { SideNav } from './SideNav';
import '../app.css';
import { DefaultDisplay } from './DefaultDisplay';

// array of network objects
interface IState {
  networks: {
    driver: string;
    name: string;
  }[];
}

export const MainContainer = () => {
  const [networks, setNetworks] = useState<IState['networks']>([]);

  const getNetworks = () => {
    fetch('/api/networks')
      .then((res) => res.json())
      .then((networks) => {
        setNetworks(networks);
      });
  };

  // const testGetContainersByNetwork = () => {
  //   fetch('api/containers/by-network/?networkName=bridge')
  //     .then((res) => res.json())
  //     .then((containers) => console.log(containers));
  // };

  // get new networks on mount
  useEffect(() => {
    getNetworks();
  }, []);

  // console.log(networks);
  return (
    <div className="main-container">
      <h1 className="header">Fullstack React Typescript</h1>
      <SideNav networks={networks} />
      {/* URL param variable set to networkName */}
      <Switch>
        <Route exact path="/networks/:networkName">
          <MainDisplay networks={networks} />
        </Route>
        <Route exact path="/">
          <DefaultDisplay></DefaultDisplay>
        </Route>
      </Switch>
    </div>
  );
};
