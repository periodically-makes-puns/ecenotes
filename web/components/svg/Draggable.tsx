import {useEffect, useState, useRef, useContext, ReactNode} from "react";
import { ModeContext } from "./ConnectionGrid";
import styles from "./draggable.module.css";
import { Coordinates, DeleteHandler, ID, ValueChangeHandler } from "./circuit/types";

export interface DraggableProps { 
  id: ID;
  children?: ReactNode;
  position: Coordinates;
  setPosition: (id: ID, pos: Coordinates) => void;
  savePosition?: boolean;
  orient: number;
  setOrientation: (id: ID, orient: number) => void;
  onDelete: DeleteHandler;
  onLabel: (id: ID, offset: Coordinates) => void;
  modify?: ValueChangeHandler;
  cLabelOffset: Coordinates;
  disableInput: boolean;
}

export default function Draggable({ id, children, position, setPosition, savePosition, orient, setOrientation, onDelete, onLabel, modify, cLabelOffset, disableInput } : DraggableProps) {
  savePosition ??= true;
  const [moved, _setMoved] = useState(0);
  const movedRef = useRef(moved);
  const setMoved = (data: number) => {
    movedRef.current = data;
    _setMoved(data);
  };

  const [startPos, _setStartPos] = useState({x: 0, y: 0});
  const startPosRef = useRef(startPos);
  const setStartPos = (data: Coordinates) => {
    startPosRef.current = data;
    _setStartPos(data);
  };
  const [center, setCenter] = useState(position);

  const [rot, setRot] = useState(orient);
  const setOrientationRef = useRef(setOrientation);
  const setPosRef = useRef(setPosition);
  const modifyRef = useRef(modify);
  const onDelRef = useRef(onDelete);
  const keyRef = useRef(id);
  const mode = useContext(ModeContext);
  const onLabelRef = useRef(onLabel);
  const cLabelOffsetRef = useRef(cLabelOffset);

  function onKeyDown(event: KeyboardEvent) {
    if (disableInput) return;
    let res, factor;
    switch (event.key) {
    case "q":
      setRot(rot => (rot+5) % 4);
      break;
    case "e":
      setRot(rot => (rot+3) % 4);
      break;
    case "Backspace":
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("keydown", onKeyDown);
      onDelRef.current(keyRef.current);
      break;
    case "m":
      if (typeof modifyRef.current === "undefined") break;
      res = prompt("Enter value (allowed suffixes: p,n,mu,m,k,M,G,T): ");
      factor = 1;
      if (res === null) break; 
      if (res.endsWith("mu")) {
        factor = 0.000001;
        factor *= parseFloat(res);
      }
      else {
        switch (res.charAt(res.length-1)) {
        case "p": factor = 0.000000000001; break;
        case "n": factor = 0.000000001; break;
        case "m": factor = 0.001; break;
        case "k": factor = 1000; break;
        case "M": factor = 1000000; break;
        case "G": factor = 1000000000; break;
        case "T": factor = 1000000000000; break;
        }
        factor *= parseFloat(res);
      }
      if (!isNaN(factor)) modifyRef.current(keyRef.current, factor);
      else modifyRef.current(keyRef.current, res); // fallthrough
      break;
    } 
  }

  function onMouseDown(event: React.MouseEvent<SVGGElement>) {
    if (disableInput) return;
    if (mode == "labelling") {
      onLabelRef.current(keyRef.current, cLabelOffsetRef.current);
    } else if (movedRef.current == 0) {
      setMoved(1);
      setStartPos({x: event.pageX, y: event.pageY});
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("keydown", onKeyDown);
      event.stopPropagation();
    }
    event.preventDefault();
  }

  function onMouseMove(event: MouseEvent) {
    if (disableInput) return;
    const dx = event.pageX - startPosRef.current.x;
    const dy = event.pageY - startPosRef.current.y;
    if (Math.hypot(dy, dx) > 6 && movedRef.current == 1) {
      setMoved(2);
    }
    if (movedRef.current == 2) {
      setCenter(({x, y}) => {return {x: x + dx, y: y + dy};});
      setStartPos({x: event.pageX, y: event.pageY});
    }
    event.stopPropagation();
    event.preventDefault();
  }

  function onMouseUp(event: MouseEvent) {
    if (disableInput) return;
    setMoved(0); // snap to grid
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("keydown", onKeyDown);
    if (savePosition) {
      setCenter(({x,y}) => {return {x: Math.floor(x / 40) * 40 + 20, y: Math.floor(y / 40) * 40 + 20};});
    }
    event.stopPropagation();
    event.preventDefault();
  }
  
  useEffect(() => {
    if (savePosition) {
      setPosRef.current(keyRef.current, center);
    }
  }, [center]);
  useEffect(() => {
    if (!savePosition) {
      setCenter(position);
    }
  }, [position]);
  useEffect(() => {
    if (savePosition) {
      setOrientationRef.current(keyRef.current, rot);
    }
  }, [rot]);
  return <g className={(moved) ? styles.moving : ""}
    transform={`translate(${(moved && savePosition) ? center.x : position.x}, ${(moved && savePosition) ? center.y : position.y}) rotate(${90 * ((moved && savePosition) ? rot : orient)})`} onMouseDown={onMouseDown}>
    {children}
  </g>;
}