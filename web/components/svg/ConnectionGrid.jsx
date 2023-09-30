import { useEffect, useState, useRef, useCallback, createContext, useContext } from "react";
import styles from "./grid.module.css";
import Resistor from "./circuit/resistor";
import OpAmp from "./circuit/opamp";
import Capacitor from "./circuit/capacitor";
import Inductor from "./circuit/inductor";
import VoltageSource from "./circuit/voltage";
import CurrentSource from "./circuit/current";
import Ground from "./circuit/ground";
import Connection from "./circuit/connection";
import CurrentLabel from "./circuit/currentLabel";
import VoltagePin from "./circuit/voltagePin";
import PathContext from "../PathContext";
import PNPBJT from "./circuit/pnpbjt";
import NPNBJT from "./circuit/npnbjt";
import PMOSFET from "./circuit/pmosfet";
import NMOSFET from "./circuit/nmosfet";
import Diode from "./circuit/diode";
import LED from "./circuit/led";
import Thermistor from "./circuit/thermistor";
import PhotoResistor from "./circuit/photoresistor";
import SPSTSwitch from "./circuit/spst";
import SPDTSwitch from "./circuit/spdt";
import DPSTSwitch from "./circuit/dpst";
import DPDTSwitch from "./circuit/dpdt";

export const ModeContext = createContext("normal");

