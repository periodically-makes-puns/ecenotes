import { Coordinates, Value } from "./types";
import styles from "./valuelabel.module.css";
const SIprefixes = ["p", "n", "μ", "m", "", "k", "M", "G", "T"];
const NO_MUL = 4;

export type ValueLabelProps = {
  position: Coordinates,
  alignment?: string,
  verticalAlignment?: string,
  value: Value,
  unit: string
}

export default function ValueLabel({position, alignment, verticalAlignment, value, unit} : ValueLabelProps) {
  let unitPrefix = NO_MUL;
  let neg;
  if (typeof value == "number") {
    neg = value < 0;
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
    value = Math.round(value*1000)/1000;
  }
  return <text className={styles.valuelabel} x={position.x} y={position.y} textAnchor={alignment} dominantBaseline={verticalAlignment}>{value + ((typeof value == "number") ? (SIprefixes[unitPrefix] + unit) : "")}</text>;
}