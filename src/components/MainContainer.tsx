import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { MainDisplay } from './MainDisplay';
import { SideNav } from './SideNav';
import './mainContainer.scss';
import { DefaultDisplay } from './DefaultDisplay';
import { Header } from './Header';
import { DeleteNetworkModal } from './DeleteNetworkModal';

// array of network objects
interface IState {
  networks: {
    driver: string;
    name: string;
    containers: [];
  }[];
}

export const MainContainer = () => {
  const [networks, setNetworks] = useState<IState['networks']>([]);
  const [deleteNetworkModalDisplay, setDeleteNetworkModalDislay] =
    useState<boolean>(false);
  const [networkToDelete, setNetworkToDelete] = useState<string>('');

  const getNetworks = () => {
    fetch('/api/networks')
      .then((res) => res.json())
      .then((networks) => {
        setNetworks(networks);
      });
  };

  const toggleDeleteNetworkModal = () => {
    setDeleteNetworkModalDislay(!deleteNetworkModalDisplay);
  };

  const setNetworkToBeDeleted = (networkName: string) => {
    setNetworkToDelete(networkName);
  };

  // get new networks on mount
  useEffect(() => {
    getNetworks();
  }, []);

  // console.log(networks);
  return (
    <div>
      <Header />
      <div className="main-container">
        <SideNav
          setNetworks={setNetworks}
          networks={networks}
          toggleDeleteNetworkModal={toggleDeleteNetworkModal}
          setNetworkToBeDeleted={setNetworkToBeDeleted}
        />
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
        {deleteNetworkModalDisplay ? (
          <DeleteNetworkModal
            toggleDeleteNetworkModal={toggleDeleteNetworkModal}
            networkToDelete={networkToDelete}
            setNetworks={setNetworks}
          />
        ) : null}
      </div>
    </div>
  );
};
