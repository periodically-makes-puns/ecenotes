import Hotkey from './Hotkey';

export default function HotkeyTable() {
  return <table>
    <tbody>
      <Hotkey hotkey="q" desc="Rotate Held Clockwise" />
      <Hotkey hotkey="e" desc="Rotate Held Anticlockwise" />
      <Hotkey hotkey="m" desc="Modify Held" />
      <Hotkey hotkey="v" desc="Voltage Source" />
      <Hotkey hotkey="p" desc="Voltage Pin" />
      <Hotkey hotkey="i" desc="Current Source" />
      <Hotkey hotkey="r" desc="Resistors" />
      <Hotkey hotkey="l" desc="Inductor" />
      <Hotkey hotkey="c" desc="Capacitor" />
      <Hotkey hotkey="o" desc="Op Amp" />
      <Hotkey hotkey="d" desc="Diodes" />
      <Hotkey hotkey="s" desc="Switches" />
      <Hotkey hotkey="N" desc="N-Type Transistors" />
      <Hotkey hotkey="P" desc="P-Type Transistors" />
      <Hotkey hotkey="z" desc="Toggle Drawing Mode" />
      <Hotkey hotkey="x" desc="Toggle Labelling Mode" />
    </tbody>
  </table>
}