import React, { useContext, useState } from "react";
import { GlobalContextValue } from "src/context/GlobalContext";

export default function useTitle() {
  const context = useContext(GlobalContextValue);
  return { title: context.title, setTitle: context.setTitle };
}
