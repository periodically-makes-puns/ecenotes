import styles from "./hotkey.module.css";

export type HotkeyProps = {
  hotkey: string;
  desc: string;
}

export default function Hotkey({hotkey, desc} : HotkeyProps) {
  return <tr>
    <td><button className={styles.hotkey} disabled type="button" value={hotkey}>{hotkey}</button></td>
    <td>{desc}</td>
  </tr>;
}