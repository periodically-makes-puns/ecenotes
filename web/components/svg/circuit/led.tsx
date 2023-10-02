import CircuitComponent, { CircuitComponentProps } from "./generic";
import { Box, Coordinates, Value, ValueChangeHandler } from "./types";

export type LEDProps = Omit<CircuitComponentProps, "boundingBox"> & {
  position: Coordinates,
  value: Value,
  setValue: ValueChangeHandler,
  boundingBox?: Box
}

export default function LED({position, value, setValue, ...leftover} : LEDProps) {
  return <CircuitComponent position={position} modify={setValue} boundingBox={{x: -40, y: -14, dx: 80, dy: 24}} {...leftover}>
    <path d="M -40 0 h 30 m 20 0 h 30
M -10 10 v -20 L 10 0 zM -40 0 h 30 m 20 0 h 30 M -10 10 v -20 L 10 0 z M 10 -10 v 20 
M -2 -8 l 2 -4 m 1 -2 l -2 1.5 l 2 1 l 0 -2.5 M 2 -6 l 2 -4 m 1 -2 l -2 1.5 l 2 1 l 0 -2.5
M 10 -10 v 20" fill={(value) ? "yellow" : "transparent"} stroke="black" />
  </CircuitComponent>;
}