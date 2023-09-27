import styles from './svgsandbox.module.css';
import {ConnectionGrid} from "../svg/ConnectionGrid";
export default function SvgSandbox() {
  return <div className={styles.sandbox}>
    <svg width="100%" height="100%">
      <ConnectionGrid />
    </svg> 
  </div>;
};