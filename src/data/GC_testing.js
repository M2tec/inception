const project = {
  "name": "GC_testing",
  "type": "folder",
  "currentFileIndex": 0,
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
      "id": 8,
      "name": "datum.json",
      "parentId": -1,
      "type": "json",
      "data": "{\n    \"type\": \"plutusData\",\n    \"data\": {\n    \"fromJSON\": {\n        \"schema\": 1,\n        \"obj\": {\n            \"int\": 42\n            }\n    }\n    }\n}\n"
    },
    {
      "id": 6,
      "name": "data.json",
      "parentId": 5,
      "type": "json",
      "data": "{\n    \"exports\": {\n        \"Lock_Demo\": {\n        \"lockUTXO\": 0,\n        \"lock\": [\n        {\n            \"policyId\": \"ada\",\n            \"assetName\": \"ada\",\n            \"quantity\": \"5000000\"\n        }\n        ],\n            \"smartContract\": \"56550100002225333573466e1cdd68011bad0031498581\",\n            \"smartContractHash\": \"c203151a6a8a55baef2e3d302690858a42c55ebdb7d140eade17a530\",\n            \"smartContractAddress\": \"addr_test1zrpqx9g6d299twh09c7nqf5ssk9y9327hkmazs82mct62v9dqwj2u3djrag0mene2cm9elu5mdqmcz9zc2rzgq7c5g6q5xcn4r\",\n            \"lockTx\": \"b9cb604d1cead1afdd6c9403cae411234b19efc7cc78c1c060af69746fd223c2\"\n        }\n    }\n}\n"
    },
    {
      "id": 7,
      "name": "data2.json",
      "parentId": 5,
      "type": "json",
      "data": "{\n    \"exports\": {\n        \"Lock_Demo\": {\n        \"lockUTXO\": 0,\n        \"lock\": [\n        {\n            \"policyId\": \"ada\",\n            \"assetName\": \"ada\",\n            \"quantity\": \"5000000\"\n        }\n        ],\n            \"smartContract\": \"56550100002225333573466e1cdd68011bad0031498581\",\n            \"smartContractHash\": \"c203151a6a8a55baef2e3d302690858a42c55ebdb7d140eade17a530\",\n            \"smartContractAddress\": \"addr_test1zrpqx9g6d299twh09c7nqf5ssk9y9327hkmazs82mct62v9dqwj2u3djrag0mene2cm9elu5mdqmcz9zc2rzgq7c5g6q5xcn4r\",\n            \"lockTx\": \"b9cb604d1cead1afdd6c9403cae411234b19efc7cc78c1c060af69746fd223c2\"\n        }\n    }\n}\n"
    },
    {
      "id": 15,
      "name": "code-2024-1-22_1-54-43-654.code",
      "parentId": 12,
      "type": "code",
      "data": "{\n  \"type\": \"script\",\n  \"title\": \"Lock script\",\n  \"description\": \"This contract will lock some tokens\",\n  \"exportAs\": \"Lock_Demo\",\n  \"return\": {\n    \"mode\": \"last\"\n  },\n  \"run\": {\n    \"dependencies\": {\n      \"type\": \"script\",\n      \"run\": {\n        \"datumJson\": {\n          \"type\": \"data\",\n          \"value\": {\n            \"datum\": {\n              \"type\": \"plutusData\",\n              \"data\": {\n                \"fromJSON\": {\n                  \"schema\": 1,\n                  \"obj\": {\n                    \"int\": 42\n                  }\n                }\n              }\n            }\n          }\n        },\n        \"datum\": {\n          \"type\": \"plutusData\",\n          \"data\": {\n            \"fromJSON\": {\n              \"schema\": 1,\n              \"obj\": \"get('cache.dependencies.datumJson.datum')\"\n            }\n          }\n        }\n      }\n    }\n  }\n}"
    },
    {
      "id": 18,
      "name": "code-2024-1-22_7-21-36-229.code",
      "parentId": 3,
      "type": "json",
      "data": "{\n  \"type\": \"script\",\n  \"title\": \"Lock script\",\n  \"description\": \"This contract will lock some tokens\",\n  \"exportAs\": \"Lock_Demo\",\n  \"return\": {\n    \"mode\": \"last\"\n  },\n  \"run\": {\n    \"dependencies\": {\n      \"type\": \"script\",\n      \"run\": {\n        \"datumJson\": {\n          \"type\": \"data\",\n          \"value\": {\n            \"datum\": {\n              \"type\": \"plutusData\",\n              \"data\": {\n                \"fromJSON\": {\n                  \"schema\": 1,\n                  \"obj\": {\n                    \"int\": 42\n                  }\n                }\n              }\n            }\n          }\n        },\n        \"datum\": {\n          \"type\": \"plutusData\",\n          \"data\": {\n            \"fromJSON\": {\n              \"schema\": 1,\n              \"obj\": \"get('cache.dependencies.datumJson.datum')\"\n            }\n          }\n        },\n        \"helios\": {\n          \"type\": \"data\",\n          \"value\": {\n            \"contract\": \"0a7370656e64696e67204d616769634e756d6265720a0a73747275637420446174756d207b0a202020206d616769634e756d6265723a20496e740a7d0a0a7374727563742052656465656d6572207b0a202020206d616769634e756d6265723a20496e74200a7d0a0a66756e63206d61696e28646174756d3a20446174756d2c2072656465656d65723a2052656465656d65722c205f29202d3e20426f6f6c207b2020200a2020202072656465656d65722e6d616769634e756d6265723d3d646174756d2e6d616769634e756d6265720a7d\"\n          }\n        },\n        \"amount\": {\n          \"type\": \"data\",\n          \"value\": [\n            {\n              \"policyId\": \"ada\",\n              \"assetName\": \"ada\",\n              \"quantity\": \"5000000\"\n            }\n          ]\n        },\n        \"stakeCredential\": {\n          \"type\": \"data\",\n          \"value\": \"ad03a4ae45b21f50fde67956365cff94db41bc08a2c2862403d8a234\"\n        },\n        \"contract\": {\n          \"type\": \"plutusScript\",\n          \"script\": {\n            \"heliosCode\": \"{hexToStr(get('cache.dependencies.helios.contract'))}\",\n            \"version\": \"0.15.2\"\n          }\n        },\n        \"address\": {\n          \"type\": \"buildAddress\",\n          \"name\": \"ContractAddress\",\n          \"addr\": {\n            \"spendScriptHashHex\": \"{get('cache.dependencies.contract.scriptHashHex')}\",\n            \"stakePubKeyHashHex\": \"{get('cache.dependencies.stakeCredential')}\"\n          }\n        }\n      }\n    },\n    \"buildLock\": {\n      \"type\": \"buildTx\",\n      \"name\": \"built-lock\",\n      \"tx\": {\n        \"outputs\": [\n          {\n            \"address\": \"{get('cache.dependencies.address')}\",\n            \"datum\": {\n              \"datumHashHex\": \"{get('cache.dependencies.datum.dataHashHex')}\"\n            },\n            \"assets\": \"{get('cache.dependencies.amount')}\",\n            \"idPattern\": \"locked\"\n          }\n        ],\n        \"options\": {\n          \"changeOptimizer\": \"NO\"\n        }\n      }\n    },\n    \"signLock\": {\n      \"type\": \"signTxs\",\n      \"namePattern\": \"signed-lock\",\n      \"detailedPermissions\": false,\n      \"txs\": [\n        \"{get('cache.buildLock.txHex')}\"\n      ]\n    },\n    \"submitLock\": {\n      \"type\": \"submitTxs\",\n      \"namePattern\": \"submitted-lock\",\n      \"txs\": \"{get('cache.signLock')}\"\n    },\n    \"finally\": {\n      \"type\": \"script\",\n      \"run\": {\n        \"lock\": {\n          \"type\": \"macro\",\n          \"run\": \"{get('cache.dependencies.lock')}\"\n        },\n        \"smartContract\": {\n          \"type\": \"macro\",\n          \"run\": \"{get('cache.dependencies.contract.scriptHex')}\"\n        },\n        \"smartContractHash\": {\n          \"type\": \"macro\",\n          \"run\": \"{get('cache.dependencies.contract.scriptHashHex')}\"\n        },\n        \"smartContractAddress\": {\n          \"type\": \"macro\",\n          \"run\": \"{get('cache.dependencies.address')}\"\n        },\n        \"lockTx\": {\n          \"type\": \"macro\",\n          \"run\": \"{get('cache.buildLock.txHash')}\"\n        },\n        \"lockUTXO\": {\n          \"type\": \"macro\",\n          \"run\": \"{get('cache.buildLock.indexMap.output.locked')}\"\n        }\n      }\n    }\n  }\n}"
    },
    {
      "id": 20,
      "name": "code-2024-1-23_11-54-5-869.code",
      "parentId": 3,
      "type": "code",
      "data": "{\n  \"type\": \"script\",\n  \"title\": \"Lock script\",\n  \"description\": \"This contract will lock some tokens\",\n  \"exportAs\": \"Lock_Demo\",\n  \"return\": {\n    \"mode\": \"last\"\n  },\n  \"run\": {\n    \"dependencies\": {\n      \"type\": \"script\",\n      \"run\": {\n        \"datumJson\": {\n          \"type\": \"data\",\n          \"value\": {\n            \"datum\": {\n              \"type\": \"plutusData\",\n              \"data\": {\n                \"fromJSON\": {\n                  \"schema\": 1,\n                  \"obj\": {\n                    \"int\": 42\n                  }\n                }\n              }\n            }\n          }\n        },\n        \"datum\": {\n          \"type\": \"plutusData\",\n          \"data\": {\n            \"fromJSON\": {\n              \"schema\": 1,\n              \"obj\": \"get('cache.dependencies.datumJson.datum')\"\n            }\n          }\n        },\n        \"helios\": {\n          \"type\": \"data\",\n          \"value\": {\n            \"contract\": \"0a7370656e64696e67204d616769634e756d6265720a0a73747275637420446174756d207b0a202020206d616769634e756d6265723a20496e740a7d0a0a7374727563742052656465656d6572207b0a202020206d616769634e756d6265723a20496e74200a7d0a0a66756e63206d61696e28646174756d3a20446174756d2c2072656465656d65723a2052656465656d65722c205f29202d3e20426f6f6c207b2020200a2020202072656465656d65722e6d616769634e756d6265723d3d646174756d2e6d616769634e756d6265720a7d\"\n          }\n        },\n        \"amount\": {\n          \"type\": \"data\",\n          \"value\": [\n            {\n              \"policyId\": \"ada\",\n              \"assetName\": \"ada\",\n              \"quantity\": \"5000000\"\n            }\n          ]\n        },\n        \"stakeCredential\": {\n          \"type\": \"data\",\n          \"value\": \"ad03a4ae45b21f50fde67956365cff94db41bc08a2c2862403d8a234\"\n        },\n        \"contract\": {\n          \"type\": \"plutusScript\",\n          \"script\": {\n            \"heliosCode\": \"{hexToStr(get('cache.dependencies.helios.contract'))}\",\n            \"version\": \"0.15.2\"\n          }\n        },\n        \"address\": {\n          \"type\": \"buildAddress\",\n          \"name\": \"ContractAddress\",\n          \"addr\": {\n            \"spendScriptHashHex\": \"{get('cache.dependencies.contract.scriptHashHex')}\",\n            \"stakePubKeyHashHex\": \"{get('cache.dependencies.stakeCredential')}\"\n          }\n        }\n      }\n    },\n    \"buildLock\": {\n      \"type\": \"buildTx\",\n      \"name\": \"built-lock\",\n      \"tx\": {\n        \"outputs\": [\n          {\n            \"address\": \"{get('cache.dependencies.address')}\",\n            \"datum\": {\n              \"datumHashHex\": \"{get('cache.dependencies.datum.dataHashHex')}\"\n            },\n            \"assets\": \"{get('cache.dependencies.amount')}\",\n            \"idPattern\": \"locked\"\n          }\n        ],\n        \"options\": {\n          \"changeOptimizer\": \"NO\"\n        }\n      }\n    },\n    \"signLock\": {\n      \"type\": \"signTxs\",\n      \"namePattern\": \"signed-lock\",\n      \"detailedPermissions\": false,\n      \"txs\": [\n        \"{get('cache.buildLock.txHex')}\"\n      ]\n    },\n    \"submitLock\": {\n      \"type\": \"submitTxs\",\n      \"namePattern\": \"submitted-lock\",\n      \"txs\": \"{get('cache.signLock')}\"\n    },\n    \"finally\": {\n      \"type\": \"script\",\n      \"run\": {\n        \"lock\": {\n          \"type\": \"macro\",\n          \"run\": \"{get('cache.dependencies.lock')}\"\n        },\n        \"smartContract\": {\n          \"type\": \"macro\",\n          \"run\": \"{get('cache.dependencies.contract.scriptHex')}\"\n        },\n        \"smartContractHash\": {\n          \"type\": \"macro\",\n          \"run\": \"{get('cache.dependencies.contract.scriptHashHex')}\"\n        },\n        \"smartContractAddress\": {\n          \"type\": \"macro\",\n          \"run\": \"{get('cache.dependencies.address')}\"\n        },\n        \"lockTx\": {\n          \"type\": \"macro\",\n          \"run\": \"{get('cache.buildLock.txHash')}\"\n        },\n        \"lockUTXO\": {\n          \"type\": \"macro\",\n          \"run\": \"{get('cache.buildLock.indexMap.output.locked')}\"\n        }\n      }\n    }\n  }\n}"
    },
    {
      "id": 26,
      "name": "code-2024-1-23_12-56-35-117.code",
      "parentId": 21,
      "type": "code",
      "data": "{\n  \"type\": \"script\",\n  \"title\": \"Lock script\",\n  \"description\": \"This contract will lock some tokens\",\n  \"exportAs\": \"Lock_Demo\",\n  \"return\": {\n    \"mode\": \"last\"\n  },\n  \"run\": {\n    \"dependencies\": {\n      \"type\": \"script\",\n      \"run\": {\n        \"datumJson\": {\n          \"type\": \"data\",\n          \"value\": {\n            \"datum\": {\n              \"type\": \"plutusData\",\n              \"data\": {\n                \"fromJSON\": {\n                  \"schema\": 1,\n                  \"obj\": {\n                    \"int\": 42\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}"
    },
    {
      "id": 28,
      "name": "passing_arguments.gcscript",
      "parentId": -1,
      "type": "json",
      "data": "{\n  \"title\": \"Arguments\",\n  \"exportAs\": \"myArgument\",\n  \"type\": \"script\",\n  \"args\": {\n    \"mydata\": {\n      \"question\": \"Hello World!\",\n      \"universe\": 42\n    }\n  },\n  \"run\": {\n      \"getArgs\": {\n        \"type\": \"macro\",\n        \"run\": \"{get('args.mydata')}\"\n      }\n    }\n  }\n"
    },
    {
      "id": 53,
      "name": "import_as_data.gcscript",
      "parentId": -1,
      "type": "json",
      "data": "{\n    \"title\": \"Arguments\",\n    \"exportAs\": \"myArgument\",\n    \"type\": \"script\",\n    \"run\": {\n        \"myDatum\": {\n            \"type\": \"$importAsData\",\n            \"as\": \"json\",\n            \"from\": {\n                \"datum\": \"ide://datum.json\"\n            }\n        }\n    }\n}"
    },
    {
      "id": 56,
      "name": "import_as_script.gcscript",
      "parentId": -1,
      "type": "json",
      "data": "{\n    \"title\": \"Arguments\",\n    \"exportAs\": \"myArgument\",\n    \"type\": \"script\",\n    \"run\": {\n        \"helios\": {\n            \"type\": \"$importAsData\",\n            \"as\": \"hex\",\n            \"from\": {\n                \"contract\": \"ide://contract.hl\"\n            }\n        }\n    }\n}"
    },
    {
      "id": 60,
      "name": "code-2024-1-23_2-31-4-877.code",
      "parentId": 53,
      "type": "code",
      "data": "{\n  \"title\": \"Arguments\",\n  \"exportAs\": \"myArgument\",\n  \"type\": \"script\",\n  \"run\": {\n    \"myDatum\": {\n      \"type\": \"data\",\n      \"value\": {\n        \"datum\": {\n          \"type\": \"plutusData\",\n          \"data\": {\n            \"fromJSON\": {\n              \"schema\": 1,\n              \"obj\": {\n                \"int\": 42\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}"
    },
    {
      "id": 63,
      "name": "code-2024-1-23_2-33-46-827.code",
      "parentId": 56,
      "type": "code",
      "data": "{\n  \"title\": \"Arguments\",\n  \"exportAs\": \"myArgument\",\n  \"type\": \"script\",\n  \"run\": {\n    \"helios\": {\n      \"type\": \"data\",\n      \"value\": {\n        \"contract\": \"0a7370656e64696e67204d616769634e756d6265720a0a73747275637420446174756d207b0a202020206d616769634e756d6265723a20496e740a7d0a0a7374727563742052656465656d6572207b0a202020206d616769634e756d6265723a20496e74200a7d0a0a66756e63206d61696e28646174756d3a20446174756d2c2072656465656d65723a2052656465656d65722c205f29202d3e20426f6f6c207b2020200a2020202072656465656d65722e6d616769634e756d6265723d3d646174756d2e6d616769634e756d6265720a7d\"\n      }\n    }\n  }\n}"
    },
    {
      "id": 71,
      "name": "code-2024-1-23_2-49-56-732.code",
      "parentId": 28,
      "type": "code",
      "data": "{\n  \"title\": \"Arguments\",\n  \"exportAs\": \"myArgument\",\n  \"type\": \"script\",\n  \"args\": {\n    \"mydata\": {\n      \"question\": \"Hello World!\",\n      \"universe\": 42\n    }\n  },\n  \"run\": {\n    \"getArgs\": {\n      \"type\": \"macro\",\n      \"run\": \"{get('args.mydata')}\"\n    }\n  }\n}"
    }
  ],
  "currentProjectIndex": 4,
  "console": [],
  "advertisement": false,
  "theme": "dark"
}

export default project;