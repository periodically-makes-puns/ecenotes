import styles from "./svgsandbox.module.css";
import {ConnectionGrid} from "../svg/ConnectionGrid";
import { useEffect, useState, useRef } from "react";
export default function SvgSandbox(props) {
  let [textBuffer, setTextBuffer] = useState([""]);
  let [index, setIndex] = useState(0);
  function bufferText(text) {
    setTextBuffer(buf => {
      let ind = buf.length;
      setIndex(ind);
      return [...buf, text];
    });
  }

  function clearBuffer() {
    setTextBuffer([""]);
    setIndex(0);
  }

  function back() {
    setIndex(ind => (ind > 1) ? (ind - 1) : 1);
  }
  function forward() {
    setIndex(ind => ind + 1);
  }

  let [moved, _setMoved] = useState(0);
  const movedRef = useRef(moved);
  const setMoved = (data) => {
    movedRef.current = data;
    _setMoved(data);
  };

  let [startPos, _setStartPos] = useState({x: 0, y: 0});
  const startPosRef = useRef(startPos);
  const setStartPos = (data) => {
    startPosRef.current = data;
    _setStartPos(data);
  };
  let [center, setCenter] = useState({x: 300, y: 300});

  function onMouseDown(event) {
    if (movedRef.current == 0) {
      setMoved(1);
      setStartPos({x: event.pageX, y: event.pageY});
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      event.stopPropagation();
    }
    event.preventDefault();
  }

  function onMouseMove(event) {
    let dx = event.pageX - startPosRef.current.x;
    let dy = event.pageY - startPosRef.current.y;
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

  function onMouseUp(event) {
    setMoved(0); // snap to grid
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    event.stopPropagation();
    event.preventDefault();
  }

  useEffect(() => {
    if (index >= textBuffer.length) setIndex(textBuffer.length - 1);
  }, [index, textBuffer]);

  return <div className={styles.sandbox}>
    <div onMouseDown={onMouseDown} className={styles.textbox} style={{display: (textBuffer[index] === "") ? "none" : "flex", top: center.y, left: center.x}}>
      <p className={styles.text} style={{marginTop: "5vmin"}}>{textBuffer[Math.min(index, textBuffer.length-1)]}</p>
      <p style={{position: "absolute", bottom: "1vmin", width: "100%", textAlign: "center"}}>{index} of {textBuffer.length-1}</p>
      <button disabled={index == 1} onClick={back} style={{position: "absolute", bottom: "1vmin", left: "1vmin", width: "3vmin", height: "3vmin"}} type="button">&lt;</button>
      <button disabled={textBuffer.length - 1 == index} onClick={forward} style={{position: "absolute", bottom: "1vmin", right: "1vmin", width: "3vmin", height: "3vmin"}} type="button">&gt;</button>
      <button onClick={clearBuffer} style={{position: "absolute", top: "1vmin", right: "1vmin", width: "3vmin", height: "3vmin"}} type="button">x</button>
    </div>
    <svg width="100%" height="100%" style={{position: "absolute", top: 0, left: 0}}>
      <ConnectionGrid setText={bufferText} clearBuffer={clearBuffer} {...props}/>
    </svg> 
  </div>;
}