import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { MainDisplay } from './MainDisplay';
import { SideNav } from './SideNav';
import './mainContainer.scss';
import { DefaultDisplay } from './DefaultDisplay';
import { Header } from './Header';
import { AddNetworkModalDisplay } from './AddNetworkModalDisplay';

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
    <div>
      <Header />
      <div className="main-container">
        <SideNav networks={networks} />
        {/* URL param variable set to networkName */}
        <Switch>
          {/* network specific routes */}
          <Route exact path="/networks/:networkName">
            <MainDisplay networks={networks} />
          </Route>
          {/* default route */}
          <Route exact path="/">
            <DefaultDisplay></DefaultDisplay>
          </Route>
        </Switch>
        {/* Add Network Modal */}
        <AddNetworkModalDisplay networks={networks} />
      </div>
    </div>
  );
};
