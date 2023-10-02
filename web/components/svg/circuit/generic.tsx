import { ReactNode } from "react";
import Draggable, { DraggableProps } from "../Draggable";
import { Box, Coordinates, DeleteHandler, ValueChangeHandler } from "./types";

export type CircuitComponentProps = Omit<DraggableProps, "cLabelOffset"> & {
  boundingBox: Box;
  children?: ReactNode;
  modify?: ValueChangeHandler;
  onDelete: DeleteHandler;
  cLabelOffset?: Coordinates; 
}

export type DefaultComponentProps = Omit<CircuitComponentProps, "boundingBox">;

export default function CircuitComponent({ boundingBox, children, modify, onDelete, ...leftover }: CircuitComponentProps) {
  const cLabelOffset = leftover.cLabelOffset ?? {x: boundingBox.x + boundingBox.dx / 2, y: boundingBox.y + boundingBox.dy + 10};
  return <Draggable modify={modify} onDelete={onDelete} cLabelOffset={cLabelOffset} {...leftover}>
    <rect x={boundingBox.x+2} y={boundingBox.y+2} width={boundingBox.dx-4} height={boundingBox.dy-4} fill="#fff"></rect>
    {children}
  </Draggable>;
  
}