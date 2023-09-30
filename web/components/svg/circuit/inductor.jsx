import ValueModifiableComponent from "./valuemod";

const PATH = `M -40 0 h 10
M 40 0 h -10
M -30 0 q 7.5 -15 15 0 q 7.5 -15 15 0 q 7.5 -15 15 0 q 7.5 -15 15 0 
M -38 -6 h 6 m -3 -3 v 6
M 32 -6 h 6`, UNIT = "H", POS = {x: 40, y: -12}, BOX = {x: -40, y: -10, dx: 80, dy: 15};

export default function Inductor(props) {
  return <ValueModifiableComponent boundingBox={BOX}
    unit={UNIT} labelOffset={POS} path={PATH} {...props}>
  </ValueModifiableComponent>;
}
