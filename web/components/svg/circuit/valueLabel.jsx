import styles from './valuelabel.module.css';
const SIprefixes = ["p", "n", "μ", "m", "", "k", "M", "G", "T"];
const NO_MUL = 4;

export default function ValueLabel({position, alignment, verticalAlignment, value, unit}) {
  console.log(value);
  let unitPrefix = NO_MUL;
  let neg = value < 0;
  if (value < 0) value = -value;
  if (value > 0) {
    while (1 > value) {
      unitPrefix--; value *= 1000;
    }
    while (1000 <= value) {
      unitPrefix++; value /= 1000;
    }
  }
  if (neg) value = -value;
  return <text className={styles.valuelabel} x={position.x} y={position.y} textAnchor={alignment} dominantBaseline={verticalAlignment}>{Math.round(value*1000)/1000 + SIprefixes[unitPrefix] + unit}</text>
}