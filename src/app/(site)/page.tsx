"use client";
import PreLoader from "@/components/Common/PreLoader";
import { Tabs } from "@/components/Tab/Tabs";
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter();

  if (status === "loading") {
    return <PreLoader />;
  } else if (status === "unauthenticated") {
    router.push("/signin");
  } 


  return (
    <main>

    </main>
  );
}
