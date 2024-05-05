import Signin from "@/components/Auth/SignIn";
import Breadcrumb from "@/components/Common/Breadcrumb";
import PreLoader from "@/components/Common/PreLoader";
import { Metadata } from "next";
import { redirect } from "next/dist/server/api-utils";
import { SessionProvider, useSession } from "next-auth/react";

export const metadata: Metadata = {
  title:
    "Sign In | Play SaaS Starter Kit and Boilerplate for Next.js",
};

const SigninPage = () => {
  return (
    <>
      <Signin />
    </>
  );
};

export default SigninPage;
