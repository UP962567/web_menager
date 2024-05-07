"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import "../../styles/index.css";
import "../../styles/prism-vsc-dark-plus.css";
import { useEffect, useState } from "react";
import PreLoader from "@/components/Common/PreLoader";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const { data: session, status } = useSession()

  if (status === "loading") {
    return <PreLoader />;
  } else if (status === "authenticated") {
    redirect("/");
  }

  console.log(status)

  return (

    <div>
      {loading ? (
        <PreLoader />
      ) : (
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            defaultTheme="light"
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      )}
    </div>
  );
}
