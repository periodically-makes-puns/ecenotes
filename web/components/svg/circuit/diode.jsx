import CircuitComponent from "./generic";

export default function Diode({position, ...rest}) {
  return <CircuitComponent position={position} boundingBox={{x: -40, y: -10, dx: 80, dy: 20}} {...rest}>
    <path d="M -40 0 h 30 m 20 0 h 30
M -10 10 v -20 L 10 0 z
M 10 -10 v 20" fill="transparent" stroke="black" />
  </CircuitComponent>;
}