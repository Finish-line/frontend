import { SolanaExtension } from "@magic-ext/solana";
import { Magic } from "@magic-sdk/react-native-expo";

export const magicAuth = new Magic("pk_live_847C5550E8FD0C27", {
  extensions: [
    new SolanaExtension({
      rpcUrl: "https://api.devnet.solana.com",
    }),
  ],
});
