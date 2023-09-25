import styles from './hotkey.module.css';

export default function Hotkey({hotkey, desc}) {
  return <tr>
    <td><button className={styles.hotkey} disabled type="button" value={hotkey}>{hotkey}</button></td>
    <td>{desc}</td>
  </tr>
}