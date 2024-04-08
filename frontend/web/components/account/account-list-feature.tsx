'use client';

import React from 'react'
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../solana/solana-provider';

import { redirect } from 'next/navigation';

export default function AccountListFeature() {
  const { publicKey } = useWallet();

  if (publicKey) {
    return redirect(`/profile/${publicKey.toString()}`);
  }

  return (
    <div className="hero py-[64px]">
      <div className="hero-content text-center">
      {React.createElement(WalletButton, {})}
      </div>
    </div>
  );
}
