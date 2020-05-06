import web3 from './web3';

const address = '0xe6410c86b04e3240de5d61d3e803a30c68fb5ca7';

const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "uuid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "position",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "startDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "endDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "awarderName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "awarderDesignation",
				"type": "string"
			}
		],
		"name": "awardCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "uuid",
				"type": "string"
			}
		],
		"name": "getCertificate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "companyAddress",
				"type": "address"
			}
		],
		"name": "getCompany",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "logoURL",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "website",
				"type": "string"
			}
		],
		"name": "registerCompany",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

export default new web3.eth.Contract(abi, address);