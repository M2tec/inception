import React from 'react';
import { AppContext } from '../AppContext';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { XCircle } from 'react-bootstrap-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';

const gc = window.gc;

export default function ConnectPopup() {
    let count = 1
    const { context, setContext } = React.useContext(AppContext)

    document.querySelector("body").setAttribute('data-theme', 'dark')

    const [resultObj, setResultObj] = React.useState({});
    let { returnData } = useParams();

    // console.log("Return data: " + returnData);

    React.useEffect(() => {

        if (returnData !== undefined) {
            // Receiving data 
            async function decodeActionUrl(returnData) {
                const resultObj = await gc.encodings.msg.decoder(returnData);
                setResultObj(resultObj)
                localStorage.setItem("gc_return_data", JSON.stringify(resultObj))


                setContext(oldContext => {

                    let newContext = { ...oldContext }

                    let sessionID = localStorage.getItem("SessionID")
                    if (sessionID == 1) {
                        moment.locale('en');
                        let fileName = "returndata-" + moment().format('y-M-D_h-m') + ".json"


                        // console.log("save item")
                        let newItem = {
                            name: fileName,
                            type: "json",
                            data: JSON.stringify(resultObj, null, 4)
                        }

                        newContext.dataItems.returndata.items.unshift(newItem)
                        localStorage.setItem('tempContext', JSON.stringify(newContext));
                    }
                    localStorage.setItem("SessionID", 0)

                    // console.log(newContext)

                    return newContext
                })
            }

            if (returnData !== undefined) {
                decodeActionUrl(returnData);
            }


        } else {
            // Sending data 
            let gc_script = localStorage.getItem("gc_script")

            async function buildActionUrl(gc_script) {
                const actionUrl = await gc.encode.url({
                    input: gc_script,
                    apiVersion: "2",
                    network: "preprod",
                    //encoding:"gzip",
                });

                localStorage.setItem("SessionID", 1)
                window.location.assign(actionUrl)
            }

            if (gc_script !== undefined) {
                // console.log({ Script: gc_script })
                buildActionUrl(gc_script);
            }
        }
    }, [returnData])

    return (
        <>
            {/* {window.resizeTo(875, 755)} */}
            {window.resizeTo(1200, 755)}
            {returnData === undefined ?
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


