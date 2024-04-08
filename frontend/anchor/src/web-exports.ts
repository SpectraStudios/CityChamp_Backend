// Here we export some useful types and functions for interacting with the Anchor program.
import { Cluster, PublicKey } from '@solana/web3.js';
import type { Web } from '../target/types/web';
import { IDL as WebIDL } from '../target/types/web';

// Re-export the generated IDL and type
export { Web, WebIDL };

// After updating your program ID (e.g. after running `anchor keys sync`) update the value below.
export const WEB_PROGRAM_ID = new PublicKey(
  'BHBp9oG36J599fKAsxwTseTPx56UXGBBY2EeMpSpHYZZ'
);

// This is a helper function to get the program ID for the Web program depending on the cluster.
export function getWebProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return WEB_PROGRAM_ID;
  }
}
