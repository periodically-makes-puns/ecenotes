import CircuitComponent from './generic';
import ValueLabel from './valueLabel';

export default function ValueModifiableComponent({ path, setValue, labelOffset, alignment, verticalAlignment, value, unit, children, color, ...leftover}) {
  alignment ??= "end";
  return <CircuitComponent modify={setValue} {...leftover}>
    <path d={path} fill="transparent" stroke={color ?? "black"} />
    {children}
    <ValueLabel position={labelOffset} alignment={alignment} verticalAlignment={verticalAlignment} value={value} unit={unit}></ValueLabel>
  </CircuitComponent>;
};