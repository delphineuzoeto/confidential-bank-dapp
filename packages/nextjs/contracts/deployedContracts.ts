import { GenericContractsDeclaration } from "~~/utils/helper/contract";

const deployedContracts = {
  31337: {
    FHECounter: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: [
        { inputs: [{ internalType: "bytes32", name: "handle", type: "bytes32" }, { internalType: "address", name: "sender", type: "address" }], name: "SenderNotAllowedToUseHandle", type: "error" },
        { inputs: [], name: "ZamaProtocolUnsupported", type: "error" },
        { inputs: [], name: "confidentialProtocolId", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
        { inputs: [{ internalType: "externalEuint32", name: "inputEuint32", type: "bytes32" }, { internalType: "bytes", name: "inputProof", type: "bytes" }], name: "decrement", outputs: [], stateMutability: "nonpayable", type: "function" },
        { inputs: [], name: "getCount", outputs: [{ internalType: "euint32", name: "", type: "bytes32" }], stateMutability: "view", type: "function" },
        { inputs: [{ internalType: "externalEuint32", name: "inputEuint32", type: "bytes32" }, { internalType: "bytes", name: "inputProof", type: "bytes" }], name: "increment", outputs: [], stateMutability: "nonpayable", type: "function" },
      ],
      inheritedFunctions: {},
      deployedOnBlock: 3,
    },
    ConfidentialBank: {
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      abi: [
        { inputs: [{ internalType: "bytes32", name: "handle", type: "bytes32" }, { internalType: "address", name: "sender", type: "address" }], name: "SenderNotAllowedToUseHandle", type: "error" },
        { inputs: [], name: "ZamaProtocolUnsupported", type: "error" },
        { inputs: [{ internalType: "externalEuint64", name: "encryptedAmount", type: "bytes32" }, { internalType: "bytes", name: "inputProof", type: "bytes" }], name: "deposit", outputs: [], stateMutability: "nonpayable", type: "function" },
        { inputs: [{ internalType: "externalEuint64", name: "encryptedWithdrawalAmount", type: "bytes32" }, { internalType: "bytes", name: "inputProof", type: "bytes" }], name: "withdraw", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "nonpayable", type: "function" },
        { inputs: [{ internalType: "address", name: "recipient", type: "address" }, { internalType: "externalEuint64", name: "encryptedAmount", type: "bytes32" }, { internalType: "bytes", name: "inputProof", type: "bytes" }], name: "transfer", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "nonpayable", type: "function" },
        { inputs: [{ internalType: "address", name: "account", type: "address" }], name: "getEncryptedBalance", outputs: [{ internalType: "euint64", name: "", type: "bytes32" }], stateMutability: "view", type: "function" },
        { inputs: [], name: "confidentialProtocolId", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
      ],
      inheritedFunctions: {},
      deployedOnBlock: 4,
    },
  },
  11155111: {
    FHECounter: {
      address: "0x3b155F04aA4d81b1725E2D22f0569A6131A97814",
      abi: [
        { inputs: [{ internalType: "bytes32", name: "handle", type: "bytes32" }, { internalType: "address", name: "sender", type: "address" }], name: "SenderNotAllowedToUseHandle", type: "error" },
        { inputs: [], name: "ZamaProtocolUnsupported", type: "error" },
        { inputs: [], name: "confidentialProtocolId", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
        { inputs: [{ internalType: "externalEuint32", name: "inputEuint32", type: "bytes32" }, { internalType: "bytes", name: "inputProof", type: "bytes" }], name: "decrement", outputs: [], stateMutability: "nonpayable", type: "function" },
        { inputs: [], name: "getCount", outputs: [{ internalType: "euint32", name: "", type: "bytes32" }], stateMutability: "view", type: "function" },
        { inputs: [{ internalType: "externalEuint32", name: "inputEuint32", type: "bytes32" }, { internalType: "bytes", name: "inputProof", type: "bytes" }], name: "increment", outputs: [], stateMutability: "nonpayable", type: "function" },
      ],
      inheritedFunctions: {},
      deployedOnBlock: 0,
    },
    ConfidentialBank: {
      address: "0x17b658120Ec4888000Ce6DE50252fb9f42c94Ff6",
      abi: [
        { inputs: [{ internalType: "bytes32", name: "handle", type: "bytes32" }, { internalType: "address", name: "sender", type: "address" }], name: "SenderNotAllowedToUseHandle", type: "error" },
        { inputs: [], name: "ZamaProtocolUnsupported", type: "error" },
        { inputs: [{ internalType: "externalEuint64", name: "encryptedAmount", type: "bytes32" }, { internalType: "bytes", name: "inputProof", type: "bytes" }], name: "deposit", outputs: [], stateMutability: "nonpayable", type: "function" },
        { inputs: [{ internalType: "externalEuint64", name: "encryptedWithdrawalAmount", type: "bytes32" }, { internalType: "bytes", name: "inputProof", type: "bytes" }], name: "withdraw", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "nonpayable", type: "function" },
        { inputs: [{ internalType: "address", name: "recipient", type: "address" }, { internalType: "externalEuint64", name: "encryptedAmount", type: "bytes32" }, { internalType: "bytes", name: "inputProof", type: "bytes" }], name: "transfer", outputs: [{ internalType: "bool", name: "", type: "bool" }], stateMutability: "nonpayable", type: "function" },
        { inputs: [{ internalType: "address", name: "account", type: "address" }], name: "getEncryptedBalance", outputs: [{ internalType: "euint64", name: "", type: "bytes32" }], stateMutability: "view", type: "function" },
        { inputs: [], name: "confidentialProtocolId", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
      ],
      inheritedFunctions: {},
      deployedOnBlock: 0,
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
