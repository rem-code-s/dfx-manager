import { invoke } from "@tauri-apps/api";
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

export type Network = "ic" | "local";
export const networks: Network[] = ["ic", "local"];

interface CurrentAccount {
  name: string;
  principal: string;
  cyclesBalance: string;
}

interface IDfxContextValue {
  currentAccount: CurrentAccount | undefined;
  network: Network;
  setNetwork: (value: Network) => void;
  identityCall: (args: string[]) => Promise<string>;
  walletCall: (args: string[]) => Promise<string>;
  isLoading?: boolean;
  reload: () => Promise<void>;
}

export const DfxContextValue = createContext<IDfxContextValue>({
  currentAccount: undefined,
  network: "ic",
  setNetwork(value) {},
  identityCall(args) {
    return Promise.resolve("");
  },
  walletCall(args) {
    return Promise.resolve("");
  },
  reload() {
    return Promise.resolve();
  },
});

export default function DfxContextProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<IDfxContextValue>({
    currentAccount: undefined,
    network: localStorage.getItem("network") ? (localStorage.getItem("network") as Network) : "local",
    setNetwork,
    identityCall,
    walletCall,
    reload,
  });

  useEffect(() => {
    getAccountDetails();
  }, [state.network]);

  async function reload() {
    await getAccountDetails();
  }

  async function identityCall(args: string[]): Promise<string> {
    return await dfxCall(["identity", "--network", state.network, ...args]);
  }

  async function walletCall(args: string[]): Promise<string> {
    return await dfxCall(["wallet", "--network", state.network, ...args]);
  }

  async function dfxCall(args: string[]): Promise<string> {
    return await invoke("dfx", { args });
  }

  async function getCycleBalance() {
    try {
      let cyclesBalance = await walletCall(["balance"]);
      return cyclesBalance;
    } catch (error) {
      console.warn(error);
      return "";
    }
  }

  async function getAccountDetails() {
    try {
      setIsLoading(true);
      let name = await identityCall(["whoami"]);
      let principal = await identityCall(["get-principal"]);
      let cyclesBalance = await getCycleBalance();
      setState((prevState) => ({
        ...prevState,
        currentAccount: { name, principal, cyclesBalance: cyclesBalance },
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function setNetwork(network: Network) {
    const lsNetwork = localStorage.setItem("network", network);
    setState((prevState) => ({ ...prevState, network }));
  }

  return <DfxContextValue.Provider value={{ ...state, isLoading }}>{children}</DfxContextValue.Provider>;
}
