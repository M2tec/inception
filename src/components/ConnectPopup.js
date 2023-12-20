import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { useParams } from 'react-router-dom';

const gc = window.gc;

export default function ConnectPopup() {
    const location = useLocation();
    const { context, setContext } = React.useContext(AppContext)
    const [data, setData] = React.useState("");
    let { returnData } = useParams();

    const sessionID = localStorage.getItem('sessionID');

    console.log("Return data: " + returnData);

    React.useEffect(() => {

        let actionUrl = ""

        function buildScript() {
            console.log("Deploy");

            let contract = context.items[0].data;
            let datum = context.items[1].data;
            let redeemer = context.items[2].data;
            let gc_script_template = context.items[3].data;

            const Buffer = gc.utils.Buffer;
            let contractHex = Buffer.from(contract).toString('hex')

            let gc_compile = gc_script_template
                .replace("--contract.hl--", contractHex)
                .replace('"--datum.json--"', datum)
                .replace('"--redeemer.json--"', redeemer)

            let gc_script = JSON.parse(gc_compile)
            gc_script.returnURLPattern = window.location.origin + window.location.pathname + "connect/{result}";
            return gc_script
        }

        let gc_script = buildScript()

        async function buildActionUrl(gc_script) {
            const actionUrl = await gc.encode.url({
                input: JSON.stringify(gc_script),
                apiVersion: "2",
                network: "preprod",
                //encoding:"gzip",
            });

            // window.location.assign(actionUrl)
        }

        if (gc_script !== undefined) {
            console.log({ Script: gc_script })
            buildActionUrl(gc_script);
        }
    }, [])

    React.useEffect(() => {
        if (returnData !== undefined) {
            async function decodeActionUrl(returnData) {
                const resultObj = await gc.encodings.msg.decoder(returnData);
                setData(resultObj);
            }

            if (returnData !== undefined) {
                decodeActionUrl(returnData);
            }
        }

    }, [])

    React.useEffect(() => {
        if (data === "") {
            console.log("No data")
            return
        }

        console.log(data)
        // let time = new Date().toLocaleString();
        // let newDataItem = { timeReceived:time, data:data }

        // console.log({current:context.returnItems})

        // let newItems = [newDataItem, ...context.returnItems]

        // console.log({newItems:newItems})

        // let tempContext = { ...context, returnItems: newItems }

        // localStorage.setItem('tempContext', JSON.stringify(tempContext));

    }, [data, context])


    return (
        <>
            <div>{JSON.stringify(data, null, 2)}</div>
        </>
    )
}


