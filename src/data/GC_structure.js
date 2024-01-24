let gc =
{
    // Only one?
    type: "script",
    title: "string",
    description: "string",
    args: {
        "mydata": {
            "question": "Hello World!",
            "universe": 42
        }
    },
    argsByKey: {},
    return: [
        {
            mode: "none"
        },
        {
            mode: "all"
        },
        {
            mode: "first"
        },
        {
            mode: "last"
        },
        {
            mode: "one",
            key: "node1"
        },
        {
            mode: "some",
            keys: ["node1", "node2" ]

        },
        {
            mode: "macro",
            exec: "gcscript"
        }
    ],
    exportAs: "export_name:string",
    isolateCache: {},
    run: [
        {
            type: "await"
        },
        {
            type: "getPublicKeys"
        },
        {
            type: "getAddresses",

        },
        {
            type: "setCurrentWorkspace"
        },
        {
            type: "loadConfig"
        },
        {
            type: "saveConfig"
        },
        {
            type: "enableTerminalMode"
        },
        {
            type: "data"
        },
        {
            type: "getCurrentAddress"
        },
        {
            type: "getCurrentIdentity"
        },
        {
            type: "getMainAddress"
        },
        {
            type: "getMainIdentity"
        },  
        {
            type: "getName"
        },
        {
            type: "getCurrentSlot"
        },   
        {
            type: "getSpendingPublicKey"
        },   
        {
            type: "getStakingPublicKey"
        },   
        {
            type: "buildAddress"
        },   
        {
            type: "deriveKeys"
        },   
        {
            type: "buildTx"
        },   
        {
            type: "signTx"
        },   
        {
            type: "signTxs"
        },   
        {
            type: "submitTx"
        },   
        {
            type: "submitTxs"
        },   
        {
            type: "awaitTx"
        },   
        {
            type: "signDataWithAddress"
        },   
        {
            type: "verifySignatureWithAddress"
        },   
        {
            type: "encrypt"
        },   
        {
            type: "decrypt"
        },   
        {
            type: "searchFs"
        },   
        {
            type: "buildFsTxs"
        },   
        {
            type: "certificate"
        },   
        {
            type: "nativeScript"
        },   
        {
            type: "plutusScript"
        },   
        {
            type: "plutusData",
            data: {
                fromJSON: {
                    schema: 1,
                    obj: "get('cache.dependencies.datumJson.datum')"
                }
            }
        },   
        {
            type: "macro"
        },   
        {
            type: "importAsScript"
        },   
        {
            type: "importAsData"
        },   
        {
            type: "walletGenerator"
        },  
        {
            type: "script"
        },  


        
    ]

}