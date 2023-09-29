import CircuitComponent from "./generic";

export default function SPSTSwitch({position, value, setValue, ...rest}) {
  return <CircuitComponent position={position} modify={setValue} boundingBox={{x: -40, y: -9, dx: 80, dy: 16}} {...rest}>
    <path d={`M -40 0 h 20 
a 5 5 0 0 1 10 0
a 5 5 0 0 1 -10 0 
m 30 0
a 5 5 0 0 1 10 0
a 5 5 0 0 1 -10 0 m 10 0 h 20
M -11 -3 l ${(value) ? "26 -2" : "22 -6"}`} fill="black" stroke="black" />
  </CircuitComponent>;
};