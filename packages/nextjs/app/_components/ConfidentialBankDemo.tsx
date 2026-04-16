"use client";

import { useMemo, useState } from "react";
import { useFhevm } from "@fhevm-sdk";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/helper/RainbowKitCustomConnectButton";
import { useConfidentialBankWagmi } from "~~/hooks/confidentialbank/useConfidentialBankWagmi";

export const ConfidentialBankDemo = () => {
  const { isConnected, chain } = useAccount();
  const chainId = chain?.id;

  const [depositAmount, setDepositAmount] = useState<string>("1000");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("400");
  const [transferAmount, setTransferAmount] = useState<string>("200");
  const [transferRecipient, setTransferRecipient] = useState<string>("");

  const provider = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    return (window as any).ethereum;
  }, []);

  const initialMockChains = { 31337: "http://localhost:8545" };

  const { instance: fhevmInstance, status: fhevmStatus } = useFhevm({
    provider,
    chainId,
    initialMockChains,
    enabled: true,
  });

  const bank = useConfidentialBankWagmi({ instance: fhevmInstance, initialMockChains });

  const buttonClass = "inline-flex items-center justify-center px-6 py-3 font-semibold shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  const primaryBtn = buttonClass + " bg-[#FFD208] text-[#2D2D2D] hover:bg-[#A38025]";
  const secondaryBtn = buttonClass + " bg-black text-[#F4F4F4] hover:bg-[#1F1F1F]";
  const dangerBtn = buttonClass + " bg-red-600 text-white hover:bg-red-700";
  const sectionClass = "bg-[#f4f4f4] shadow-lg p-6 mb-6 text-gray-900";
  const titleClass = "font-bold text-gray-900 text-xl mb-4 border-b-1 border-gray-700 pb-2";
  const inputClass = "w-full border border-gray-300 px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400";

  if (!isConnected) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-gray-900">
        <div className="flex items-center justify-center">
          <div className="bg-white shadow-xl p-8 text-center">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-900/30 text-amber-400 text-3xl">🏦</span>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2 mt-4">Confidential Bank</h2>
            <p className="text-gray-700 mb-6">Connect your wallet to access encrypted banking.</p>
            <div className="flex items-center justify-center">
              <RainbowKitCustomConnectButton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 text-gray-900">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">🏦 Confidential Bank</h1>
        <p className="text-gray-600">All balances and transactions are encrypted using Zama fhEVM</p>
        <p className="text-xs text-gray-400 mt-1">Contract: {bank.contractAddress}</p>
      </div>

      {/* Balance Section */}
      <div className={sectionClass}>
        <h3 className={titleClass}>🔐 Your Encrypted Balance</h3>
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center py-2 px-3 bg-white border border-gray-200">
            <span className="text-gray-800 font-medium">Encrypted Handle</span>
            <span className="ml-2 font-mono text-xs text-gray-600 truncate max-w-xs">
              {bank.balanceHandle || "No balance fetched yet"}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 px-3 bg-white border border-gray-200">
            <span className="text-gray-800 font-medium">Decrypted Balance</span>
            <span className="font-mono font-bold text-green-700">
              {bank.isDecrypted ? `${bank.clearBalance?.toString()} tokens` : "🔒 Encrypted"}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className={secondaryBtn} onClick={bank.fetchBalance} disabled={bank.isProcessing}>
            📡 Fetch Balance
          </button>
          <button className={primaryBtn} onClick={bank.decryptBalance} disabled={!bank.canDecrypt}>
            {bank.isDecrypting ? "⏳ Decrypting..." : "🔓 Decrypt Balance"}
          </button>
        </div>
      </div>

      {/* Deposit Section */}
      <div className={sectionClass}>
        <h3 className={titleClass}>💰 Deposit</h3>
        <p className="text-sm text-gray-600 mb-3">Add encrypted funds to your account. The amount stays private.</p>
        <div className="flex gap-3 items-center">
          <input
            type="number"
            value={depositAmount}
            onChange={e => setDepositAmount(e.target.value)}
            className={inputClass}
            placeholder="Amount to deposit"
          />
          <button
            className={primaryBtn}
            disabled={!bank.canOperate}
            onClick={() => bank.deposit(Number(depositAmount))}
          >
            {bank.isProcessing ? "⏳ Processing..." : "💰 Deposit"}
          </button>
        </div>
      </div>

      {/* Withdraw Section */}
      <div className={sectionClass}>
        <h3 className={titleClass}>🏧 Withdraw</h3>
        <p className="text-sm text-gray-600 mb-3">Withdraw encrypted funds. Overdraft protection is built-in — all encrypted.</p>
        <div className="flex gap-3 items-center">
          <input
            type="number"
            value={withdrawAmount}
            onChange={e => setWithdrawAmount(e.target.value)}
            className={inputClass}
            placeholder="Amount to withdraw"
          />
          <button
            className={dangerBtn}
            disabled={!bank.canOperate}
            onClick={() => bank.withdraw(Number(withdrawAmount))}
          >
            {bank.isProcessing ? "⏳ Processing..." : "🏧 Withdraw"}
          </button>
        </div>
      </div>

      {/* Transfer Section */}
      <div className={sectionClass}>
        <h3 className={titleClass}>📤 Transfer</h3>
        <p className="text-sm text-gray-600 mb-3">Send encrypted funds to another address. Neither amount nor balance is revealed.</p>
        <div className="space-y-3">
          <input
            type="text"
            value={transferRecipient}
            onChange={e => setTransferRecipient(e.target.value)}
            className={inputClass}
            placeholder="Recipient address (0x...)"
          />
          <div className="flex gap-3 items-center">
            <input
              type="number"
              value={transferAmount}
              onChange={e => setTransferAmount(e.target.value)}
              className={inputClass}
              placeholder="Amount to transfer"
            />
            <button
              className={secondaryBtn}
              disabled={!bank.canOperate || !transferRecipient}
              onClick={() => bank.transfer(Number(transferAmount), transferRecipient)}
            >
              {bank.isProcessing ? "⏳ Processing..." : "📤 Transfer"}
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      {bank.message && (
        <div className={sectionClass}>
          <h3 className={titleClass}>💬 Status</h3>
          <div className="border bg-white border-gray-200 p-4">
            <p className="text-gray-800">{bank.message}</p>
          </div>
        </div>
      )}

      {/* Status */}
      <div className={sectionClass}>
        <h3 className={titleClass}>🔧 FHEVM Status</h3>
        <div className="flex justify-between items-center py-2 px-3 bg-white border border-gray-200">
          <span className="text-gray-800 font-medium">Instance</span>
          <span className={`font-mono text-sm font-semibold px-2 py-1 border ${fhevmInstance ? "text-green-800 bg-green-100 border-green-300" : "text-red-800 bg-red-100 border-red-300"}`}>
            {fhevmInstance ? "✅ Connected" : "❌ Not connected"}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 px-3 bg-white border border-gray-200 mt-2">
          <span className="text-gray-800 font-medium">Status</span>
          <span className="font-mono text-sm text-gray-600">{fhevmStatus}</span>
        </div>
      </div>
    </div>
  );
};
