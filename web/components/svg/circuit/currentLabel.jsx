import ValueModifiableComponent from "./valuemod";
const PATH = `M -15 0 h 30 l -6 6 m 6 -6 l -6 -6`, UNIT = 'A', BOX = {x: -15, y: -6, dx: 30, dy: 12}, POS = {x: 8, y: 3};

export default function CurrentLabel({...props}) {
  return <ValueModifiableComponent boundingBox={BOX} savePosition={false}
   {...{unit: UNIT, labelOffset: {x: POS.x, y: POS.y}, alignment: "end", verticalAlignment: "hanging"}} path={PATH} {...props}>
  </ValueModifiableComponent>;
};
