import Signin from "@/components/Auth/SignIn";
import Breadcrumb from "@/components/Common/Breadcrumb";
import PreLoader from "@/components/Common/PreLoader";
import { Metadata } from "next";
import { redirect } from "next/dist/server/api-utils";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
  title:
    "Sign In | Play SaaS Starter Kit and Boilerplate for Next.js",
};

const SigninPage = () => {

  const { data: session, status } = useSession()
  const router = useRouter();

  if (status === "loading") {
    return <PreLoader />;
  } else if (status === "authenticated") {
    router.push("/");
  }


  return (
    <>
      <Signin />
    </>
  );
};

export default SigninPage;
