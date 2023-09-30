import ValueModifiableComponent from "./valuemod";

const PATH = `M 0 0 h 16
M 40 0 h -16
M 16 -10 v 20
M 24 -10 v 20
M 4 -6 h 6 m -3 -3 v 6
M 34 -6 h -6`, UNIT = "F", BOX = {x: 0, y: -10, dx: 40, dy: 20}, POS = {x: 40, y: -12};

export default function Capacitor(props, ) {
  return <ValueModifiableComponent boundingBox={BOX}
    unit={UNIT} labelOffset={POS} path={PATH} {...props}>
  </ValueModifiableComponent>;
}
