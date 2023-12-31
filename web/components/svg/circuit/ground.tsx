import CircuitComponent, { DefaultComponentProps } from "./generic";

export default function Ground(props: DefaultComponentProps) {
  return <CircuitComponent boundingBox={{x: -10, y: -40, dx: 20, dy: 26}} {...props}>
    <path d="M 0 -40
      v 20 m -10 0 h 20
      m -3 3 h -14
      m 3 3 h 8" fill="transparent" stroke="black" />
  </CircuitComponent>;
}