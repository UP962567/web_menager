"use client";
import PreLoader from "@/components/Common/PreLoader";
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <PreLoader />;
  }


  return (
    <main>

    </main>
  );
}
