"use client";
import Signin from "@/components/Auth/SignIn";
import PreLoader from "@/components/Common/PreLoader";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

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
