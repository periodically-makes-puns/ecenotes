import TutorialList from '../components/ui/TutorialList';
import SvgSandbox from '../components/ui/SvgSandbox';
import Help from '../components/ui/Help';
import '../style/global.css';
import Head from 'next/head'
import PathContext from '../components/PathContext';
import { useState } from 'react';

function HomePage() {
  let [path, setPath] = useState("/");
  return <>
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    </Head>
  <div style={{position: 'relative'}}>
    <PathContext.Provider value={path}>
      <TutorialList setPath={setPath}/>
      <SvgSandbox setPath={setPath} inputAllowed={true}/>
      <Help />
    </PathContext.Provider>
  </div> </>;
}

export default HomePage;