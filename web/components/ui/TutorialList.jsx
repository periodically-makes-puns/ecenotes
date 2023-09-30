import styles from "./tutoriallist.module.css";
import { useState } from "react";
import {Sidebar, SubMenu, Menu, MenuItem} from "react-pro-sidebar";


export default function TutorialList({ setPath }) {
  let [collapsed, setCollapsed] = useState(false);
  function handleClick(event) {
    console.log("WHAT");
    setCollapsed(c => !c);
    event.preventDefault();
  }


  function handleMenuClick(toLoad) {
    return () => {
      setPath(toLoad);
    };
  }

  return <div className={styles.menu}>
    <Sidebar className={styles.sidebar} collapsed={collapsed} collapsedWidth='0px' width="100%" rootStyles={{width: "100%"}}>
      <Menu>
        <MenuItem active="false" disabled>Movies</MenuItem>
        <SubMenu label="Components" defaultOpen={true}>
          <MenuItem onClick={handleMenuClick("components/resistor")}>Resistors</MenuItem>
          <MenuItem onClick={handleMenuClick("components/capacitor")}>Capacitor</MenuItem>
          <MenuItem onClick={handleMenuClick("components/inductor")}>Inductor</MenuItem>
          <MenuItem onClick={handleMenuClick("components/diode")}>Diodes</MenuItem>
          <MenuItem onClick={handleMenuClick("components/switch")}>Switches</MenuItem>
          <MenuItem onClick={handleMenuClick("components/voltagesource")}>Voltage Source</MenuItem>
          <MenuItem onClick={handleMenuClick("components/currentsource")}>Current Source</MenuItem>
          <SubMenu label="Op-Amps">
            <MenuItem onClick={handleMenuClick("components/opamp")}>Intro</MenuItem>
          </SubMenu>
          <SubMenu label="Transistors">
            <MenuItem onClick={handleMenuClick("components/bjt")}>BJTs</MenuItem>
            <MenuItem onClick={handleMenuClick("components/mosfet")}>MOSFETs</MenuItem>
          </SubMenu>
        </SubMenu>
        <SubMenu label="Circuit Analysis">
          <MenuItem onClick={handleMenuClick("analysis/replacement")}>Basic Replacement</MenuItem>
          <MenuItem onClick={handleMenuClick("analysis/units")}>SI Units</MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
    <button onClick={handleClick} className={styles.menuButton} type="button">
      <svg style={{textAlign: "center"}} height="100%" width="100%" viewBox="-10 -10 20 20">
        <path d="M -10 -10 h 20 M -10 0 h 20 M -10 10 h 20" stroke="black"></path>
      </svg>
    </button>
  </div>;
}