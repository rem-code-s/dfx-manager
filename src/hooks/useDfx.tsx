import { useContext } from "react";
import { DfxContextValue } from "src/context/DfxContext";

export default function useDfx() {
  return useContext(DfxContextValue);
}
