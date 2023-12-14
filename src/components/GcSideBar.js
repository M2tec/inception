import * as React from 'react';
import { 
  Files, 
  PlayFill, 
  CloudUploadFill,
  ArrowReturnLeft,
  Save
} from 'react-bootstrap-icons';
import Nav from 'react-bootstrap/Nav';
import { AppContext } from '../AppContext';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';

const gc = window.gc;

async function buildActionUrl_lock(lock_script) {
	const url = await gc.encode.url({
		input:JSON.stringify(lock_script),
		apiVersion:"2",
		network:"preprod",
		//encoding:"gzip",
	  });
	  console.log(url)
	  window.open(url)
}

const GcSideBar = () => {
  const { context, setContext } = React.useContext(AppContext)
  const isActiveAGCScript=context.active && context.active.endsWith('.gcscript');
  function handleClick(e) {

    console.log("Deploy");

    let contract = context.items[0].data;
    let datum = context.items[1].data;
    let redeemer = context.items[2].data;
    let gc_script = context.items[3].data;
        
    const Buffer = gc.utils.Buffer;                  
    let contractHex = Buffer.from(contract).toString('hex')
    
    let gc_compile = gc_script
              .replace("--contract.hl--", contractHex)
              .replace('"--datum.json--"', datum)
              .replace('"--redeemer.json--"', redeemer)
    
    let tx_object = JSON.parse(gc_compile)
  
    buildActionUrl_lock(tx_object)
  }

  return (
    <div className='x'>

    <Container size="sm">
    <Row><Button variant="primary"><Files size={"20px"}/></Button></Row>
    <Row><Button disabled={!isActiveAGCScript} onClick={handleClick} variant="primary"><PlayFill size={"20px"}/></Button></Row>
    <Row><Button variant="primary"><ArrowReturnLeft size={"20px"}/></Button></Row>
    <Row><Button variant="primary"><CloudUploadFill size={"20px"}/></Button></Row>
    </Container>
    </div>
  )
}

export default GcSideBar;