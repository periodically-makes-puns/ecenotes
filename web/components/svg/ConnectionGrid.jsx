import { useEffect, useState } from 'react';
import Resistor from './circuit/resistor';
import OpAmp from './circuit/opamp';

export default function ConnectionGrid() {
  let [moved, setMoved] = useState(0);
  let [startPos, setStartPos] = useState({x: 0, y: 0});
  let [center, setCenter] = useState({x: 0, y: 0});
  let [windowSize, setWindowSize] = useState({x: 0, y: 0});
  function handleResize() {
    setWindowSize({x: window.innerWidth, y: window.innerHeight});
  }

  function onMouseDown(event) {
    setMoved(1);
    setStartPos({x: event.pageX, y: event.pageY});
    event.stopPropagation();
    event.preventDefault();
  }

  function onMouseMove(event) {
    let dx = event.pageX - startPos.x;
    let dy = event.pageY - startPos.y;
    if (Math.hypot(dy, dx) > 6 && moved == 1) {
      setMoved(2);
    }
    if (moved == 2) {
      setCenter({x: center.x - dx, y: center.y - dy});
      setStartPos({x: event.pageX, y: event.pageY});
    }
    event.preventDefault();
  }

  function onMouseUp(event) {
    setMoved(0);
    event.preventDefault();
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);
  //console.log(center, windowSize);

  return <>
      <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
        <circle id="pattern-circle" cx="20" cy="20" r="2" fill="#000"></circle>
      </pattern>
      <g id="view" transform={`translate(${windowSize.x / 2-center.x},${windowSize.y / 2-center.y})`} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
        
        <circle id="origin" cx="0" cy="0" r="5" fill="#f00"></circle>
        <rect id="rect" x={center.x-windowSize.x / 2} y={center.y-windowSize.y / 2} width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        <Resistor /> <Resistor /> <Resistor /> <Resistor />
        <OpAmp />
      </g>
    </>;
};