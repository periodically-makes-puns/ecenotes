import ValueModifiableComponent from "./valuemod";

const PATH = `M 0 0 l -5 -5 h -5 m 5 0 v -5
`, UNIT = "V", POS = {x: -8, y: -8}, BOX = {x: -10, y: -10, dx: 10, dy: 10};

export default function VoltagePin(props) {
  return <ValueModifiableComponent boundingBox={BOX}
    unit={UNIT} labelOffset={POS} path={PATH} alignment={"end"} {...props}>
  </ValueModifiableComponent>;
}
