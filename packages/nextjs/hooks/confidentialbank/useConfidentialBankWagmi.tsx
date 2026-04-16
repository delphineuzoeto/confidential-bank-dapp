"use client";

import { useCallback, useMemo, useState } from "react";
import { useDeployedContractInfo } from "../helper";
import { useWagmiEthers } from "../wagmi/useWagmiEthers";
import { FhevmInstance } from "@fhevm-sdk";
import { buildParamsFromAbi, getEncryptionMethod, useFHEDecrypt, useFHEEncryption, useInMemoryStorage } from "@fhevm-sdk";
import { ethers } from "ethers";
import type { AllowedChainIds } from "~~/utils/helper/networks";
import { useReadContract } from "wagmi";

export const useConfidentialBankWagmi = (parameters: {
  instance: FhevmInstance | undefined;
  initialMockChains?: Readonly<Record<number, string>>;
}) => {
  const { instance, initialMockChains } = parameters;
  const { storage: fhevmDecryptionSignatureStorage } = useInMemoryStorage();
  const { chainId, isConnected, ethersReadonlyProvider, ethersSigner } = useWagmiEthers(initialMockChains);

  const allowedChainId = typeof chainId === "number" ? (chainId as AllowedChainIds) : undefined;
  const { data: confidentialBank } = useDeployedContractInfo({ contractName: "ConfidentialBank", chainId: allowedChainId });

  const [message, setMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [recipientAddress, setRecipientAddress] = useState<string>("");

  const hasContract = Boolean(confidentialBank?.address && confidentialBank?.abi);
  const hasProvider = Boolean(ethersReadonlyProvider);
  const hasSigner = Boolean(ethersSigner);

  const getContract = (mode: "read" | "write") => {
    if (!hasContract) return undefined;
    const providerOrSigner = mode === "read" ? ethersReadonlyProvider : ethersSigner;
    if (!providerOrSigner) return undefined;
    return new ethers.Contract(confidentialBank!.address, confidentialBank!.abi as any, providerOrSigner);
  };

  // Read encrypted balance
  const { data: accounts } = useWagmiEthers(initialMockChains) as any;
  const userAddress = ethersSigner ? undefined : undefined;

  const balanceResult = useReadContract({
    address: (hasContract ? confidentialBank!.address as `0x${string}` : undefined),
    abi: (hasContract ? confidentialBank!.abi as any : undefined),
    functionName: "getEncryptedBalance",
    args: ethersSigner ? [undefined] : undefined,
    query: { enabled: false },
  });

  // Decrypt balance
  const [balanceHandle, setBalanceHandle] = useState<string | undefined>();

  const fetchBalance = useCallback(async () => {
    if (!ethersSigner || !hasContract) return;
    const address = await ethersSigner.getAddress();
    const contract = getContract("read");
    if (!contract) return;
    const handle = await contract.getEncryptedBalance(address);
    setBalanceHandle(handle);
    setMessage("Balance fetched. Click Decrypt to reveal.");
  }, [ethersSigner, hasContract]);

  const requests = useMemo(() => {
    if (!hasContract || !balanceHandle || balanceHandle === ethers.ZeroHash) return undefined;
    return [{ handle: balanceHandle, contractAddress: confidentialBank!.address } as const];
  }, [hasContract, confidentialBank?.address, balanceHandle]);

  const { canDecrypt, decrypt, isDecrypting, results } = useFHEDecrypt({
    instance,
    ethersSigner: ethersSigner as any,
    fhevmDecryptionSignatureStorage,
    chainId,
    requests,
  });

  const clearBalance = useMemo(() => {
    if (!balanceHandle || !results[balanceHandle]) return undefined;
    return results[balanceHandle];
  }, [balanceHandle, results]);

  const isDecrypted = Boolean(balanceHandle && clearBalance !== undefined);

  // Encryption
  const { encryptWith } = useFHEEncryption({ instance, ethersSigner: ethersSigner as any, contractAddress: confidentialBank?.address });
  const canOperate = useMemo(() => Boolean(hasContract && instance && hasSigner && !isProcessing), [hasContract, instance, hasSigner, isProcessing]);

  const executeOperation = useCallback(async (operation: "deposit" | "withdraw" | "transfer", amount: number, recipient?: string) => {
    if (!canOperate || amount <= 0) return;
    setIsProcessing(true);
    setMessage(`Starting ${operation}(${amount})...`);
    try {
      setMessage(`Encrypting amount...`);
      const enc = await encryptWith(builder => { (builder as any).add64(amount); });
      if (!enc) return setMessage("Encryption failed");

      const writeContract = getContract("write");
      if (!writeContract) return setMessage("Contract or signer not available");

      let tx;
      if (operation === "deposit") {
        const params = buildParamsFromAbi(enc, [...confidentialBank!.abi] as any[], "deposit");
        tx = await writeContract.deposit(...params);
      } else if (operation === "withdraw") {
        const params = buildParamsFromAbi(enc, [...confidentialBank!.abi] as any[], "withdraw");
        tx = await writeContract.withdraw(...params);
      } else if (operation === "transfer" && recipient) {
        const params = buildParamsFromAbi(enc, [...confidentialBank!.abi] as any[], "transfer");
        tx = await writeContract.transfer(recipient, ...params);
      }

      setMessage("Waiting for transaction...");
      await tx.wait();
      setMessage(`${operation}(${amount}) completed! ✅`);
      await fetchBalance();
    } catch (e) {
      setMessage(`${operation} failed: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setIsProcessing(false);
    }
  }, [canOperate, encryptWith, getContract, fetchBalance, confidentialBank?.abi]);

  return {
    contractAddress: confidentialBank?.address,
    canOperate,
    canDecrypt,
    isDecrypting,
    isProcessing,
    isDecrypted,
    message,
    balanceHandle,
    clearBalance,
    recipientAddress,
    setRecipientAddress,
    fetchBalance,
    decryptBalance: decrypt,
    deposit: (amount: number) => executeOperation("deposit", amount),
    withdraw: (amount: number) => executeOperation("withdraw", amount),
    transfer: (amount: number, recipient: string) => executeOperation("transfer", amount, recipient),
    isConnected,
    chainId,
  };
};
