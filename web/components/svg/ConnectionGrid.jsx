import { useEffect, useState, useRef, useCallback } from 'react';
import Resistor from './circuit/resistor';
import OpAmp from './circuit/opamp';
import Capacitor from './circuit/capacitor';
import Inductor from './circuit/inductor';
import VoltageSource from './circuit/voltage';
import CurrentSource from './circuit/current';
import Ground from './circuit/ground';

export default function ConnectionGrid() {
  let [moved, setMoved] = useState(0);
  let [startPos, setStartPos] = useState({x: 0, y: 0});
  let [center, setCenter] = useState({x: 0, y: 0});
  let [windowSize, setWindowSize] = useState({x: 0, y: 0});
  let [uid, setUid] = useState(1);
  const uidRef = useRef(uid);
  let incUid = () => {
    uidRef.current = uidRef.current + 1;
    setUid(uid => uid + 1);
    return uidRef.current;
  }
  let [components, setComponents] = useState([]);

  // const componentRef = useRef(components);
  // const setComponents = (data) => {
  //   componentRef.current = data;
  //   _setComponents(data);
  // }


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

  function onDelete(key) {
    console.log(key);
    setComponents(comp => comp.filter((val) => val.id != key));
  }

  let onKeyDown = useCallback((event) => {
    console.log(event.key);
    switch (event.key) {
      case 'r':
        event.preventDefault();
        setComponents(comp => [...comp, {
          id: incUid(),
          type: 'resistor',
          position: {x: 20, y: 20},
          val: 220
        }]);
        break;
      case 'o':
        event.preventDefault();
        setComponents(comp => [...comp, {
          id: incUid(),
          type: 'opamp',
          position: {x: 20, y: 20}
        }]);
        break;
      case 'c':
        event.preventDefault();
        setComponents(comp => [...comp, {
          id: incUid(),
          type: 'capacitor',
          position: {x: 20, y: 20},
          val: 0.000001
        }]);
        break;
      case 'l':
        event.preventDefault();
        setComponents(comp => [...comp, {
          id: incUid(),
          type: 'inductor',
          position: {x: 20, y: 20},
          val: 1
        }]);
        break;
      case 'v':
        event.preventDefault();
        setComponents(comp => [...comp, {
          id: incUid(),
          type: 'voltage',
          position: {x: 20, y: 20},
          val: 9
        }]);
        break;
      case 'i':
        event.preventDefault();
        setComponents(comp => [...comp, {
          id: incUid(),
          type: 'current',
          position: {x: 20, y: 20},
          val: 0.001
        }]);
        break;
      case 'g':
        event.preventDefault();
        setComponents(comp => [...comp, {
          id: incUid(),
          type: 'ground',
          position: {x: 20, y: 20},
          val: 0.001
        }]);
        break;
    }
  }, [components]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", onKeyDown);
    }
  }, []);
  //console.log(center, windowSize);

  return <>
      <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
        <circle id="pattern-circle" cx="20" cy="20" r="2" fill="#000"></circle>
      </pattern>
      <g id="view" transform={`translate(${windowSize.x / 2-center.x},${windowSize.y / 2-center.y})`} 
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
        <circle id="origin" cx="0" cy="0" r="5" fill="#f00"></circle>
        <rect id="rect" x={center.x-windowSize.x / 2} y={center.y-windowSize.y / 2} width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        {components.map((val, ind) => {
          switch(val.type) {
            case 'resistor':
              return <Resistor id={val.id} key={val.id} position={val.position} initialValue={val.val} onDelete={onDelete}/>;
            case 'opamp':
              return <OpAmp id={val.id} key={val.id} position={val.position} initialValue={val.val} onDelete={onDelete}/>;
            case 'capacitor':
              return <Capacitor id={val.id} key={val.id} position={val.position} initialValue={val.val} onDelete={onDelete}/>;
            case 'inductor':
              return <Inductor id={val.id} key={val.id} position={val.position} initialValue={val.val} onDelete={onDelete}/>;
            case 'voltage':
              return <VoltageSource id={val.id} key={val.id} position={val.position} initialValue={val.val} onDelete={onDelete}/>;
            case 'current':
              return <CurrentSource id={val.id} key={val.id} position={val.position} initialValue={val.val} onDelete={onDelete}/>;
            case 'ground':
              return <Ground id={val.id} key={val.id} position={val.position} initialValue={val.val} onDelete={onDelete}/>;
          }
        })}
      </g>
    </>;
};