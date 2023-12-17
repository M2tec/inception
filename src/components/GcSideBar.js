import * as React from 'react';
import {
  Files,
  PlayFill,
  CloudUploadFill,
  ArrowReturnLeft,
} from 'react-bootstrap-icons';
import { AppContext } from '../AppContext';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';

const gc = window.gc;

async function buildActionUrl_lock(lock_script) {
  const url = await gc.encode.url({
    input: JSON.stringify(lock_script),
    apiVersion: "2",
    network: "preprod",
    //encoding:"gzip",
  });

  window.open(url)
}

const GcSideBar = () => {
  const { context, setContext } = React.useContext(AppContext)
  const isActiveAGCScript = context.active && context.active.endsWith('.gcscript');

  // Script construction
  function handleClickRun(e) {

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
    tx_object.returnURLPattern = window.location.origin + window.location.pathname + "return-data/{result}";

    buildActionUrl_lock(tx_object)
  }

  function handleClickData(e) {
    let url = window.location.origin + window.location.pathname + "return-data";
    console.log(url)

    let testUrl = "http://localhost:3000/return-data/1-H4sIAAAAAAAAA11QTU8rMQz8Lzn3kDhfm94Q7_CQEFxAQkJPyGtnW2iz201SaLfqf3_bInHAt5mxx_acRDzshlyLWJ7E_UCbtz8xDRewncHz08ujWMrFFYjl60nshu07He9YLAUyioXAUmJ9wBR_mHGPfX2vx5mw8lri_G8hSsJcb4e-ZqR60Zy1Ul1kALBaa-u1cS4qYnaNVKpFllIrExrbKPHL4C-W9WxCMHdYhQ4btLbF2EHUrCW4IOcxNEDWxpZbz8rIiByVR6vlb7sb5hxLuf7A-a3GUtWUd-MhrBxDCPVrLQP5fuxsKZtwDBr8epNwKg0kqg4-A49fH7DX_JFxJVPsI1AKcbu3icdEU5gI8rQaPdmVG-2BepPFd7BPh3lvG6h10rCi-UqF3RwCBSM1YTRKgTatCrEjT-QbUiSdxM4Fb1zHAJpAnM_n_6NIvcTNAQAA"
    window.location.replace(testUrl)
  }

  function handleClickFiles(e) {
    let url = window.location.origin;
    console.log(url)
    window.location.replace(url)
  }

  return (
    <div className='x'>

      <Container size="sm">
        <Row><Button onClick={handleClickFiles} variant="primary"><Files size={"20px"} /></Button></Row>
        <Row><Button onClick={handleClickRun} disabled={!isActiveAGCScript}  variant="primary"><PlayFill size={"20px"} /></Button></Row>
        <Row><Button onClick={handleClickData} variant="primary"><ArrowReturnLeft size={"20px"} /></Button></Row>
        <Row><Button variant="primary"><CloudUploadFill size={"20px"} /></Button></Row>
      </Container>
    </div>
  )
}

export default GcSideBar;