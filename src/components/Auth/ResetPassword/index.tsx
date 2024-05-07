"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/Common/Loader";
import Link from "next/link";
import Image from "next/image";

const ResetPassword = ({ token }: { token: string }) => {
  const [data, setData] = useState({
    newPassword: "",
    ReNewPassword: "",
  });
  const [loader, setLoader] = useState(false);

  const [user, setUser] = useState({
    email: "",
  });

  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.post(`/api/forgot-password/verify-token`, {
          token,
        });

        if (res.status === 200) {
          setUser({
            email: res.data.email,
          });
        }
      } catch (error: any) {
        toast.error(error?.response?.data);
        router.push("/forgot-password");
      }
    };

    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    if (data.newPassword === "") {
      toast.error("Please enter your password.");
      return;
    }

    try {
      const res = await axios.post(`/api/forgot-password/update`, {
        email: user?.email,
        password: data.newPassword,
      });

      if (res.status === 200) {
        toast.success(res.data);
        setData({ newPassword: "", ReNewPassword: "" });
        router.push("/signin");
      }

      setLoader(false);
    } catch (error: any) {
      toast.error(error.response.data);
      setLoader(false);
    }
  };

  return (
    <section className="py-14 dark:bg-dark lg:py-20">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp relative mx-auto max-w-[525px] overflow-hidden rounded-lg px-8 py-14 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]"
              data-wow-delay=".15s"
            >


              <form onSubmit={handleSubmit}>
                <div className="mb-[22px]">
                  <input
                    type="text"
                    placeholder="New password"
                    name="newPassword"
                    value={data?.newPassword}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark- dark:focus:border-primary"
                  />
                </div>

                <div className="mb-[22px]">
                  <input
                    type="text"
                    placeholder="New password"
                    name="newPassword"
                    value={data?.newPassword}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:focus:border-primary"
                  />
                </div>
                <div className="">
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base transition duration-300 ease-in-out hover:bg-blue-dark"
                  >
                    Save Password {loader && <Loader />}
                  </button>
                </div>
              </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