export function ConnectionGrid({ setText, inputAllowed, setPath, clearBuffer }) {
  let [disableInput, _setDisableInput] = useState(!inputAllowed);
  console.log(disableInput);
  const disabledRef = useRef(disableInput);
  const setDisableInput = (d) => {
    disabledRef.current = d;
    _setDisableInput(d);
  };
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
  };
  let [components, setComponents] = useState([]);
  const addComponent = (newComp) => {setComponents(comp => [...comp, newComp]);};
  let [connections, _setConnections] = useState([]);
  let setConnections = (c) => {
    _setConnections(c);
  };
  const addConnection = (conn) => {
    let res = [];
    setConnections(connections => {
      console.log(conn, connections);
      if (conn.type == "v") { // vertical
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
          if (c.type == "h" && sy <= c.y && c.y <= ey && c.sx <= conn.x && conn.x <= c.ex) {
            if (c.sx != conn.x && c.ex != conn.x) {
              final.push({...c, ex: conn.x});
              final.push({type: "h", id: incConnId(), y: c.y, sx: conn.x, ex: c.ex});
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
          if (c.type == "v" && sx <= c.x && c.x <= ex && c.sy <= conn.y && conn.y <= c.ey) {
            if (c.sy != conn.y && c.ey != conn.y) {
              final.push({...c, ey: conn.y});
              final.push({type: "v", id: incConnId(), x: c.x, sy: conn.y, ey: c.ey});
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
  };
  let [connid, setConnId] = useState(1);
  const connRef = useRef(connid);
  let incConnId = () => {
    connRef.current = connRef.current + 1;
    setConnId(cid => cid + 1);
    return connRef.current;
  };
  let [mode, setMode] = useState("normal");

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
    if (mode == "drawing") setStartPos(coerceToPoint({x: event.pageX, y: event.pageY}));
    else if (mode == "normal" || mode == "animating") setStartPos({x: event.pageX, y: event.pageY});
  }

  function onMouseMove(event) {
    let dx = event.pageX - startPos.x;
    let dy = event.pageY - startPos.y;
    if ((mode == "normal" || mode == "animating") && Math.hypot(dy, dx) > 6) {
      setMoved(moved => (moved == 1) ? 2 : moved);
    }
    if ((mode == "normal" || mode == "animating") && moved == 2) {
      setCenter({x: center.x - dx, y: center.y - dy});
      setStartPos({x: event.pageX, y: event.pageY});
    } else if (mode == "drawing" && moved == 1) {
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
    if (disabledRef.current) return;
    setComponents(comp => comp.filter((val) => (val.id != key && val.tetherId != key)));
  }

  function onDeleteConn(key) {
    if (disabledRef.current) return;
    setConnections(conn => conn.filter((val) => val.id != key));
  }

  function setValue(key, value) {
    if (disabledRef.current) return;
    setComponents(comp => comp.map((c) => (c.id == key) ? {...c, value} : c));
  }

  function setPosition(key, pos) {
    if (disabledRef.current) return;
    setComponents(comp => comp.map((c) => {
      if (c.id == key) return {...c, position: pos};
      else if (c.tetherId == key) {
        let rotated = rotateFuncs[c.orient](c.offset);
        return {...c, position: {x: pos.x + rotated.x, y: pos.y + rotated.y}};
      }
      else return c;
    }));
  }
  
  const rotateFuncs = [({x, y}) => {return {x, y};}, ({x, y}) => {return {x: -y, y: x};}, ({x, y}) => {return {x: -x, y: -y};}, ({x, y}) => {return {x: y, y: -x};}];

  function setOrientation(key, orient) {
    if (disabledRef.current) return;
    setComponents(comp => {
      let position = comp.filter((c) => c.id == key)[0].position;
      return comp.map((c) => {
        if (c.id == key) return {...c, orient};
        else if (c.tetherId == key) {
          let rotatedOffset = rotateFuncs[orient](c.offset);
          console.log("ROTSET", rotatedOffset);
          return {...c, position: {x: position.x + rotatedOffset.x, y: position.y + rotatedOffset.y}, orient};
        } else {
          return c;
        }
      });
    });
  }

  function onLabel(key, offset) {
    if (disabledRef.current) return;
    console.log("LABEL", key);
    setComponents(comp => {
      let tethered = comp.filter((c) => c.tetherId == key);
      if (tethered.length > 0) return comp;
      let c = comp.filter((c) => c.id == key)[0];
      if (typeof c.tetherId !== "undefined") return comp;
      console.log("INIT", c.position, offset);
      return [...comp, {
        id: incUid(),
        type: "clabel",
        tetherId: key,
        value: c.value,
        offset,
        orient: c.orient,
        position: {x: c.position.x + offset.x, y: c.position.y + offset.y},
      }];
    });
  }

  const setTextRef = useRef(setText);
  const clearBufferRef = useRef(clearBuffer);
  function loadExample(path) {
    if (path != "/" && mode == "normal") {
      setDisableInput(true);
      setComponents([]);
      setConnections([]);
      clearBufferRef.current();
      setMode("loading");
      console.log(path);
      fetch(`${path}.json`, {
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }).then((resp) => {
        return resp.json();
      }).then((script) => {
        console.log(script.deltas);
        setMode("animating");
        let t = 0;
        for (let item of script.deltas) {
          t += item.dt;
          setTimeout(() => {
            switch(item.type) {
            case "text": setTextRef.current(item.text); break;
            case "connection": addConnection(item.conn); break;
            case "component": addComponent(item.element); break;
            case "modifyValue": setComponents(comp => comp.map((c) => (c.id == item.id) ? {...c, value: item.value} : c)); break; 
            case "delComponent": setComponents(comp => comp.filter((c) => (c.id != item.id && c.tetherId != item.id))); break;
            }
          }, t * 1000);
        }
        setTimeout(() => {
          setMode("normal");
          setDisableInput(false);
          setPath("/");
        }, t * 1000);
      });
    }
  }

  let onKeyDown = useCallback((event) => {
    if (disabledRef.current) return;
    console.log(event.key);
    switch (event.key) {
    case "r":
      event.preventDefault();
      if (event.altKey) {
        addComponent({
          id: incUid(),
          type: "photoresistor",
          position: {x: 20, y: 20},
          value: 220,
          orient: 0
        });
      } else {
        addComponent({
          id: incUid(),
          type: "resistor",
          position: {x: 20, y: 20},
          value: 220,
          orient: 0
        });
      }
      break;
    case "R":
      event.preventDefault();
      addComponent({
        id: incUid(),
        type: "thermistor",
        position: {x: 20, y: 20},
        value: 220,
        orient: 0
      });
      break;
    case "o":
      event.preventDefault();
      addComponent({
        id: incUid(),
        type: "opamp",
        position: {x: 20, y: 20},
        orient: 0
      });
      break;
    case "c":
      event.preventDefault();
      addComponent({
        id: incUid(),
        type: "capacitor",
        position: {x: 20, y: 20},
        value: 0.000001,
        orient: 0
      });
      break;
    case "l":
      event.preventDefault();
      addComponent({
        id: incUid(),
        type: "inductor",
        position: {x: 20, y: 20},
        value: 1,
        orient: 0
      });
      break;
    case "v":
      event.preventDefault();
      addComponent({
        id: incUid(),
        type: "voltage",
        position: {x: 20, y: 20},
        value: 9,
        orient: 0
      });
      break;
    case "v":
      event.preventDefault();
      addComponent({
        id: incUid(),
        type: "vpin",
        position: {x: 20, y: 20},
        value: 0,
        orient: 0
      });
      break;
    case "i":
      event.preventDefault();
      addComponent({
        id: incUid(),
        type: "current",
        position: {x: 20, y: 20},
        value: 0.001,
        orient: 0
      });
      break;
    case "g":
      event.preventDefault();
      addComponent({
        id: incUid(),
        type: "ground",
        position: {x: 20, y: 20},
        value: 0.001,
        orient: 0
      });
      break;
    case "N":
      event.preventDefault();
      if (event.altKey) {
        addComponent({
          id: incUid(),
          type: "nmosfet",
          position: {x: 20, y: 20},
          value: 0.001,
          orient: 0
        });
      } else {
        addComponent({
          id: incUid(),
          type: "pnpbjt",
          position: {x: 20, y: 20},
          value: 0.001,
          orient: 0
        });
      }
      break;
    case "P":
      event.preventDefault();
      if (!event.altKey) {
        addComponent({
          id: incUid(),
          type: "npnbjt",
          position: {x: 20, y: 20},
          value: 0.001,
          orient: 0
        });
      } else {
        addComponent({
          id: incUid(),
          type: "pmosfet",
          position: {x: 20, y: 20},
          value: 0.001,
          orient: 0
        });
      }
      break;
    case "d":
      event.preventDefault();
      if (event.altKey) {
        addComponent({
          id: incUid(),
          type: "led",
          position: {x: 20, y: 20},
          value: 0,
          orient: 0
        });
      } else {
        addComponent({
          id: incUid(),
          type: "diode",
          position: {x: 20, y: 20},
          value: 0,
          orient: 0
        });
      }
      break;
    case "s":
      event.preventDefault();
      if (event.altKey) {
        addComponent({
          id: incUid(),
          type: "spdt",
          position: {x: 20, y: 20},
          value: 0,
          orient: 0
        });
      } else {
        addComponent({
          id: incUid(),
          type: "spst",
          position: {x: 20, y: 20},
          value: 0,
          orient: 0
        });
      }
      break;
    case "S":
      event.preventDefault();
      if (event.altKey) {
        addComponent({
          id: incUid(),
          type: "dpdt",
          position: {x: 20, y: 20},
          value: 0,
          orient: 0
        });
      } else {
        addComponent({
          id: incUid(),
          type: "dpst",
          position: {x: 20, y: 20},
          value: 0,
          orient: 0
        });
      }
      break;
    case "z":
      event.preventDefault();
      setMode(mode => {return {drawing: "normal", normal: "drawing", labelling: "labelling"}[mode];});
      break;
    case "x":
      event.preventDefault();
      setMode(mode => {return {drawing: "drawing", normal: "labelling", labelling: "normal"}[mode];});
      break;
    case "Escape":
      event.preventDefault();
      setMode("normal");
      break;
    case " ":
      event.preventDefault();
      setCenter({x: 0, y: 0});
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
    };
  }, []);

  const pathContext = useContext(PathContext);
  useEffect(() => {
    loadExample(pathContext);
  }, [pathContext]);
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
              value: c.value,
              orient: c.orient,
              setValue,
              setPosition,
              setOrientation,
              onDelete,
              onLabel,
              disableInput
            };
            switch(c.type) {
            case "resistor":
              return <Resistor {...props}/>;
            case "thermistor":
              return <Thermistor {...props}/>;
            case "photoresistor":
              return <PhotoResistor {...props}/>;
            case "opamp":
              return <OpAmp {...props}/>;
            case "capacitor":
              return <Capacitor {...props}/>;
            case "inductor":
              return <Inductor {...props}/>;
            case "voltage":
              return <VoltageSource {...props}/>;
            case "vpin":
              return <VoltagePin {...props}/>;
            case "current":
              return <CurrentSource {...props}/>;
            case "ground":
              return <Ground {...props}/>;
            case "clabel":
              return <CurrentLabel offset={c.offset} {...props}/>;
            case "pnpbjt":
              return <PNPBJT {...props}/>;
            case "npnbjt":
              return <NPNBJT {...props}/>;
            case "pmosfet":
              return <PMOSFET {...props}/>;
            case "nmosfet":
              return <NMOSFET {...props}/>;
            case "diode":
              return <Diode {...props}/>;
            case "led":
              return <LED {...props}/>;
            case "spst":
              return <SPSTSwitch {...props}/>;
            case "spdt":
              return <SPDTSwitch {...props}/>;
            case "dpst":
              return <DPSTSwitch {...props}/>;
            case "dpdt":
              return <DPDTSwitch {...props}/>;
                
            }
          })}
        </ModeContext.Provider>
      </g> 
      <g>
        {connections.map((val) => {
          switch (val.type) {
          case "h":
            return <Connection id={val.id} key={val.id} start={{x: val.sx, y: val.y}} end={{x: val.ex, y: val.y}} onDelete={onDeleteConn} />;
          case "v":
            return <Connection id={val.id} key={val.id} start={{x: val.x, y: val.sy}} end={{x: val.x, y: val.ey}} onDelete={onDeleteConn} />;
          default:
            return <p>{val.type}</p>;
          } 
        })}
      </g>
    </g>
  </>;
}