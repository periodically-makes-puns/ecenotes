import CircuitComponent from "./generic";

export default function LED({position, value, setValue, ...rest}) {
  return <CircuitComponent position={position} modify={setValue} boundingBox={{x: -40, y: -14, dx: 80, dy: 24}} {...rest}>
    <path d="M -40 0 h 30 m 20 0 h 30
M -10 10 v -20 L 10 0 zM -40 0 h 30 m 20 0 h 30 M -10 10 v -20 L 10 0 z M 10 -10 v 20 
M -2 -8 l 2 -4 m 1 -2 l -2 1.5 l 2 1 l 0 -2.5 M 2 -6 l 2 -4 m 1 -2 l -2 1.5 l 2 1 l 0 -2.5
M 10 -10 v 20" fill={(value) ? "yellow" : "transparent"} stroke="black" />
  </CircuitComponent>;
};