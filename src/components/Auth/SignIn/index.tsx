"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/Common/Loader";

const Signin = () => {
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    checkboxToggle: false,
  });

  const [isPassword, setIsPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginUser = (e: any) => {
    e.preventDefault();

    setLoading(true);
    signIn("credentials", { ...loginData, redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error(callback?.error);
          console.log(callback?.error);
          setLoading(false);
          return;
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Login successful");
          setLoading(false);
          router.push("/");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
        toast.error(err.message);
      });
  };

  return (
    <section className="py-14 bg-dark lg:py-20">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp relative mx-auto max-w-[525px] overflow-hidden rounded-lg px-8 py-14 text-center bg-dark-2 sm:px-12 md:px-[60px]"
              data-wow-delay=".15s"
            >


                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-[22px]">
                    <input
                      type="email"
                      placeholder="Email"
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      className="w-full rounded-md border border-stroke px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-[22px]">
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:focus:border-primary"
                    />
                  </div>
                  <div className="mb-9">
                    <button
                      onClick={loginUser}
                      type="submit"
                      className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base transition duration-300 ease-in-out hover:bg-primary/90"
                    >
                      Sign In {loading && <Loader />}
                    </button>
                  </div>
                </form>

              <Link
                href="/forgot-password"
                className="mb-2 inline-block text-base text-dark hover:text-primary dark:hover:text-primary"
              >
                Forget Password?
              </Link>
              <p className="text-body-secondary text-base">
                Not a member yet?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
      </div>
    </section>
  );
};

export default Signin;
