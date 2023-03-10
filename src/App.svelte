<script lang="ts">
  import Navbar from "./components/Navbar.svelte";
  import NftView from "./components/NFTView.svelte";
  import account from "./store/account";

  import { Buffer } from "buffer";
  import Process from "process";
  import Home from "./components/Home.svelte";
  globalThis.process = Process;
  globalThis.Buffer = Buffer;
  window.Buffer = window.Buffer || Buffer;
</script>

<Navbar />

{#if $account}
  <NftView />
{:else}
  <Home />
{/if}

<style>
</style>
