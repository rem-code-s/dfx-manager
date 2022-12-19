import { invoke } from "@tauri-apps/api";
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

interface IGlobalContextValue {
  title: string;
  setTitle: (value: string) => void;
}

export const GlobalContextValue = createContext<IGlobalContextValue>({
  title: "dfx",
  setTitle(value) {},
});

export default function GlobalContextProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<IGlobalContextValue>({
    title: "dfx",
    setTitle,
  });

  function setTitle(title: string) {
    setState((prevState) => ({ ...prevState, title }));
  }

  return <GlobalContextValue.Provider value={state}>{children}</GlobalContextValue.Provider>;
}
