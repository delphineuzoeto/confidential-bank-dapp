# Confidential Bank dApp — Zama fhEVM Frontend

Built for **Zama Developer Program Season 2 — Builder Track** by Delphine Uzoeto.

## What This Is

A full-stack confidential banking dApp built on Zama's fhEVM. Users can deposit, withdraw, and transfer tokens — all amounts stay **encrypted on-chain**. Nobody can see your balance or transaction amounts except you.

## Live Demo

- Connect wallet → Hardhat localhost or Sepolia testnet
- Deposit encrypted tokens
- Withdraw with built-in overdraft protection (all encrypted)
- Transfer privately to any address
- Decrypt your own balance with EIP-712 signature

## Tech Stack

- **Smart Contracts**: Zama fhEVM (@fhevm/solidity v0.11)
- **Frontend**: Next.js 15 + React 19 + Tailwind CSS
- **Wallet**: RainbowKit + Wagmi + Rabby/MetaMask
- **Encryption**: fhevmjs SDK

## Running Locally

### Prerequisites
- Node.js v22+
- pnpm
- MetaMask or Rabby wallet

### Installation

```bash
git clone https://github.com/Delphineuzoeto/confidential-bank-dapp
cd confidential-bank-dapp
pnpm install
```

### Start contracts (Terminal 1)
```bash
cd ../confidential-bank-fhevm
npx hardhat node
npx hardhat deploy --network localhost
```

### Start frontend (Terminal 2)
```bash
cd packages/nextjs
pnpm dev
```

Open http://localhost:3000, connect wallet to Hardhat network (Chain ID 31337).

## Smart Contract Repo

https://github.com/Delphineuzoeto/confidential-bank-fhevm

## License

BSD-3-Clause-Clear
