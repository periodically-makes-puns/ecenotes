import {useEffect, useState, useRef} from 'react';
export default function Draggable({ id, children, position, onDelete, modify }) {
  let [moved, _setMoved] = useState(0);
  const movedRef = useRef(moved);
  const setMoved = (data) => {
    movedRef.current = data;
    _setMoved(data);
  }

  let [startPos, _setStartPos] = useState({x: 0, y: 0});
  const startPosRef = useRef(startPos);
  const setStartPos = (data) => {
    startPosRef.current = data;
    _setStartPos(data);
  }
  let [center, setCenter] = useState(position);

  let [rot, setRot] = useState(0);
  const modifyRef = useRef(modify);
  const onDelRef = useRef(onDelete);
  const keyRef = useRef(id);

  function onKeyDown(event) {
    switch (event.key) {
      case 'q':
        setRot(rot => (rot+1) % 4);
        break;
      case 'e':
        setRot(rot => (rot-1) % 4);
        break;
      case "Backspace":
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("keydown", onKeyDown);
        onDelRef.current(keyRef.current);
        break;
      case "m":
        if (typeof modifyRef.current === "undefined") break;
        let res = prompt("Enter value (allowed suffixes: p,n,mu,m,k,M,G,T): ")
        let factor = 1;
        if (res === null) break; 
        if (res.endsWith("mu")) {
          factor = 0.000001;
          factor *= parseFloat(res, 10);
        }
        else {
          switch (res.charAt(res.length-1)) {
            case 'p': factor = 0.000000000001; break;
            case 'n': factor = 0.000000001; break;
            case 'm': factor = 0.001; break;
            case 'k': factor = 1000; break;
            case 'M': factor = 1000000; break;
            case 'G': factor = 1000000000; break;
            case 'T': factor = 1000000000000; break;
          }
          factor *= parseInt(res, 10);
        }
        if (!isNaN(factor)) modifyRef.current(factor);
        break;
    } 
  }

  function onMouseDown(event) {
    if (movedRef.current == 0) {
      setMoved(1);
      setStartPos({x: event.pageX, y: event.pageY});
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("keydown", onKeyDown);
    }
    event.stopPropagation();
    event.preventDefault();
  }

  function onMouseMove(event) {
    let dx = event.pageX - startPosRef.current.x;
    let dy = event.pageY - startPosRef.current.y;
    if (Math.hypot(dy, dx) > 6 && movedRef.current == 1) {
      setMoved(2);
    }
    if (movedRef.current == 2) {
      setCenter(({x, y}) => {return {x: x + dx, y: y + dy}});
      setStartPos({x: event.pageX, y: event.pageY});
    }
    event.stopPropagation();
    event.preventDefault();
  }

  function onMouseUp(event) {
    setMoved(0); // snap to grid
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("keydown", onKeyDown);
    setCenter(({x, y}) => {return {x: Math.floor(x / 40) * 40 + 20, y: Math.floor(y / 40) * 40 + 20}});
    event.stopPropagation();
    event.preventDefault();
  }

  return <g transform={`translate(${center.x}, ${center.y}) rotate(${90 * rot})`} onMouseDown={onMouseDown}>
    {children}
  </g>
}