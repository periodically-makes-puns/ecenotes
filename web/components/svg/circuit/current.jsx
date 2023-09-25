import ValueModifiableComponent from "./valuemod";
import {useState} from 'react';

const PATH = `M -40 0 h 10
M 40 0 h -10
M -30 0 A 30 30 1 1 0 30 0
M -30 0 A 30 30 0 0 1 30 0
M -20 0 h 40 l -10 10 m 10 -10 l -10 -10`, UNIT = 'A', BOX = {x: -40, y: -30, dx: 80, dy: 60}, POS = {x: 40, y: -32};

export default function CurrentSource(props) {
  return <ValueModifiableComponent boundingBox={BOX}
   unit={UNIT} labelOffset={POS} path={PATH} {...props}>
  </ValueModifiableComponent>;
};
