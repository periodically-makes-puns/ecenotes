import CircuitComponent from "./generic";
import ValueLabel from "./valueLabel";

export default function Resistor() {
  return <CircuitComponent boundingBox={{x: 80, y: 20}}>
    <path d="m -40 0 l 10 0 l 5 -10 l 10 20 l 10 -20 l 10 20 l 10 -20 l 10 20 l 5 -10 l 10 0 
    M -38 -6
    l 6 0
    m -3 -3
    l 0 6
    M 32 -6
    l 6 0" fill="transparent" stroke="black" />
    <ValueLabel position={{x: 40, y: -12}} alignment="end" value="220" unit="Ω"></ValueLabel>
  </CircuitComponent>;
};