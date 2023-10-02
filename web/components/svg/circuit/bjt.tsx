import CircuitComponent, { DefaultComponentProps } from "./generic";


export function NPNBJT(props: DefaultComponentProps) {
  return <CircuitComponent boundingBox={{x: -40, y: -40, dx: 80, dy: 80}} {...props}>
    <path d="M -30 0 A 30 30 1 1 0 30 0
      M -30 0 A 30 30 0 0 1 30 0
      M -40 0 H -20
      M 0 -40 v 15 L -16 -13
      M 0 40 v -15 L -20 10
      M -20 15 v -30" fill="transparent" stroke="black" />
    <path d="M -20 -10 l 1 -7 l 6 8 z" fill="black"></path>
  </CircuitComponent>;
}

export function PNPBJT(props: DefaultComponentProps) {
  return <CircuitComponent boundingBox={{x: -40, y: -40, dx: 80, dy: 80}} {...props}>
    <path d="
M -30 0 A 30 30 1 1 0 30 0
M -30 0 A 30 30 0 0 1 30 0
M -40 0 H -20
M 0 -40 v 15 L -20 -10
M 0 40 v -15 m -4 -3 L -20 10
M -20 15 v -30" fill="transparent" stroke="black" />
    <path d="M 0 25 l -1 -7 l -6 8 z" fill="black"></path>
  </CircuitComponent>;
}