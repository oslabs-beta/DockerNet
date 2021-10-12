import React, { useState, useEffect } from 'react';
import { Route } from 'react-router';
// import IMAGE from '../dog.png';
import { MainDisplay } from './MainDisplay';
import { SideNav } from './SideNav';

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

  console.log(networks);
  return (
    <div>
      <h1 className="test">Fullstack React Typescript</h1>
      {/* <img src={IMAGE} alt="dog" /> */}
      <SideNav networks={networks} />
      {/* URL param variable set to networkName */}
      <Route exact path="/networks/:networkName">
        <MainDisplay networks={networks} />
      </Route>
    </div>
  );
};
