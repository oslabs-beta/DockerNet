import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { MainDisplay } from './MainDisplay';
import { SideNav } from './SideNav';
import './mainContainer.scss';
import { Home } from './Home';
import { Header } from './Header';
import { DeleteNetworkModal } from './DeleteNetworkModal';
import { ErrorModal } from './ErrorModal';
import { DockerUnresponsive } from './DockerUnresponsive';

// array of network objects
interface IState {
  networks: {
    driver: string;
    name: string;
    containers: [];
  }[];
}

export const MainContainer = () => {
  // contains array of network objects, each with an array of connected containers
  const [networks, setNetworks] = useState<IState['networks']>([]);

  const [deleteNetworkModalDisplay, setDeleteNetworkModalDislay] =
    useState<boolean>(false);

  // For toggling of modal containing all error messages when docker is responsive
  const [errorModalDisplay, setErrorModalDisplay] = useState<string>('');

  // For toggling modal handling error messages when docker is unresponsive
  const [dockerUnresponsiveModalDisplay, setDockerUnresponsiveModalDisplay] =
    useState<boolean>(false);

  // Keep track of network user has chosen to delete, provided to DeleteNetworkModal
  const [networkToDelete, setNetworkToDelete] = useState<string>('');

  const [sideNavDisplay, setSideNavDisplay] = useState<boolean>(true);

  const toggleSideNav = () => {
    setSideNavDisplay(!sideNavDisplay);
  };

  const getCache = (name: string) => {
    const result = document.cookie.match(
      '(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)'
    );
    return result ? result.pop() : '';
  };

  const deleteCache = (name: string, path: string, domain: string) => {
    if (getCache(name)) {
      document.cookie =
        name +
        '=' +
        (path ? ';path=' + path : '') +
        (domain ? ';domain=' + domain : '') +
        ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
    }
  };

  const getNetworks = () => {
    fetch('/api/networks')
      .then((res) => {
        // Fetch API does not catch 400 status codes
        if (!res.ok) {
          throw new Error('Docker Unresponsive');
        }
        return res.json();
      })
      .then((networks) => {
        setDockerUnresponsiveModalDisplay(false);
        // cache network data in cookie
        // only re-render when data is fresh
        const networkCache = JSON.stringify(networks);
        if (networkCache !== getCache('networkCache')) {
          document.cookie = 'networkCache=' + networkCache;
          setNetworks(networks);
        }
      })
      .catch(() => {
        // Open error modal if docker unresponsive
        setDockerUnresponsiveModalDisplay(true);
      });
  };

  const toggleDeleteNetworkModal = () => {
    setDeleteNetworkModalDislay(!deleteNetworkModalDisplay);
  };

  const setNetworkToBeDeleted = (networkName: string) => {
    setNetworkToDelete(networkName);
  };

  useEffect(() => {
    // delete cache if it exists on mount
    deleteCache('networkCache', '/', 'localhost');
    deleteCache('networkCache', '/networks', 'localhost');
    getNetworks();
    // Poll docker for updates to networks/containers
    window.setInterval(() => {
      getNetworks();
    }, 3000);
  }, []);

  return (
    <div className="main-wrapper">
      <Header toggleSideNav={toggleSideNav} />
      <div className={`main-container ${sideNavDisplay ? '' : 'no-sidenav'}`}>
        {sideNavDisplay ? (
          <SideNav
            setNetworks={setNetworks}
            networks={networks}
            toggleDeleteNetworkModal={toggleDeleteNetworkModal}
            setNetworkToBeDeleted={setNetworkToBeDeleted}
            setErrorModalDisplay={setErrorModalDisplay}
          />
        ) : null}

        {/* URL param variable set to networkName */}
        <Switch>
          {/* network specific routes */}
          <Route exact path="/networks/:networkName">
            <MainDisplay
              networks={networks}
              setNetworks={setNetworks}
              setErrorModalDisplay={setErrorModalDisplay}
            />
          </Route>
          {/* default route */}
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
        {deleteNetworkModalDisplay ? (
          <DeleteNetworkModal
            toggleDeleteNetworkModal={toggleDeleteNetworkModal}
            networkToDelete={networkToDelete}
            setNetworks={setNetworks}
            networks={networks}
            setErrorModalDisplay={setErrorModalDisplay}
          />
        ) : null}
        {errorModalDisplay ? (
          <ErrorModal
            setErrorModalDisplay={setErrorModalDisplay}
            error={errorModalDisplay}
          />
        ) : null}
        {dockerUnresponsiveModalDisplay ? <DockerUnresponsive /> : null}
      </div>
    </div>
  );
};
