import CircuitComponent from "./generic";

export default function SPDTSwitch({position, value, setValue, ...rest}) {
  return <CircuitComponent position={position} modify={setValue} boundingBox={{x: -40, y: -45, dx: 80, dy: 90}} {...rest}>
    <path d={`M -40 0 h 20 
a 5 5 0 0 1 10 0
a 5 5 0 0 1 -10 0
m 30 40
a 5 5 0 0 1 10 0
a 5 5 0 0 1 -10 0 m 10 0 h 20
m -30 -80
a 5 5 0 0 1 10 0
a 5 5 0 0 1 -10 0 m 10 0 h 20
M -15 0 L 15  
 ${(value) ? "40" : "-40"}`} fill="black" stroke="black" />
  </CircuitComponent>;
}