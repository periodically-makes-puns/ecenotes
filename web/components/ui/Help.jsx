import {useState} from 'react';
import styles from './help.module.css';
import HotkeyTable from './help/HotkeyTable';

export default function Help() {
    let [isOpen, _setOpen] = useState(false);
    let helpBoxStyle = (isOpen) ? styles.helpBoxOpen : styles.helpBoxClosed;
    function onClick(event) {
      _setOpen(!isOpen);
      event.stopPropagation();
      event.preventDefault();
    }

    return <div className={styles.help}>
        <div className={[styles.helpBox,helpBoxStyle].join(" ")}>
          <HotkeyTable />
          <a className={styles.githubLink} href="https://github.com/periodically-makes-puns/ecenotes/">GitHub</a>
        </div>
      <button type="button" className={styles.helpButton} onClick={onClick}>?</button>
    </div>
};