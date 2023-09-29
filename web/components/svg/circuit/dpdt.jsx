import CircuitComponent from "./generic";

const ON = `M -15 0 L 15 40
M -15 120 L 15 160 M 0 20 v 120`, OFF = `M -15 0 L 15 -40
M -15 120 L 15 80 M 0 -20 v 120`;

export default function DPDTSwitch({position, value, setValue, ...rest}) {
  return <CircuitComponent position={position} modify={setValue} boundingBox={{x: -40, y: -45, dx: 80, dy: 210}} {...rest}>
    <path d={`M -40 0 h 20 
a 5 5 0 1 1 10 0 m -10 0
a 5 5 1 0 0 10 0 
m 20 40
a 5 5 0 1 1 10 0 m -10 0
a 5 5 1 0 0 10 0 h 20
m -30 -80
a 5 5 0 1 1 10 0 m -10 0
a 5 5 1 0 0 10 0 h 20
M -40 120 h 20 
a 5 5 0 1 1 10 0 m -10 0
a 5 5 1 0 0 10 0 
m 20 40
a 5 5 0 1 1 10 0 m -10 0
a 5 5 1 0 0 10 0 h 20
m -30 -80
a 5 5 0 1 1 10 0 m -10 0
a 5 5 1 0 0 10 0 h 20 ${(value) ? ON : OFF}`} fill="black" stroke="black" />
  </CircuitComponent>;
};