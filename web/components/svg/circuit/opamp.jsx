import CircuitComponent from "./generic";

export default function OpAmp() {
  return <CircuitComponent boundingBox={{x: 160, y: 120}}>
    <path d="M -80 -40 h 20
M -80 40 h 20
M -60 -60 v 120 L 60 0 z
M 60 0 h 20
M -56 -35 h 20 m -10 -10 v 20
M -56 35 h 20" fill="transparent" stroke="black" />
  </CircuitComponent>;
};