import ValueModifiableComponent, { DefaultValueProps } from "./valuemod";

const PATH = `M -40 0 h 10
M 40 0 h -10
M -30 0 A 30 30 1 1 0 30 0
M -30 0 A 30 30 0 0 1 30 0
M -26 0 h 10
M 26 0 h -10 m 5 -5 v 10`, UNIT = "V", POS = {x: 40, y: -32}, BOX = {x: -40, y: -30, dx: 80, dy: 60};

export default function VoltageSource(props: DefaultValueProps) {
  return <ValueModifiableComponent boundingBox={BOX}
    unit={UNIT} labelOffset={POS} path={PATH} {...props}>
  </ValueModifiableComponent>;
}
