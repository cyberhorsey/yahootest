<script lang="ts">
  import Navbar from "./components/Navbar.svelte";
  import NftView from "./components/NFTView.svelte";
  import account from "./store/account";

  import Home from "./components/Home.svelte";
  window.require = (name) => new URL(name, import.meta.url).href;
</script>

<Navbar />

{#if $account}
  <NftView />
{:else}
  <Home />
{/if}

<style>
</style>
