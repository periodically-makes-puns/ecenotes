import ValueModifiableComponent from './valuemod';
const PATH = `m -40 0 l 10 0 l 5 -10 l 10 20 l 10 -20 l 10 20 l 10 -20 l 10 20 l 5 -10 l 10 0 
M -38 -6 h 6 m -3 -3 v 6
M 32 -6 h 6`, UNIT = "Ω", POS = {x: 40, y: -12}, BOX = {x: -40, y: -10, dx: 80, dy: 20};

export default function Resistor(props) {
  return <ValueModifiableComponent boundingBox={BOX}
   unit={UNIT} labelOffset={POS} path={PATH} {...props}>
  </ValueModifiableComponent>;
};