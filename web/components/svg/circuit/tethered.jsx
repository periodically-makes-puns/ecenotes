import ValueModifiableComponent from "./valuemod";

export default function TetheredValueModifiableComponent({ position, offset, ...leftover}) {
  console.log(position, offset);
  return <ValueModifiableComponent position={{x: position.x + offset.x, y: position.y + offset.y}} {...leftover}></ValueModifiableComponent>;
}