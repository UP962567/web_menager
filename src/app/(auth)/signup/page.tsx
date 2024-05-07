"use client";
import SignUp from "@/components/Auth/SignUp";
import Breadcrumb from "@/components/Common/Breadcrumb";
import PreLoader from "@/components/Common/PreLoader";
import { Metadata } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter();

  if (status === "loading") {
    return <PreLoader />;
  } else if (status === "authenticated") {
    router.push("/");
  } 

  return (
    <>
      <SignUp />
    </>
  );
};

export default SignupPage;
