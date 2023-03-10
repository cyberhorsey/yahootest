<script lang="ts">
  import { onMount } from "svelte";
  import connectGME from "../../utils/connectGME";
  import connectMetamask from "../../utils/connectMetamask";
  import connectPhantom from "../../utils/connectPhantom";
  import detectGamestopProvider from "@gamestopnft/detect-gamestop-provider";

  let isMetamaskInstalled: boolean = false;
  let isGamestopInstalled: boolean = false;
  let isPhantomInstalled: boolean = false;

  onMount(async () => {
    const horsey = (window as any as EthereumWindow).horsey;
    const ethereum = (window as any as EthereumWindow).ethereum;
    if (ethereum) {
      isMetamaskInstalled = true;
    }

    const phantom = (window as any as EthereumWindow).phantom.solana;
    if (phantom) {
      isPhantomInstalled = true;
    }

    const gmeProvider = await detectGamestopProvider();
    if (gmeProvider) {
      isGamestopInstalled = true;
    }
  });

  type EthereumWindow = {
    horsey: string;
    ethereum: any; // todo: get rid of any typing
    phantom: { solana: any };
    gamestop: any;
  };

  async function connect(walletType: string, fn: () => Promise<void>) {
    if (walletType === "metamask") {
      // lets see if window.ethereum exists.
      if (!isMetamaskInstalled) {
        // lets open a new tab for the user at the metamask install page
        const metamaskInstallUrl =
          "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en";
        window.open(metamaskInstallUrl, "_blank");
      }
    } else if (walletType === "gme") {
      if (!isGamestopInstalled) {
        const gamestopInstallUrl =
          "https://chrome.google.com/webstore/detail/gamestop-wallet/pkkjjapmlcncipeecdmlhaipahfdphkd";
        window.open(gamestopInstallUrl, "_blank");
      }
    } else if (walletType === "phantom") {
      // lets see if window.solana.phantom exists.
      if (!isPhantomInstalled) {
        const phantomInstallUrl =
          "https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa?hl=en";
        window.open(phantomInstallUrl, "_blank");
      }
    }

    await fn();
  }
</script>

<button on:click={async () => await connect("metamask", connectMetamask)}>
  {#if isMetamaskInstalled}
    Connect Metamask
  {:else}
    Install Metamask
  {/if}
</button>
<button on:click={async () => await connect("gme", connectGME)}>
  {#if isGamestopInstalled}
    Connect GME
  {:else}
    Install GME
  {/if}
</button>
<button on:click={async () => await connect("phantom", connectPhantom)}>
  {#if isPhantomInstalled}
    Connect Phantom
  {:else}
    Install Phantom
  {/if}
</button>

<style>
</style>
