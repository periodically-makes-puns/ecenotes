import {useState} from 'react';
import Draggable from '../Draggable';

export default function CircuitComponent({ boundingBox, children }) {
  return <Draggable initialPosition={{x: 20, y: 20}} canRotate={true}>
    <rect x={(-boundingBox.x / 2) + 2} y={-boundingBox.y / 2} width={boundingBox.x - 4} height={boundingBox.y} fill="#fff"></rect>
    {children}
  </Draggable>
};