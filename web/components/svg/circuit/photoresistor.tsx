import ValueModifiableComponent, { DefaultValueProps } from "./valuemod";
const PATH = `m -40 0 l 10 0 l 5 -10 l 10 20 l 10 -20 l 10 20 l 10 -20 l 10 20 l 5 -10 l 10 0 
M -32 6 h 6 m -3 -3 v 6
M 32 -6 h -6
M -35 0 A 35 35 0 1 1 35 0
M -35 0 A 35 35 1 0 0 35 0
M -28 -21 l -3 -1 l 2 -2 z m -2 -2 l -4 -4
M -21 -28 l -3 -1 l 2 -2 z m -2 -2 l -4 -4`, UNIT = "Ω", POS = {x: 40, y: -37}, BOX = {x: -40, y: -35, dx: 80, dy: 70};

export default function PhotoResistor(props: DefaultValueProps) {
  return <ValueModifiableComponent boundingBox={BOX}
    unit={UNIT} labelOffset={POS} path={PATH} {...props}>
  </ValueModifiableComponent>;
}