import styles from './svgsandbox.module.css';
import {ConnectionGrid} from "../svg/ConnectionGrid";
import { useEffect, useState } from 'react';
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
  useEffect(() => {
    if (index >= textBuffer.length) setIndex(textBuffer.length - 1);
  }, [index, textBuffer])

  return <div className={styles.sandbox}>
    <div className={styles.textbox} style={{display: (textBuffer[index] === "") ? "none" : "flex"}}>
      <p className={styles.text} style={{marginTop: '5vmin'}}>{textBuffer[Math.min(index, textBuffer.length-1)]}</p>
      <p style={{position: 'absolute', bottom: '1vmin', width: '100%', textAlign: 'center'}}>{index} of {textBuffer.length-1}</p>
      <button onClick={back} style={{position: 'absolute', bottom: '1vmin', left: '1vmin', width: '3vmin', height: '3vmin'}} type="button">&lt;</button>
      <button onClick={forward} style={{position: 'absolute', bottom: '1vmin', right: '1vmin', width: '3vmin', height: '3vmin'}} type="button">&gt;</button>
      <button onClick={clearBuffer} style={{position: 'absolute', top: '1vmin', right: '1vmin', width: '3vmin', height: '3vmin'}} type="button">x</button>
    </div>
    <svg width="100%" height="100%" style={{position: 'absolute', top: 0, left: 0}}>
      <ConnectionGrid setText={bufferText} clearBuffer={clearBuffer} {...props}/>
    </svg> 
  </div>;
};