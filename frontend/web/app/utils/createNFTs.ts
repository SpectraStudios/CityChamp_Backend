import { payer, connection } from "../lib/vars";
import { explorerURL, printConsoleSeparator } from "../lib/helpers";
import { Metaplex, bundlrStorage, keypairIdentity } from "@metaplex-foundation/js";

interface ScanDetails {
  filename: string;
  size: number | null;
  imageUrl: string;
  model: string;
  latitude: string | null;
  longitude: string | null;
  dateUploaded: string;
  scanner: string;
}

export async function mintNFT(scanDetails: ScanDetails) {
    console.log("Payer address:", payer.publicKey.toBase58());

    const metadata = {
        name: scanDetails.filename, 
        symbol: "SCAN",
        description: `A 3D scan uploaded on ${scanDetails.dateUploaded}.`,
        image: scanDetails.imageUrl,
        model: scanDetails.model,
        attributes: [
            {
                trait_type: "Size",
                value: scanDetails.size ? `${scanDetails.size} MB` : "Unknown",
            },
            {
                trait_type: "Latitude",
                value: scanDetails.latitude || "Unknown",
            },
            {
                trait_type: "Longitude",
                value: scanDetails.longitude || "Unknown",
            },
            {
              trait_type: "Scanner",
              value: scanDetails.scanner,
          },
        ],
    };

    const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(payer))
        .use(bundlrStorage({
            address: "https://devnet.bundlr.network",
            providerUrl: "https://api.devnet.solana.com",
            timeout: 60000,
        }));

    console.log("Uploading metadata...");
    const { uri } = await metaplex.nfts().uploadMetadata(metadata);
    console.log("Metadata uploaded:", uri);

    printConsoleSeparator("NFT details");
    console.log("Creating NFT using Metaplex...");

    const { nft, response } = await metaplex.nfts().create({
        uri,
        name: metadata.name,
        symbol: metadata.symbol,
        sellerFeeBasisPoints: 0, 
        isMutable: true,
    });

    console.log(nft);
    printConsoleSeparator("NFT created:");
    console.log(explorerURL({ txSignature: response.signature }));
    return { explorerURL: explorerURL({ txSignature: response.signature }), uri: uri }
}