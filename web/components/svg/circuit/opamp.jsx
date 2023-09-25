import CircuitComponent from "./generic";

export default function OpAmp({position, ...rest}) {
  return <CircuitComponent position={position}boundingBox={{x: -80, y: -60, dx: 160, dy: 120}} {...rest}>
    <path d="M -80 -40 h 20
      M -80 40 h 20
      M -60 -60 v 120 L 60 0 z
      M 60 0 h 20
      M -56 -35 h 20 m -10 -10 v 20
      M -56 35 h 20" fill="transparent" stroke="black" />
  </CircuitComponent>;
};