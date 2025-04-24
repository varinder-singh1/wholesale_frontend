"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, SignInData } from "@/store/actions/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { USER_ROLE } from "@/app/constants";
import { useRouter } from "next/navigation";
import { mapServerErrors } from "@/helpers/commonFunction";

export default function Register() {

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Login Data:", formData);
  // };

  const handleSubmit = async (
    e: React.FormEvent,
    values: SignInData
  ) => {
    e.preventDefault();

    try {
      const res = await dispatch(signIn(values)).unwrap();
      console.log("Submitted values:", res);

      //  const apiResponse = res.payload
      if (res.success) {
        if (res.data?.user.role == USER_ROLE.wholesale) {
          router.push(`/`);
        }
        if (res.data?.user.role == USER_ROLE.frontend_user) {
          router.push(`/user/orders`);
        }
      }
    } catch (error) {
      console.log(error);

      const formErrors = mapServerErrors((error as any).errors, setErrors);
      console.error("Login failed:", formErrors);
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row max-w-4xl border border-black gap-5 mx-auto ">
      <div className="w-full md:w-1/2">
        <Image
          src="https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Login"
          width={500}
          height={500}
          className="h-full w-full hidden md:block "
        />
      </div>

      <div className="w-full md:w-1/2 p-3">
        <h2 className="text-2xl text-black font-bold mb-4">Login</h2>
        <form onSubmit={ (e)=> handleSubmit(e,formData)}>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-1">
              <label className="block text-black mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 border rounded p-2 border-black"
              
              />
            </div>

            <div className="p-1">
              <label className="block text-black mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 border rounded p-2 border-black"
          
              />
            </div>
          </div>

          <div className="mt-4">
            <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">
              Login
            </button>
          </div>
        </form>
        <p className="text-black mt-2 text-center">
          Don't have an account? <Link className="text-blue-500" href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
