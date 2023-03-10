import "./app.css";
import App from "./App.svelte";

import { Buffer } from "buffer";
import Process from "process";
globalThis.process = Process;
globalThis.Buffer = Buffer;
window.Buffer = window.Buffer || require("buffer").Buffer;

const app = new App({
  target: document.getElementById("app"),
});

export default app;
