import Main from "@modules/main/Main";
import Projects from "@modules/projects/Projects";
import Wallet from "@modules/wallet/Wallet";
import React from "react";
import { Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Main />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="projects" element={<Projects />} />
      </Route>
    </Routes>
  );
}
