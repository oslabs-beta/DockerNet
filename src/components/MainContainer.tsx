import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { MainDisplay } from './MainDisplay';
import { SideNav } from './SideNav';
import './mainContainer.scss';
import { DefaultDisplay } from './DefaultDisplay';
import { Header } from './Header';
import { DeleteNetworkModal } from './DeleteNetworkModal';
import { ErrorModal } from './ErrorModal';

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
  const [errorModalDisplay, setErrorModalDisplay] = useState(false);
  const [networkToDelete, setNetworkToDelete] = useState<string>('');

  const getNetworks = () => {
    fetch('/api/networks')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Docker Unresponsive');
        }
        return res.json();
      })
      .then((networks) => {
        setErrorModalDisplay(false);
        setNetworks(networks);
      })
      .catch(() => {
        setErrorModalDisplay(true);
      });
  };

  const toggleDeleteNetworkModal = () => {
    setDeleteNetworkModalDislay(!deleteNetworkModalDisplay);
  };

  const setNetworkToBeDeleted = (networkName: string) => {
    setNetworkToDelete(networkName);
  };

  useEffect(() => {
    getNetworks();
    window.setInterval(() => {
      getNetworks();
    }, 3000);
  }, []);

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
            <MainDisplay networks={networks} setNetworks={setNetworks} />
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
            networks={networks}
          />
        ) : null}
        {errorModalDisplay ? <ErrorModal /> : null}
      </div>
    </div>
  );
};
