import { Nest } from '../utils/Nest';
import './home.scss';

export const Home = () => {
  return (
    <div className="home">
      <div className="welcome">
        {/* home page animation */}
        <Nest
          depth={6}
          size={20}
          speed={60}
          scale={0.8}
          radius={30}
          squat={1}
          animation={'spin'}
        />
        <div className="title">
          <div>DockerNet.io</div>
          <p>On the left, click on a network to view connected containers.</p>
        </div>
      </div>
    </div>
  );
};
