import { useRef, useState, useEffect  } from "react";
import { Coordinates, DeleteHandler, ID } from "./types";

export type ConnectionProps = {id: ID, start: Coordinates, end: Coordinates, onDelete: DeleteHandler};

export default function Connection({id, start, end, onDelete, ...leftover} : ConnectionProps) {
  const [selected, _setSelected] = useState(false);
  const selRef = useRef(selected);
  const setSelected = (d: boolean) => {
    _setSelected(d);
    selRef.current = d;
  };
  const idRef = useRef(id);
  const onDelRef = useRef(onDelete);
  function onKeyDown(event: KeyboardEvent) {
    if (selRef.current && event.key == "Backspace") {
      window.removeEventListener("mousedown", unselect);
      window.removeEventListener("keydown", onKeyDown);
      onDelRef.current(idRef.current);
      event.preventDefault();
    }
  }

  function onMouseDown(event: React.MouseEvent<SVGGElement>) {
    setSelected(true);
    event.stopPropagation();
    window.addEventListener("mousedown", unselect);
    event.preventDefault();
  }
  function unselect(event: MouseEvent) {
    setSelected(false);
    window.removeEventListener("mousedown", unselect);
    event.preventDefault();
  }
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  },[]);

  return <g onMouseDown={onMouseDown}>
    <rect x={start.x - ((end.x-start.x) ? 0 : 5)} y={start.y - ((end.y-start.y) ? 0 : 5)} width={Math.max(end.x-start.x, 10)} height={Math.max(end.y-start.y, 10)} opacity={0}></rect>
    <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke={(selected) ? "red" : "black"} strokeWidth={1} {...leftover}/>
  </g>;
}