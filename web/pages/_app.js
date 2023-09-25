import Sidebar from '../components/ui/Sidebar';
import SvgSandbox from '../components/ui/SvgSandbox';
import Help from '../components/ui/Help';
import '../style/global.css';
import Head from 'next/head'

function HomePage() {
  return <>
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    </Head>
  <div>
    <Sidebar />
    <SvgSandbox />
    <Help />
  </div> </>;
}

export default HomePage;