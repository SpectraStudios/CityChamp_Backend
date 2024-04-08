"use client";

import React, { useState, useEffect, useRef } from 'react';
import { PickerDropPane } from 'filestack-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

interface FileDetails {
    filename: string;
    size: number;
    url: string;
}

interface NftAttribute {
    trait_type: string;
    value: string;
}

interface NftDetails {
    name: string;
    symbol: string;
    description: string;
    image: string;
    url?: string;
    attributes: NftAttribute[];
    model: string;
}

export default function UploadPage() {
    const [fileDetails, setFileDetails] = useState<FileDetails | null>(null);
    const [imageDetails, setImageDetails] = useState<FileDetails | null>(null);
    const [latitude, setLatitude] = useState<string | null>(null);
    const [longitude, setLongitude] = useState<string | null>(null);
    const [dateUploaded, setDateUploaded] = useState<string>('');
    const [fileSizeMB, setFileSizeMB] = useState<number | null>(null);
    const [nftDetails, setNftDetails] = useState<NftDetails | null>(null);
        const [modelUrl, setModelUrl] = useState<string | null>(null);

    const [transactionLink, setTransactionLink] = useState('');
    const [uriLink, setUriLink] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const { publicKey } = useWallet();
    const [isSubmitting, setIsSubmitting] = useState(false);



    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    const Model = ({ modelUrl }: { modelUrl: string | null }) => {
        if (!modelUrl) {
            return null; // or some loading spinner
        }
    
        const { scene } = useGLTF(modelUrl);
        return <primitive object={scene} scale={0.5} />;
    };

    // Inside your UploadPage component

    const onUploadDone = (res: any) => {
        console.log('Upload done', res.filesUploaded[0]);
        const uploadedFile = res.filesUploaded[0];
        setFileDetails(uploadedFile);
        setDateUploaded(new Date().toISOString()); // Set the upload date
        setFileSizeMB(uploadedFile.size / (1024 * 1024)); // Set the file size in MB
    };

    // Adjusted clientOptions and imageOptions to use the new onUploadDone handler
    const clientOptions = {
        accept: ['.glb', '.gltf'],
        maxSize: 1024 * 1024 * 100,
        onUploadDone: onUploadDone,
    };

    const imageOptions = {
        accept: ['image/*'],
        maxSize: 1024 * 1024 * 10,
        onUploadDone: onUploadDone,
    };

    const submitScan = async () => {
        if (!publicKey || !fileDetails) {
            console.error("Wallet is not connected or file details are missing.");
            return;
        }
        setIsSubmitting(true); // Start loading

        try {
            // Ensure latitude and longitude are captured before submission
            const lat = latitude || 'Not provided';
            const long = longitude || 'Not provided';

            const scanDetails = {
                filename: fileDetails.filename,
                size: fileDetails.size / (1024 * 1024), // Convert to MB
                imageUrl: imageDetails?.url, // Ensure this is set correctly
                latitude: lat,
                longitude: long,
                dateUploaded: new Date().toISOString(),
                scanner: publicKey.toString(),
                model: fileDetails.url
            };

            const response = await fetch('/api/submitScan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(scanDetails),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setTransactionLink(data.explorerURL); // Set the real transaction link
            setUriLink(data.uri)

            setNftDetails({
                name: fileDetails.filename, // Use the filename as the name of the NFT
                symbol: "SCAN", // Assuming symbol remains constant, adjust if necessary
                description: `A 3D scan uploaded on ${scanDetails.dateUploaded}.`,
                image: imageDetails?.url || "", // Use the image URL from the uploaded image details
                attributes: [
                    { trait_type: "Latitude", value: lat },
                    { trait_type: "Longitude", value: long },
                    { trait_type: "Date Uploaded", value: new Date().toISOString() },
                    { trait_type: "Scanner", value: publicKey.toString() },
                    { trait_type: "Size", value: `${(fileDetails.size / (1024 * 1024)).toFixed(2)} MB` }, // Convert size to MB and format
                ],
                model: fileDetails.url, // URL to the 3D model
            });

            // Update state to show the details after submission
            setDateUploaded(new Date().toISOString());
            setLatitude(lat);
            setLongitude(long);
            setModelUrl(fileDetails.url)

            setIsSubmitting(false); // Stop loading
        } catch (error) {
            console.error(error);
            setIsSubmitting(false); // Ensure loading state is reset on error
        }
    };

    const handleMintNFT = () => {
        if (nftDetails) {
            // Reset to initial state for another submission
            setNftDetails(null);
            setIsMounted(true); // Show the form again
        } else {
            submitScan();
        }
    };

    const submitAnotherScan = () => {
        // Reset states for another submission
        setFileDetails(null);
        setImageDetails(null);
        setLatitude(null);
        setLongitude(null);
        setDateUploaded('');
        setFileSizeMB(null);
        setNftDetails(null); // Reset nftDetails to allow for a new upload
        setTransactionLink(''); // Clear the transaction link
        setIsSubmitting(false); // Stop loading
    };

    const FILESTACK_API_KEY = process.env.FILESTACK_API_KEY || 'AYbR8geVpRFqM72aWbwaJz';
    if (!FILESTACK_API_KEY) {
        throw new Error('Filestack API key is missing. Please check your environment variables.');
    }

    { console.log(nftDetails?.model) }

    return (
        <>
            {isMounted && !nftDetails ? (
                <>
                    <h1 className="text-xl font-semibold mb-4 text-center mt-8">
                        {fileDetails ? (imageDetails ? 'Submit Scan' : 'Upload Preview Image') : 'Upload Scan'}
                    </h1>
                    <div className="p-10 max-w-xl mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 justify-center">
                        <div className="flex-shrink-0">
                            {!fileDetails && (
                                <PickerDropPane
                                    apikey={FILESTACK_API_KEY}
                                    clientOptions={clientOptions}
                                    onUploadDone={(res: any) => setFileDetails(res.filesUploaded[0])} />
                            )}
                            {fileDetails && (

                                <div className="mt-4">
                                    <div className="mt-4">
                                        <h2 className="text-lg font-semibold">3D Preview</h2>
                                        <div style={{ width: '100%', height: '300px' }}>
                                            <Canvas>
                                                <ambientLight intensity={0.3} />
                                                <directionalLight color="white" position={[0, 0, 5]} />
                                                {fileDetails.url && <Model modelUrl={fileDetails.url} />}
                                                <OrbitControls />
                                            </Canvas>
                                        </div>
                                    </div>
                                    <h2 className="text-lg font-semibold">Scan Details</h2>
                                    <p>Name: {fileDetails.filename}</p>
                                    <p>Size: {(fileDetails.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    <p>Date: {new Date().toLocaleDateString()}</p>
                                    <p>URL: <a href={fileDetails.url} target="_blank" rel="noopener noreferrer">{fileDetails.url}</a></p>
                                    <p>GPS Coordinates</p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <input type="text" placeholder="Latitude" value={latitude || ''} onChange={(e) => setLatitude(e.target.value)} className="border rounded bg-white" />
                                            <span className="ml-2">Lat</span>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="text" placeholder="Longitude" value={longitude || ''} onChange={(e) => setLongitude(e.target.value)} className="border rounded bg-white" />
                                            <span className="ml-2">Long</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {fileDetails && !imageDetails && (
                                <>
                                    <h1 className="text-xl font-semibold my-8 text-center">Upload Preview Image</h1>
                                    <PickerDropPane
                                        apikey={FILESTACK_API_KEY}
                                        clientOptions={imageOptions}
                                        onUploadDone={(res: any) => setImageDetails(res.filesUploaded[0])}
                                    />
                                </>
                            )}
                            {fileDetails && imageDetails && (
                                <img src={imageDetails.url} alt="Preview" className="max-w-xs mt-4" />
                            )}
                            {fileDetails && imageDetails && !nftDetails && (
                                <button
                                    className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                                    onClick={handleMintNFT} // This assumes handleMintNFT internally decides to call submitScan or submitAnotherScan based on some condition.
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting Scan...' : 'Submit Scan'}
                                </button>
                            )}
                        </div>
                    </div>
                </>
            ) : nftDetails && (

                <div className="p-10 max-w-xl mx-auto bg-white rounded-xl shadow-md">
                    <h1 className="text-xl font-semibold mb-4 text-center">Scan Submission Complete</h1>
                    {/* <div style={{ width: '100%', height: '300px' }}>
                    <Canvas>
                                                <ambientLight intensity={0.3} />
                                                <directionalLight color="white" position={[0, 0, 5]} />
                                                {fileDetails?.url && <Model modelUrl={fileDetails?.url} />}
                                                <OrbitControls />
                                            </Canvas>
                    </div> */}
                    <p>Scanner Address: {publicKey?.toString()}</p>
                    <p>Date Uploaded: {new Date(dateUploaded).toLocaleString()}</p>
                    <p>Latitude: {latitude}</p>
                    <p>Longitude: {longitude}</p>
                    <div>
                        <a href={transactionLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Transaction Confirmation</a>
                    </div>
                    <div>
                        <a href={uriLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Metadata URI</a>
                    </div>
                    <button
                        className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                        onClick={submitAnotherScan}
                    >
                        Submit Another Scan
                    </button>
                </div>
            )}
        </>
    );
}

