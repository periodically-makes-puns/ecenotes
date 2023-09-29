import ValueModifiableComponent from './valuemod';
const PATH = `M -40 0 h 20 m 40 0 h 20
M -20 5 h 40 v -10 h -40 z
M -20 10 h 10 l 20 -20`, UNIT = "Ω", POS = {x: 40, y: -12}, BOX = {x: -40, y: -10, dx: 80, dy: 20};

export default function Thermistor(props) {
  return <ValueModifiableComponent boundingBox={BOX}
   unit={UNIT} labelOffset={POS} path={PATH} {...props}>
  </ValueModifiableComponent>;
};