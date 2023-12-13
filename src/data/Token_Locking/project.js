const project = {
    "name": "Token_Locking",
    "type": "folder",
    "openFiles": ["contract.hl"],
    "theme": 'dark',
    "items": [
        {
            "name": "contract.hl",
            "type": "helios",
            "data": `
spending MagicNumber

struct Datum {
    magicNumber: Int
}

struct Redeemer {
    magicNumber: Int 
}

func main(datum: Datum, redeemer: Redeemer, _) -> Bool {   
    redeemer.magicNumber==datum.magicNumber
}`
        },
        {
            "name": "datum.json",
            "type": "json",
            "data":`
{
"type": "plutusData",
"data": {
"fromJSON": {
    "schema": 1,
    "obj": {
        "int": 42
        }
}
}
}            
    `
},
{
    "name": "redeemer.json",
    "type": "json",
    "data":`
{
"type": "plutusData",
"data": {
"fromJSON": {
    "schema": 1,
    "obj": {
        "int": 42
        }
}
}
}            
    `
},
{
    "name": "gc_script_template.json",
    "type": "json",
    "data":`
{
    "type": "script",
    "title": "Lock script",
    "description": "This contract will lock some tokens",
    "exportAs": "Lock_Demo",
    "return": {
        "mode": "last"
    },
    "run": {
        "dependencies": {
            "type": "script",
            "run": {
                "datum": "--datum--",
                "lock": "--redeemer--",
                "stakeCredential": {
                    "type": "data",
                    "value": "ad03a4ae45b21f50fde67956365cff94db41bc08a2c2862403d8a234"
                },
                "contract": {
                    "type": "plutusScript",
                    "script": {
                        "scriptHex": "--script--",
                        "lang": "plutus_v2"
                    }
                },
                "address": {
                    "type": "buildAddress",
                    "name": "ContractAddress",
                    "addr": {
                        "spendScriptHashHex": "{get('cache.dependencies.contract.scriptHashHex')}",
                        "stakePubKeyHashHex": "{get('cache.dependencies.stakeCredential')}"
                    }
                }
            }
        },
        "buildLock": {
            "type": "buildTx",
            "name": "built-lock",
            "tx": {
                "outputs": [
                    {
                        "address": "{get('cache.dependencies.address')}",
                        "datum": {
                            "datumHashHex": "{get('cache.dependencies.datum.dataHashHex')}"
                        },
                        "assets": "{get('cache.dependencies.lock')}",
                        "idPattern":"locked"
                    }
                ],
                "options": {
                    "changeOptimizer": "NO"
                }
            }
        },
        "signLock": {
            "type": "signTxs",
            "namePattern": "signed-lock",
            "detailedPermissions": false,
            "txs": [
                "{get('cache.buildLock.txHex')}"
            ]
        },
        "submitLock": {
            "type": "submitTxs",
            "namePattern": "submitted-lock",
            "txs": "{get('cache.signLock')}"
        },
        "finally": {
            "type": "script",
            "run": {
                "lock": {
                    "type": "macro",
                    "run": "{get('cache.dependencies.lock')}"
                },
                "smartContract": {
                    "type": "macro",
                    "run": "{get('cache.dependencies.contract.scriptHex')}"
                },
                "smartContractHash": {
                    "type": "macro",
                    "run": "{get('cache.dependencies.contract.scriptHashHex')}"
                },
                "smartContractAddress": {
                    "type": "macro",
                    "run": "{get('cache.dependencies.address')}"
                },
                "lockTx": {
                    "type": "macro",
                    "run": "{get('cache.buildLock.txHash')}"
                },
                "lockUTXO": {
                    "type": "macro",
                    "run": "{get('cache.buildLock.indexMap.output.locked')}"
                }
            }
        }
    }
}
`
        }        
    ]
};

export default project;

