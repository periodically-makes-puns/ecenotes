import {useState} from 'react';
import CircuitComponent from './generic';
import ValueLabel from './valueLabel';

export default function ValueModifiableComponent({ position, onDelete, initialValue, boundingBox, labelOffset, unit, path, ...leftover}) {
  let [val, setVal] = useState(initialValue);
  return <CircuitComponent position={position} boundingBox={boundingBox} modify={setVal} onDelete={onDelete} {...leftover}>
    <path d={path} fill="transparent" stroke="black" />
    <ValueLabel position={labelOffset} alignment="end" value={val} unit={unit}></ValueLabel>
  </CircuitComponent>;
};