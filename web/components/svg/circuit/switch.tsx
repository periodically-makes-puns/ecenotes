import CircuitComponent, { CircuitComponentProps } from "./generic";
import { Box, Coordinates, Value, ValueChangeHandler } from "./types";

export type SwitchProps = Omit<CircuitComponentProps, "modify" | "boundingBox"> & {
  position: Coordinates, 
  value: Value, 
  setValue: ValueChangeHandler
};

export function SPSTSwitch({position, value, setValue, ...rest} : SwitchProps) {
  return <CircuitComponent position={position} modify={setValue} boundingBox={{x: -40, y: -9, dx: 80, dy: 16}} {...rest}>
    <path d={`M -40 0 h 20 
a 5 5 0 0 1 10 0
a 5 5 0 0 1 -10 0 
m 30 0
a 5 5 0 0 1 10 0
a 5 5 0 0 1 -10 0 m 10 0 h 20
M -11 -3 l ${(value) ? "26 -2" : "22 -6"}`} fill="black" stroke="black" />
  </CircuitComponent>;
}

export function SPDTSwitch({position, value, setValue, ...rest} : SwitchProps) {
  return <CircuitComponent position={position} modify={setValue} boundingBox={{x: -40, y: -45, dx: 80, dy: 90}} {...rest}>
    <path d={`M -40 0 h 20 
a 5 5 0 0 1 10 0
a 5 5 0 0 1 -10 0
m 30 40
a 5 5 0 0 1 10 0
a 5 5 0 0 1 -10 0 m 10 0 h 20
m -30 -80
a 5 5 0 0 1 10 0
a 5 5 0 0 1 -10 0 m 10 0 h 20
M -15 0 L 15  
 ${(value) ? "40" : "-40"}`} fill="black" stroke="black" />
  </CircuitComponent>;
}

const DPST_ON = `M -11 -3 l 26 -2
M -11 37 l 26 -2
M 2 -4 v 40`, DPST_OFF = `M -11 -3 l 22 -6
M -11 37 l 22 -6
M 0 -6 v 40`;

export function DPSTSwitch({position, value, setValue, ...leftover} : SwitchProps) {
  return <CircuitComponent position={position} modify={setValue} boundingBox={{x: -40, y: -9, dx: 80, dy: 56}} {...leftover}>
    <path d={`M -40 0 h 20 
a 5 5 0 0 1 10 0
a 5 5 0 0 1 -10 0 
m 30 0
a 5 5 0 0 1 10 0
a 5 5 0 0 1 -10 0 m 10 0 h 20
M -40 40 h 20 
a 5 5 0 0 1 10 0
a 5 5 0 0 1 -10 0 
m 30 0
a 5 5 0 0 1 10 0
a 5 5 0 0 1 -10 0 m 10 0 h 20 ${(value) ? DPST_ON : DPST_OFF}`} fill="black" stroke="black" />
  </CircuitComponent>;
}

const DPDT_ON = `M -15 0 L 15 40
M -15 120 L 15 160 M 0 20 v 120`, DPDT_OFF = `M -15 0 L 15 -40
M -15 120 L 15 80 M 0 -20 v 120`;

export type DPDTProps = Omit<CircuitComponentProps, "modify" | "boundingBox"> & {
  position: Coordinates, 
  value: Value, 
  setValue: ValueChangeHandler,
  boundingBox?: Box
}

export function DPDTSwitch({position, value, setValue, ...leftover} : DPDTProps) {
  return <CircuitComponent position={position} modify={setValue} boundingBox={{x: -40, y: -45, dx: 80, dy: 210}} {...leftover}>
    <path d={`M -40 0 h 20 
a 5 5 0 1 1 10 0 m -10 0
a 5 5 1 0 0 10 0 
m 20 40
a 5 5 0 1 1 10 0 m -10 0
a 5 5 1 0 0 10 0 h 20
m -30 -80
a 5 5 0 1 1 10 0 m -10 0
a 5 5 1 0 0 10 0 h 20
M -40 120 h 20 
a 5 5 0 1 1 10 0 m -10 0
a 5 5 1 0 0 10 0 
m 20 40
a 5 5 0 1 1 10 0 m -10 0
a 5 5 1 0 0 10 0 h 20
m -30 -80
a 5 5 0 1 1 10 0 m -10 0
a 5 5 1 0 0 10 0 h 20 ${(value) ? DPDT_ON : DPDT_OFF}`} fill="black" stroke="black" />
  </CircuitComponent>;
}