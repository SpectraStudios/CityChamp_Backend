"use client";

import React, { useState, useEffect } from 'react';
import AccountDetailFeature from '@/components/account/account-detail-feature';
import Image from "next/image";
import { useParams } from 'next/navigation';
import { PublicKey } from '@solana/web3.js';

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const { address } = useParams();

  useEffect(() => {
    if (address) {
      setWallet(new PublicKey(address as string).toString());
    }
  }, [address]);

  return (
    <div className="p-6 rounded-lg shadow-lg flex flex-col items-center">
      <div className="h-32 w-32">
        <Image
          alt="Profile Picture"
          src="https://placehold.co/250x250?text=ProfilePicture"
          layout="responsive"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <div className="bg-white p-4 rounded w-1/2 mt-4 text-center">
        <div className="mt-4">
          <label className="block text-gray-700 text-center">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" />
        </div>
        <div className="mt-4 text-center">
          <label className="block text-gray-700 text-center">Wallet:</label>
          <input type="text" value={wallet} readOnly className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-center" />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 text-center">Date Joined:</label>
          <p className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-center">3/28/24</p>
        </div>
      </div>
      <AccountDetailFeature />
    </div>
  );
}
