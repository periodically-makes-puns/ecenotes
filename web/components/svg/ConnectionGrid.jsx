import { useEffect, useState, useRef, useCallback, createContext } from 'react';
import styles from './grid.module.css';
import Resistor from './circuit/resistor';
import OpAmp from './circuit/opamp';
import Capacitor from './circuit/capacitor';
import Inductor from './circuit/inductor';
import VoltageSource from './circuit/voltage';
import CurrentSource from './circuit/current';
import Ground from './circuit/ground';
import Connection from './circuit/connection';
import CurrentLabel from './circuit/currentLabel';
import VoltagePin from './circuit/voltagePin';

export const ModeContext = createContext('normal');

export function ConnectionGrid() {
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
  let [connections, _setConnections] = useState([]);
  let setConnections = (c) => {
    _setConnections(c);
  }
  const addConnection = (conn) => {
    let res = [];
    setConnections(connections => {
      console.log(conn, connections);
      if (conn.type == 'v') { // vertical
        let sy = conn.sy, ey = conn.ey;
        for (let c of connections) {
          if (c.x == conn.x && 
            ((c.ey >= sy && c.sy <= sy) || (sy <= c.sy && ey >= c.sy))) {
              sy = Math.min(sy, c.sy);
              ey = Math.max(ey, c.ey);
          } else res.push(c);
        }
        let endpoints = [sy, ey];
        let final = [];
        for (let c of res) {
          if (c.type == 'h' && sy <= c.y && c.y <= ey && c.sx <= conn.x && conn.x <= c.ex) {
            if (c.sx != conn.x && c.ex != conn.x) {
              final.push({...c, ex: conn.x});
              final.push({type: 'h', id: incConnId(), y: c.y, sx: conn.x, ex: c.ex});
            } else {
              final.push(c);
            }
            endpoints.push(c.y);
          } else {
            final.push(c);
          }
        }
        endpoints.sort((a,b) => a - b);
        for (let i = 0; i < endpoints.length - 1; i++) {
          final.push({type: conn.type, id: incConnId(), x: conn.x, sy: endpoints[i], ey: endpoints[i+1]});
        }
        return final;
      } else {
        let sx = conn.sx, ex = conn.ex;
        for (let c of connections) {
          if (c.y == conn.y && 
            ((c.ex >= sx && c.sx <= sx) || (sx <= c.sx && ex >= c.sx))) {
              sx = Math.min(sx, c.sx);
              ex = Math.max(ex, c.ex);
          }
          else res.push(c);
        }
        let endpoints = [sx, ex];
        let final = [];
        for (let c of res) {
          if (c.type == 'v' && sx <= c.x && c.x <= ex && c.sy <= conn.y && conn.y <= c.ey) {
            if (c.sy != conn.y && c.ey != conn.y) {
              final.push({...c, ey: conn.y});
              final.push({type: 'v', id: incConnId(), x: c.x, sy: conn.y, ey: c.ey});
            } else {
              final.push(c);
            }
            endpoints.push(c.x);
          } else {
            final.push(c);
          }
        }
        endpoints.sort((a,b) => a - b);
        for (let i = 0; i < endpoints.length - 1; i++) {
          final.push({type: conn.type, id: incConnId(), y: conn.y, sx: endpoints[i], ex: endpoints[i+1]});
        }
        return final;
      }
    });
  }
  let [connid, setConnId] = useState(1);
  const connRef = useRef(connid);
  let incConnId = () => {
    connRef.current = connRef.current + 1;
    setConnId(cid => cid + 1);
    return connRef.current;
  }
  let [mode, setMode] = useState('normal');

  // const componentRef = useRef(components);
  // const setComponents = (data) => {
  //   componentRef.current = data;
  //   _setComponents(data);
  // }

  function coerceToPoint(pos) {
    return {x: Math.floor((pos.x + center.x - windowSize.x / 2) / 40) * 40 + 20, y: Math.floor((pos.y + center.y - windowSize.y / 2) / 40) * 40 + 20}; 
  }

  function handleResize() {
    setWindowSize({x: window.innerWidth, y: window.innerHeight});
  }

  function onMouseDown(event) {
    setMoved(1);
    if (mode == 'drawing') setStartPos(coerceToPoint({x: event.pageX, y: event.pageY}));
    else if (mode == 'normal') setStartPos({x: event.pageX, y: event.pageY});
    event.preventDefault();
  }

  function onMouseMove(event) {
    let dx = event.pageX - startPos.x;
    let dy = event.pageY - startPos.y;
    if (mode == 'normal' && Math.hypot(dy, dx) > 6) {
      setMoved(moved => (moved == 1) ? 2 : moved);
    }
    if (mode == 'normal' && moved == 2) {
      setCenter({x: center.x - dx, y: center.y - dy});
      setStartPos({x: event.pageX, y: event.pageY});
    } else if (mode == 'drawing' && moved == 1) {
      let focus = coerceToPoint({x: event.pageX, y: event.pageY});
      if (focus.x != startPos.x) {
        addConnection({type: "h", y: startPos.y, sx: Math.min(startPos.x, focus.x), ex: Math.max(startPos.x, focus.x)});
      }
      if (focus.y != startPos.y) {
        addConnection({type: "v", x: focus.x, sy: Math.min(startPos.y, focus.y), ey: Math.max(startPos.y, focus.y)});
      }
      setStartPos(focus);
    }
    event.preventDefault();
  }

  function onMouseUp(event) {
    setMoved(0);
    event.preventDefault();
  }

  function onDelete(key) {
    setComponents(comp => comp.filter((val) => (val.id != key && val.tetherId != key)));
  }

  function onDeleteConn(key) {
    setConnections(conn => conn.filter((val) => val.id != key));
  }

  function setValue(key, val) {
    setComponents(comp => comp.map((c) => (c.id == key) ? {...c, val} : c));
  }

  function setPosition(key, pos) {
    setComponents(comp => comp.map((c) => {
      if (c.id == key) return {...c, position: pos};
      else if (c.tetherId == key) {
        return {...c, position: {x: pos.x + c.offset.x, y: pos.y + c.offset.y}};
      }
      else return c;
      }));
  }

  function setOrientation(key, orient) {
    setComponents(comp => comp.map((c) => (c.id == key || c.tetherId == key) ? {...c, orient} : c));
  }

  function onLabel(key, offset) {
    console.log("LABEL", key);
    setComponents(comp => {
      let tethered = comp.filter((c) => c.tetherId == key);
      if (tethered.length > 0) return comp;
      let c = comp.filter((c) => c.id == key)[0];
      if (typeof c.tetherId !== 'undefined') return comp;
      console.log("INIT", c.position, offset);
      return [...comp, {
        id: incUid(),
        type: 'clabel',
        tetherId: key,
        val: c.val,
        offset,
        orient: c.orient,
        position: {x: c.position.x + offset.x, y: c.position.y + offset.y},
      }];
    });
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
          val: 220,
          orient: 0
        }]);
        break;
      case 'o':
        event.preventDefault();
        setComponents(comp => [...comp, {
          id: incUid(),
          type: 'opamp',
          position: {x: 20, y: 20},
          orient: 0
        }]);
        break;
      case 'c':
        event.preventDefault();
        setComponents(comp => [...comp, {
          id: incUid(),
          type: 'capacitor',
          position: {x: 20, y: 20},
          val: 0.000001,
          orient: 0
        }]);
        break;
      case 'l':
        event.preventDefault();
        setComponents(comp => [...comp, {
          id: incUid(),
          type: 'inductor',
          position: {x: 20, y: 20},
          val: 1,
          orient: 0
        }]);
        break;
      case 'v':
        event.preventDefault();
        setComponents(comp => [...comp, {
          id: incUid(),
          type: 'voltage',
          position: {x: 20, y: 20},
          val: 9,
          orient: 0
        }]);
        break;
      case 'i':
        event.preventDefault();
        setComponents(comp => [...comp, {
          id: incUid(),
          type: 'current',
          position: {x: 20, y: 20},
          val: 0.001,
          orient: 0
        }]);
        break;
      case 'g':
        event.preventDefault();
        setComponents(comp => [...comp, {
          id: incUid(),
          type: 'ground',
          position: {x: 20, y: 20},
          val: 0.001,
          orient: 0
        }]);
        break;
      case 'p':
        event.preventDefault();
        setComponents(comp => [...comp, {
          id: incUid(),
          type: 'vpin',
          position: {x: 20, y: 20},
          val: 0.001,
          orient: 0
        }]);
        break;
      case 'd':
        event.preventDefault();
        setMode(mode => {return {drawing: 'normal', normal: 'drawing', labelling: 'labelling'}[mode]});
        break;
      case 't':
        event.preventDefault();
        setMode(mode => {return {drawing: 'drawing', normal: 'labelling', labelling: 'normal'}[mode]});
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
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} className={styles[mode]}>
        <circle id="origin" cx="0" cy="0" r="5" fill="#f00"></circle>
        <rect id="rect" x={center.x-windowSize.x / 2} y={center.y-windowSize.y / 2} width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        <g>
          <ModeContext.Provider value={mode}>
            {components.map((c) => {
              let props = {
                id: c.id,
                key: c.id,
                position: c.position,
                value: c.val,
                orient: c.orient,
                setValue,
                setPosition,
                setOrientation,
                onDelete,
                onLabel
              };
              switch(c.type) {
                case 'resistor':
                  return <Resistor {...props}/>;
                case 'opamp':
                  return <OpAmp {...props}/>;
                case 'capacitor':
                  return <Capacitor {...props}/>;
                case 'inductor':
                  return <Inductor {...props}/>;
                case 'voltage':
                  return <VoltageSource {...props}/>;
                case 'vpin':
                  return <VoltagePin {...props}/>;
                case 'current':
                  return <CurrentSource {...props}/>;
                case 'ground':
                  return <Ground {...props}/>;
                case 'clabel':
                  return <CurrentLabel offset={c.offset} {...props}/>;
              }
            })}
          </ModeContext.Provider>
        </g> 
        <g>
          {connections.map((val) => {
            switch (val.type) {
              case 'h':
                return <Connection id={val.id} key={val.id} start={{x: val.sx, y: val.y}} end={{x: val.ex, y: val.y}} onDelete={onDeleteConn} />
              case 'v':
                return <Connection id={val.id} key={val.id} start={{x: val.x, y: val.sy}} end={{x: val.x, y: val.ey}} onDelete={onDeleteConn} />
              default:
                return <p>{val.type}</p>;
            } 
          })}
        </g>
      </g>
    </>;
};