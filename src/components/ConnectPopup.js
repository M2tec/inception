import React from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { XCircle } from 'react-bootstrap-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const gc = window.gc;

export default function ConnectPopup() {
    document.querySelector("body").setAttribute('data-theme', 'dark')

    const location = useLocation();
    // const { context, setContext } = React.useContext(AppContext)
    const [resultObj, setResultObj] = React.useState({});
    let { returnData } = useParams();

    const sessionID = localStorage.getItem('sessionID');

    console.log("Return data: " + returnData);

    React.useEffect(() => {

        if (returnData !== undefined) {
            async function decodeActionUrl(returnData) {
                const resultObj = await gc.encodings.msg.decoder(returnData);
                setResultObj(resultObj)
                localStorage.setItem("gc_return_data", JSON.stringify(resultObj))
                // setData(resultObj);
            }

            if (returnData !== undefined) {
                decodeActionUrl(returnData);
            }

        } else {

            let gc_script = localStorage.getItem("gc_script")

            async function buildActionUrl(gc_script) {
                const actionUrl = await gc.encode.url({
                    input: gc_script,
                    apiVersion: "2",
                    network: "preprod",
                    //encoding:"gzip",
                });

                window.location.assign(actionUrl)
            }

            if (gc_script !== undefined) {
                console.log({ Script: gc_script })
                buildActionUrl(gc_script);
            }
        }
    }, [])

    return (
        <>
                {window.resizeTo(875, 755)}
                {returnData == undefined ?
                    <div>Redirecting to Gamechanger wallet</div>
                : (
                    <div className='fontwhite p-4'>
                        <div className='p-4 square border-1 border-danger rounded'>
                        <pre>{JSON.stringify(resultObj, null, 2)}</pre>
                        </div>
                        <Button className="m-4" onClick={window.close} variant="warning"><Row><Col className='buttonPadding'><XCircle size={"20px"} /></Col><Col className='buttonPadding'>Close</Col></Row></Button>
                    </div>
                )
            }
        </>
    )
}

