import styles from './tutoriallist.module.css';
import { useState } from 'react';
import {Sidebar, SubMenu, Menu, MenuItem} from 'react-pro-sidebar'


export default function TutorialList({ setPath }) {
  let [collapsed, setCollapsed] = useState(false);
  function handleClick(event) {
    console.log("WHAT");
    setCollapsed(c => !c);
    event.preventDefault();
  }


  function handleMenuClick(toLoad) {
    return () => {
      setPath(toLoad)
    };
  }

  return <div className={styles.menu}>
    <Sidebar className={styles.sidebar} collapsed={collapsed} collapsedWidth='0px' width="100%">
      <Menu rootStyles={{width: "100%"}}>
        <SubMenu label="Components" defaultOpen={true}>
          <MenuItem onClick={handleMenuClick("components/resistor")}>Resistor</MenuItem>
          {/* <MenuItem onClick={handleMenuClick("components/capacitor")}>Capacitor</MenuItem>
          <MenuItem onClick={handleMenuClick("components/inductor")}>Inductor</MenuItem>
          <MenuItem onClick={handleMenuClick("components/voltage_source")}>Voltage Source</MenuItem>
          <MenuItem onClick={handleMenuClick("components/current_source")}>Current Source</MenuItem> */}
        </SubMenu>
      </Menu>
    </Sidebar>
    <button onClick={handleClick} className={styles.menuButton} type="button">
      <svg style={{textAlign: 'center'}} height="100%" width="100%" viewBox="-10 -10 20 20">
        <path d="M -10 -10 h 20 M -10 0 h 20 M -10 10 h 20" stroke="black"></path>
      </svg>
    </button>
  </div>
};