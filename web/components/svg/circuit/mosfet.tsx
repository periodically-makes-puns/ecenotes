import CircuitComponent, { DefaultComponentProps } from "./generic";


export function NMOSFET(props: DefaultComponentProps) {
  return <CircuitComponent boundingBox={{x: -80, y: -40, dx: 120, dy: 120}} {...props}>
    <path d="
M -70 20 A 50 50 1 1 0 30 20
M -70 20 A 50 50 0 0 1 30 20
M -80 40 h 30 v -40
M 0 -40 v 40 h -40 m 0 5 v -10
M 0 80 v -40 h -40 m 0 5 v -10 
m 40 5 v -20 h -30 m -10 0 m 0 10 v -20
" fill="transparent" stroke="black" />
    <path d="M -40 20 l 10 -10 v 20 z " fill="black"></path>
  </CircuitComponent>;
}

export function PMOSFET(props: DefaultComponentProps) {
  return <CircuitComponent boundingBox={{x: -80, y: -40, dx: 120, dy: 120}} {...props}>
    <path d="
M -70 20 A 50 50 1 1 0 30 20
M -70 20 A 50 50 0 0 1 30 20
M -80 40 h 30 v -40
M 0 -40 v 40 h -40 m 0 5 v -10
M 0 80 v -40 h -40 m 0 5 v -10 
m 40 5 v -20 m -10 0 h -30 m 0 10 v -20
" fill="transparent" stroke="black" />
    <path d="M 0 20 l -10 -10 v 20 z " fill="black"></path>
  </CircuitComponent>;
}