<script lang="ts">
  import Navbar from "./components/Navbar.svelte";
  import NftView from "./components/NFTView.svelte";
  import account from "./store/account";

  import Home from "./components/Home.svelte";
</script>

<Navbar />

{#if $account}
  <NftView />
{:else}
  <Home />
{/if}

<style>
</style>
