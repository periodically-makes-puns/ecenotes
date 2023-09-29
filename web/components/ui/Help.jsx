import {useState} from 'react';
import styles from './help.module.css';
import HotkeyTable from './help/HotkeyTable';

export default function Help() {
    let [isOpen, _setOpen] = useState(true);
    let helpBoxStyle = (isOpen) ? styles.helpBoxOpen : styles.helpBoxClosed;
    function onClick(event) {
      _setOpen(!isOpen);
      event.stopPropagation();
      event.preventDefault();
    }

    return <div className={styles.help}>
        <div className={[styles.helpBox,helpBoxStyle].join(" ")}>
          <HotkeyTable />
          <div className={styles.githubLink}>
            <p>To delete an element, grab it then press Backspace. Alternative versions of components can be accessed with Alt and Shift.</p>
            By Eric Yang.
            <a href="https://github.com/periodically-makes-puns/ecenotes/">GitHub</a>
          </div>
        </div>
      <button type="button" className={styles.helpButton} onClick={onClick}>?</button>
    </div>
};