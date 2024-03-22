import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-center items-center w-full">
        <Image
          src="https://i.postimg.cc/K8L09qGw/City-Champ-horizontal-white.png"
          alt="City Champ Logo"
          width={500}
          height={300}
        />
      </div>
    </main>
  );
}
