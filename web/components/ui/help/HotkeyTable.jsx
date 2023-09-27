import Hotkey from './Hotkey';

export default function HotkeyTable() {
  return <table>
    <tbody>
      <Hotkey hotkey="Q" desc="Rotate Held Clockwise" />
      <Hotkey hotkey="E" desc="Rotate Held Anticlockwise" />
      <Hotkey hotkey="M" desc="Modify Held" />
      <Hotkey hotkey="V" desc="Voltage Source" />
      <Hotkey hotkey="P" desc="Voltage Pin" />
      <Hotkey hotkey="I" desc="Current Source" />
      <Hotkey hotkey="R" desc="Resistor" />
      <Hotkey hotkey="L" desc="Inductor" />
      <Hotkey hotkey="C" desc="Capacitor" />
      <Hotkey hotkey="O" desc="Op Amp" />
      <Hotkey hotkey="D" desc="Toggle Drawing Mode" />
      <Hotkey hotkey="T" desc="Toggle Labelling Mode" />
    </tbody>
  </table>
}