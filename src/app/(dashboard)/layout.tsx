"use client";

import Footer from "@/components/(admin)/Footer";
import Header from "@/components/(admin)/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import "../../styles/index.css";
import "../../styles/prism-vsc-dark-plus.css";
import ToasterContext from "../api/contex/ToasetContex";
import { useEffect, useState } from "react";
import PreLoader from "@/components/Common/PreLoader";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Dashboardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  const { data: session, status } = useSession()

  console.log(session?.user)
  console.log(session?.expires)
  console.log(status)

  useEffect(() => {
    
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (status === "loading") {
    return <PreLoader />;
  } else if (status === "unauthenticated") {
    redirect("/login");
  }


  return (
      <div>
        {loading ? (
          <PreLoader />
        ) : (

            <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme="light"
            >
              <ToasterContext />
              <Header />
              {children}
              <Footer />
              <ScrollToTop />
            </ThemeProvider>

        )}
      </div>
  );
}
