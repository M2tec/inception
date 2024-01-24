const project = {
  "name": "Token_Locking",
  "type": "folder",
  "currentFileIndex": 9,
  "openFiles": [
  ],
  "files": [
    {
      "id": 0,
      "name": "contract.hl",
      "parentId": -1,
      "type": "helios",
      "data": "\nspending MagicNumber\n\nstruct Datum {\n    magicNumber: Int\n}\n\nstruct Redeemer {\n    magicNumber: Int \n}\n\nfunc main(datum: Datum, redeemer: Redeemer, _) -> Bool {   \n    redeemer.magicNumber==datum.magicNumber\n}"
    },
    {
      "id": 1,
      "name": "datum.json",
      "parentId": -1,
      "type": "json",
      "data": "{\n    \"int\": 42\n}"
    },
    {
      "id": 2,
      "name": "redeemer.json",
      "parentId": -1,
      "type": "json",
      "data": "{\n    \"int\": 42\n}"
    },
    {
      "id": 3,
      "name": "1_create_contract.gcscript",
      "parentId": -1,
      "type": "json",
      "data": "{\n    \"type\": \"script\",\n    \"title\": \"Lock script\",\n    \"description\": \"This script will deploy the Helios script on the blockchain\",\n    \"exportAs\": \"Lock_Contract\",\n    \"return\": {\n        \"mode\": \"last\"\n    },\n    \"run\": {\n        \"helios\":{\n            \"type\":\"$importAsData\",\n            \"as\":\"hex\",\n            \"from\":{\n                \"contract\":\"ide://contract.hl\"\n            }\n        },\n        \"stakeCredential\": {\n            \"type\": \"data\",\n            \"value\": \"ad03a4ae45b21f50fde67956365cff94db41bc08a2c2862403d8a234\"\n        },\n        \"contract\": {\n            \"type\": \"plutusScript\",\n            \"script\": {\n                \"heliosCode\": \"{hexToStr(get('cache.helios.contract'))}\",\n                \"version\": \"0.15.2\"\n            }\n        },                \n        \"address\": {\n            \"type\": \"buildAddress\",\n            \"name\": \"ContractAddress\",\n            \"addr\": {\n                \"spendScriptHashHex\": \"{get('cache.contract.scriptHashHex')}\",\n                \"stakePubKeyHashHex\": \"{get('cache.stakeCredential')}\"\n            }\n        },\n        \"finally\": {\n            \"type\": \"script\",\n            \"run\": {\n                \"lang\": {\n                    \"type\": \"macro\",\n                    \"run\": \"{get('cache.contract.lang')}\"\n                },\n                \"hex\": {\n                    \"type\": \"macro\",\n                    \"run\": \"{get('cache.contract.scriptHex')}\"\n                },\n                \"hash\": {\n                    \"type\": \"macro\",\n                    \"run\": \"{get('cache.contract.scriptHashHex')}\"\n                },\n                \"address\": {\n                    \"type\": \"macro\",\n                    \"run\": \"{get('cache.address')}\"\n                }\n            }\n        }\n    }\n}\n\n"
    },
    {
      "id": 4,
      "parentId": -1,
      "name": "contract_data.json",
      "type": "json",
      "data": "{\n    \"lang\": \"plutus_v2\",\n    \"hex\": \"56550100002225333573466e1cdd68011bad0031498581\",\n    \"hash\": \"c203151a6a8a55baef2e3d302690858a42c55ebdb7d140eade17a530\",\n    \"address\": \"addr_test1zrpqx9g6d299twh09c7nqf5ssk9y9327hkmazs82mct62v9dqwj2u3djrag0mene2cm9elu5mdqmcz9zc2rzgq7c5g6q5xcn4r\"\n}"
    },
    {
      "id": 5,
      "name": "2_token_lock.gcscript",
      "parentId": -1,
      "type": "json",
      "data": "{\n    \"type\": \"script\",\n    \"title\": \"Lock script\",\n    \"description\": \"This contract will lock some tokens\",\n    \"exportAs\": \"Lock_Demo\",\n    \"return\": {\n        \"mode\": \"last\"\n    },\n    \"run\": {\n        \"dependencies\": {\n            \"type\": \"script\",\n            \"run\": {\n                \"datumJson\": {\n                    \"type\": \"$importAsData\",\n                    \"as\": \"json\",\n                    \"from\": {\n                        \"datum\": \"ide://datum.json\"\n                    }\n                },\n                \"datum\": {\n                    \"type\": \"plutusData\",\n                    \"data\": {\n                        \"fromJSON\": {\n                            \"schema\": 1,\n                            \"obj\": \"{get('cache.dependencies.datumJson.datum')}\"\n                        }\n                    }\n                },\n                \"amount\": {\n                    \"type\": \"data\",\n                    \"value\": [\n                        {\n                            \"policyId\": \"ada\",\n                            \"assetName\": \"ada\",\n                            \"quantity\": \"5000000\"\n                        }\n                    ]\n                },\n                \"contract\": {\n                    \"type\": \"$importAsData\",\n                    \"as\": \"json\",\n                    \"from\": {\n                        \"0\": \"ide://contract_data.json\"\n                    }\n                }\n            }\n        },\n        \"buildLock\": {\n            \"type\": \"buildTx\",\n            \"name\": \"built-lock\",\n            \"tx\": {\n                \"outputs\": [\n                    {\n                        \"address\": \"{get('cache.dependencies.contract.0.address')}\",\n                        \"datum\": {\n                            \"datumHashHex\": \"{get('cache.dependencies.datum.dataHashHex')}\"\n                        },\n                        \"assets\": \"{get('cache.dependencies.amount')}\",\n                        \"idPattern\": \"locked\"\n                    }\n                ],\n                \"options\": {\n                    \"changeOptimizer\": \"NO\"\n                }\n            }\n        },\n        \"signLock\": {\n            \"type\": \"signTxs\",\n            \"namePattern\": \"signed-lock\",\n            \"detailedPermissions\": false,\n            \"txs\": [\n                \"{get('cache.buildLock.txHex')}\"\n            ]\n        },\n        \"submitLock\": {\n            \"type\": \"submitTxs\",\n            \"namePattern\": \"submitted-lock\",\n            \"txs\": \"{get('cache.signLock')}\"\n        },\n        \"finally\": {\n            \"type\": \"script\",\n            \"run\": {\n                \"lock\": {\n                    \"type\": \"macro\",\n                    \"run\": \"{get('cache.dependencies.amount')}\"\n                },\n                \"contract\": {\n                    \"type\": \"macro\",\n                    \"run\": \"{get('cache.dependencies.contract.0')}\"\n                },\n                \"lockTx\": {\n                    \"type\": \"macro\",\n                    \"run\": \"{get('cache.buildLock.txHash')}\"\n                },\n                \"lockUTXO\": {\n                    \"type\": \"macro\",\n                    \"run\": \"{get('cache.buildLock.indexMap.output.locked')}\"\n                },\n                \"datumHex\": {\n                    \"type\": \"macro\",\n                    \"run\": \"{get('cache.dependencies.datum.dataHex')}\"\n                }\n            }\n        }\n    }\n}\n\n"
    },
    {
      "id": 6,
      "parentId": -1,
      "name": "lock-data.json",
      "type": "json",
      "data": "{\n    \"lockUTXO\": 0,\n    \"lock\": [\n        {\n            \"policyId\": \"ada\",\n            \"assetName\": \"ada\",\n            \"quantity\": \"5000000\"\n        }\n    ],\n    \"contract\": {\n        \"lang\": \"plutus_v2\",\n        \"hex\": \"56550100002225333573466e1cdd68011bad0031498581\",\n        \"hash\": \"c203151a6a8a55baef2e3d302690858a42c55ebdb7d140eade17a530\",\n        \"address\": \"addr_test1zrpqx9g6d299twh09c7nqf5ssk9y9327hkmazs82mct62v9dqwj2u3djrag0mene2cm9elu5mdqmcz9zc2rzgq7c5g6q5xcn4r\"\n    },\n    \"lockTx\": \"7aa23683c61c7e32af4bd58ff1843f8d6c39f6f69247f167c59279078358f4e0\",\n    \"datumHex\": \"182a\"\n}"
    },
    {
      "id": 7,
      "name": "3_token_unlock.gcscript",
      "parentId": -1,
      "type": "json",
      "data": "{\n  \"type\": \"script\",\n  \"title\": \"Lock script\",\n  \"description\": \"This contract will lock some tokens\",\n  \"exportAs\": \"Lock_Demo\",\n  \"return\": {\n    \"mode\": \"last\"\n  },\n  \"run\": {\n    \"dependencies\": {\n      \"type\": \"script\",\n      \"run\": {\n        \"redeemerJson\": {\n          \"type\": \"$importAsData\",\n          \"as\": \"json\",\n          \"from\": {\n            \"datum\": \"ide://redeemer.json\"\n          }\n        },\n        \"txData\": {\n          \"type\": \"$importAsData\",\n          \"as\": \"json\",\n          \"from\": {\n            \"0\": \"ide://lock-data.json\"\n          }\n        }\n      }\n    },\n    \"buildUnlock\": {\n      \"type\": \"buildTx\",\n      \"name\": \"built-unlock\",\n      \"parentTxHash\": \"{get('cache.dependencies.txData.0.lockTx')}\",\n      \"tx\": {\n        \"inputs\": [\n          {\n            \"txHash\": \"{get('cache.dependencies.txData.0.lockTx')}\",\n            \"index\": \"{get('cache.dependencies.txData.0.lockUTXO')}\",\n            \"idPattern\": \"locked-input\"\n          }\n        ],\n        \"witnesses\": {\n          \"plutus\": {\n            \"scripts\": [\n              {\n                \"scriptHex\": \"{get('cache.dependencies.txData.0.contract.hex')}\",\n                \"lang\": \"{get('cache.dependencies.txData.0.contract.lang')}\"\n              }\n            ],\n            \"consumers\": [\n              {\n                \"scriptHashHex\": \"{get('cache.dependencies.txData.0.contract.hash')}\",\n                \"datum\": {\n                  \"dataHex\": \"{get('cache.dependencies..txData.0.datumHex')}\"\n                },\n                \"redeemer\": {\n                  \"dataHex\": \"{get('cache.dependencies.redeemerJson.value.dataHex')}\",\n                  \"type\": \"spend\",\n                  \"itemIdPattern\": \"locked-input\"\n                }\n              }\n            ]\n          }\n        },\n        \"options\": {\n          \"collateralCoinSelection\": \"LASLAD\"\n        }\n      }\n    },\n    \"signUnlock\": {\n      \"type\": \"signTxs\",\n      \"namePattern\": \"signed-unlock\",\n      \"detailedPermissions\": false,\n      \"txs\": [\n        \"{get('cache.buildUnlock.txHex')}\"\n      ]\n    },\n    \"submitUnlock\": {\n      \"type\": \"submitTxs\",\n      \"namePattern\": \"submitted-unlock\",\n      \"txs\": \"{get('cache.signUnlock')}\"\n    },\n    \"finally\": {\n      \"type\": \"script\",\n      \"run\": {\n        \"unlockTx\": {\n          \"type\": \"macro\",\n          \"run\": \"{get('cache.buildUnlock.txHash')}\"\n        }\n      }\n    }\n  }\n}"
    },
    {
      "id": 9,
      "name": "code-2024-1-24_8-42-12-873.code",
      "parentId": 7,
      "type": "code",
      "data": "{\n  \"type\": \"script\",\n  \"title\": \"Lock script\",\n  \"description\": \"This contract will lock some tokens\",\n  \"exportAs\": \"Lock_Demo\",\n  \"return\": {\n    \"mode\": \"last\"\n  },\n  \"run\": {\n    \"dependencies\": {\n      \"type\": \"script\",\n      \"run\": {\n        \"redeemerJson\": {\n          \"type\": \"data\",\n          \"value\": {\n            \"datum\": {\n              \"int\": 42\n            }\n          }\n        },\n        \"txData\": {\n          \"type\": \"data\",\n          \"value\": {\n            \"0\": {\n              \"lockUTXO\": 0,\n              \"lock\": [\n                {\n                  \"policyId\": \"ada\",\n                  \"assetName\": \"ada\",\n                  \"quantity\": \"5000000\"\n                }\n              ],\n              \"contract\": {\n                \"lang\": \"plutus_v2\",\n                \"hex\": \"56550100002225333573466e1cdd68011bad0031498581\",\n                \"hash\": \"c203151a6a8a55baef2e3d302690858a42c55ebdb7d140eade17a530\",\n                \"address\": \"addr_test1zrpqx9g6d299twh09c7nqf5ssk9y9327hkmazs82mct62v9dqwj2u3djrag0mene2cm9elu5mdqmcz9zc2rzgq7c5g6q5xcn4r\"\n              },\n              \"lockTx\": \"7aa23683c61c7e32af4bd58ff1843f8d6c39f6f69247f167c59279078358f4e0\",\n              \"datumHex\": \"182a\"\n            }\n          }\n        }\n      }\n    },\n    \"buildUnlock\": {\n      \"type\": \"buildTx\",\n      \"name\": \"built-unlock\",\n      \"parentTxHash\": \"{get('cache.dependencies.txData.0.lockTx')}\",\n      \"tx\": {\n        \"inputs\": [\n          {\n            \"txHash\": \"{get('cache.dependencies.txData.0.lockTx')}\",\n            \"index\": \"{get('cache.dependencies.txData.0.lockUTXO')}\",\n            \"idPattern\": \"locked-input\"\n          }\n        ],\n        \"witnesses\": {\n          \"plutus\": {\n            \"scripts\": [\n              {\n                \"scriptHex\": \"{get('cache.dependencies.txData.0.contract.hex')}\",\n                \"lang\": \"{get('cache.dependencies.txData.0.contract.lang')}\"\n              }\n            ],\n            \"consumers\": [\n              {\n                \"scriptHashHex\": \"{get('cache.dependencies.txData.0.contract.hash')}\",\n                \"datum\": {\n                  \"dataHex\": \"{get('cache.dependencies..txData.0.datumHex')}\"\n                },\n                \"redeemer\": {\n                  \"dataHex\": \"{get('cache.dependencies.redeemerJson.value.dataHex')}\",\n                  \"type\": \"spend\",\n                  \"itemIdPattern\": \"locked-input\"\n                }\n              }\n            ]\n          }\n        },\n        \"options\": {\n          \"collateralCoinSelection\": \"LASLAD\"\n        }\n      }\n    },\n    \"signUnlock\": {\n      \"type\": \"signTxs\",\n      \"namePattern\": \"signed-unlock\",\n      \"detailedPermissions\": false,\n      \"txs\": [\n        \"{get('cache.buildUnlock.txHex')}\"\n      ]\n    },\n    \"submitUnlock\": {\n      \"type\": \"submitTxs\",\n      \"namePattern\": \"submitted-unlock\",\n      \"txs\": \"{get('cache.signUnlock')}\"\n    },\n    \"finally\": {\n      \"type\": \"script\",\n      \"run\": {\n        \"unlockTx\": {\n          \"type\": \"macro\",\n          \"run\": \"{get('cache.buildUnlock.txHash')}\"\n        }\n      }\n    }\n  }\n}"
    }
  ],
  "currentProjectIndex": 0,
  "console": [],
  "advertisement": false,
  "theme": "dark"
}

export default project;