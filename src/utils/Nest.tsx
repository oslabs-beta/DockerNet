import './nest.scss';

interface IProps {
  depth: number;
  size: number;
  speed: number;
  scale: number;
  squat: number;
  radius: number;
  animation: string;
}

export const Nest: React.FC<IProps> = ({
  depth,
  size,
  speed,
  scale,
  squat,
  radius,
  animation,
}) => {
  if (depth < 1) return null;

  const style = {
    width: `${size}rem`,
    height: `${size / squat}rem`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: `${animation} ${speed}s linear infinite`,
    backgroundColor: 'white',
    borderRadius: `${radius}%`,
    transition: 'border-radius 1s, width 1s, height 1s',
    zIndex: 2,
    position: 'fixed',
  };

  if (depth === 1) {
    return (
      <div style={style}>
        <img
          alt="anchor-logo"
          className="anchor-logo"
          src="http://localhost:3000/assets/ship-wheel.png"
        ></img>
      </div>
    );
  }

  return (
    <div style={style}>
      <Nest
        depth={(depth -= 1)}
        size={(size *= scale)}
        speed={speed}
        scale={scale}
        squat={squat}
        radius={radius}
        animation={animation}
      />
    </div>
  );
};
