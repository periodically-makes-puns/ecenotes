import CircuitComponent from './generic';
import ValueLabel from './valueLabel';

export default function ValueModifiableComponent({ path, setValue, labelOffset, alignment, verticalAlignment, value, unit, ...leftover}) {
  alignment ??= "end";
  return <CircuitComponent modify={setValue} {...leftover}>
    <path d={path} fill="transparent" stroke="black" />
    <ValueLabel position={labelOffset} alignment={alignment} verticalAlignment={verticalAlignment} value={value} unit={unit}></ValueLabel>
  </CircuitComponent>;
};