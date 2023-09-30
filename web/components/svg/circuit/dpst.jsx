import CircuitComponent from "./generic";

const ON = `M -11 -3 l 26 -2
M -11 37 l 26 -2
M 2 -4 v 40`, OFF = `M -11 -3 l 22 -6
M -11 37 l 22 -6
M 0 -6 v 40`;

export default function DPSTSwitch({position, value, setValue, ...rest}) {
  return <CircuitComponent position={position} modify={setValue} boundingBox={{x: -40, y: -9, dx: 80, dy: 56}} {...rest}>
    <path d={`M -40 0 h 20 
a 5 5 0 0 1 10 0
a 5 5 0 0 1 -10 0 
m 30 0
a 5 5 0 0 1 10 0
a 5 5 0 0 1 -10 0 m 10 0 h 20
M -40 40 h 20 
a 5 5 0 0 1 10 0
a 5 5 0 0 1 -10 0 
m 30 0
a 5 5 0 0 1 10 0
a 5 5 0 0 1 -10 0 m 10 0 h 20 ${(value) ? ON : OFF}`} fill="black" stroke="black" />
  </CircuitComponent>;
}