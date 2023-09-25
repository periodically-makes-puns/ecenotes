import Draggable from '../Draggable';

export default function CircuitComponent({ position, boundingBox, children, modify, onDelete, ...leftover }) {
  return <Draggable position={position} canRotate={true} modify={modify} onDelete={onDelete} {...leftover}>
    <rect x={boundingBox.x+2} y={boundingBox.y+2} width={boundingBox.dx-4} height={boundingBox.dy-4} fill="#fff"></rect>
    {children}
  </Draggable>
  
};