import { ReactNode } from "react";
import CircuitComponent, { CircuitComponentProps } from "./generic";
import { Coordinates, ValueChangeHandler } from "./types";
import ValueLabel, { ValueLabelProps } from "./valueLabel";

type ValueModProps = CircuitComponentProps & Omit<ValueLabelProps, "position"> & {
  path: string,
  children?: ReactNode,
  color?: string,
  setValue: ValueChangeHandler,
  labelOffset: Coordinates,
}

export type DefaultValueProps = Omit<ValueModProps, "boundingBox" | "unit" | "labelOffset" | "path">;

export default function ValueModifiableComponent({ path, setValue, labelOffset, alignment, verticalAlignment, value, unit, children, color, ...leftover} : ValueModProps) {
  alignment ??= "end";
  verticalAlignment ??= "auto";
  return <CircuitComponent modify={setValue} {...leftover}>
    <path d={path} fill="transparent" stroke={color ?? "black"} />
    {children}
    <ValueLabel position={labelOffset} alignment={alignment} verticalAlignment={verticalAlignment} value={value} unit={unit}></ValueLabel>
  </CircuitComponent>;
}