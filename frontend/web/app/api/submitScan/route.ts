import { NextRequest, NextResponse } from 'next/server';
import { mintNFT } from '../../utils/createNFTs';

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

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body to get the scan details
    const scanDetails: ScanDetails = await req.json();

    // Call your mintNFT function with the scan details and get the explorerURL
    const { explorerURL, uri } = await mintNFT(scanDetails);

    // Send a success response including the explorerURL
    return NextResponse.json({ message: 'NFT minted successfully', explorerURL: explorerURL, uri: uri });
  } catch (error) {
    // Send an error response
    const err = error as Error;
    return NextResponse.json({ message: 'Error minting NFT', error: err.message }, { status: 500 });
  }
}