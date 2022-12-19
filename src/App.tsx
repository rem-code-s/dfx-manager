import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import Main from "@modules/main/Main";
import Frame from "./components/frame/Frame";
import Router from "@components/router/Router";

interface ITest {
  name: string;
  value: number;
}

export default function App() {
  return (
    <Frame>
      <Router />
    </Frame>
  );
}
