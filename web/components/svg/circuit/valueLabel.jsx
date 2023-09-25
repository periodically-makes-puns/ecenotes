import styles from './valuelabel.module.css';
const SIprefixes = ["p", "n", "μ", "m", "", "k", "M", "G", "T"];
const NO_MUL = 4;

export default function ValueLabel({position, alignment, value, unit}) {
  let unitPrefix = NO_MUL;
  while (1 > value) {
    unitPrefix--; value *= 1000;
  }
  while (1000 <= value) {
    unitPrefix++; value /= 1000;
  }
  return <text className={styles.valuelabel} x={position.x} y={position.y} textAnchor={alignment}>{Math.round(value*1000)/1000 + SIprefixes[unitPrefix] + unit}</text>
}