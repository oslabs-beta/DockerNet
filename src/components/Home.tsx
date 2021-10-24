import { Nest } from '../utils/Nest';
import './home.scss';

export const Home = () => {
  return (
    <div className="home">
      <Nest
        depth={10}
        size={20}
        speed={60}
        scale={0.8}
        radius={0}
        squat={1}
        animation={'spin'}
      />
      <p>DockerNet.io</p>
    </div>
  );
};
