import {useEffect, useState, useRef} from 'react';
export default function Draggable({ children, initialPosition, canRotate }) {
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

  let [center, _setCenter] = useState(initialPosition);
  const centerRef = useRef(center);
  const setCenter = (data) => {
    centerRef.current = data;
    _setCenter(data);
  }

  let [rot, _setRot] = useState(0);
  const rotRef = useRef(rot);
  const setRot = (data) => {
    rotRef.current = data;
    _setRot(data);
  }

  function onPossibleRotate(event) {
    switch (event.key) {
      case 'r':
        setRot((rotRef.current + 1) % 4);
        break;
      case 'R':
        setRot((rotRef.current - 1) % 4);
    } 
  }

  function onMouseDown(event) {
    if (movedRef.current == 0) {
      setMoved(1);
      setStartPos({x: event.pageX, y: event.pageY});
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      if (canRotate) {
        window.addEventListener("keydown", onPossibleRotate);
      }
    }
    event.stopPropagation();
    event.preventDefault();
  }

  function onMouseMove(event) {
    console.log(movedRef.current, event.pageX, event.pageY);
    let dx = event.pageX - startPosRef.current.x;
    let dy = event.pageY - startPosRef.current.y;
    if (Math.hypot(dy, dx) > 6 && movedRef.current == 1) {
      setMoved(2);
    }
    if (movedRef.current == 2) {
      setCenter({x: centerRef.current.x + dx, y: centerRef.current.y + dy});
      setStartPos({x: event.pageX, y: event.pageY});
    }
    event.stopPropagation();
    event.preventDefault();
  }

  function onMouseUp(event) {
    setMoved(0); // snap to grid
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    if (canRotate) {
      window.removeEventListener("keydown", onPossibleRotate);
    }
    setCenter({x: Math.floor(centerRef.current.x / 40) * 40 + 20, y: Math.floor(centerRef.current.y / 40) * 40 + 20});
    event.stopPropagation();
    event.preventDefault();
  }

  return <g transform={`translate(${center.x}, ${center.y}) rotate(${90 * rot})`} onMouseDown={onMouseDown}>
    {children}
  </g>
}