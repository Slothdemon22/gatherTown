"use client";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { FormEvent, useCallback } from "react";
import { toast } from "sonner";


import { userSchemaSignIn } from "@/app/schemas/userSchema";


export default function RegistrationPage() {
  const handleSubmitsignIn = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      console.log(email);
      console.log(password);
      console.log(name);
      const nameValidation = userSchemaSignIn.pick({ email: true }).safeParse({ email });
      const passwordValidation=userSchemaSignIn.pick({ password: true }).safeParse({ password });
      console.log(nameValidation)
      console.log(passwordValidation)
      if(!nameValidation.success){
        toast.error("Not a valid email format", {
          style: { backgroundColor: "#FF5252", color: "white" },
          duration: 6000,
        });
      }
      if (!passwordValidation.success) {
        toast.error("Password must be at least 8 characters", {
          style: { backgroundColor: "#FF5252", color: "white" },
          duration: 6000,
        });
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: formData.get("email"),
            password: formData.get("password"),
          }),
        }).then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          console.log(res.headers.get("Authorization")?.split(" ")[1]);
          toast.success("Login successful", {
            style: { backgroundColor: "#66C266", color: "white" },
          });
          return res.json();
        });
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong!", {
          //  description: "Please check your input and try again.",

          style: { backgroundColor: "#FF5252", color: "white" },
        });
      }
    },
    []
  );
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-7xl flex-col md:flex-row shadow-lg rounded-xl overflow-hidden">
        {/* Left Column - Brand Identity - Centered Content */}
        <div className="flex w-full flex-col items-center justify-center p-8 md:p-16 lg:w-1/2 bg-gray-50 gap-12">
          {/* Logo */}
          <div>
            <Image
              src="/Gamerz-logo.png"
              alt="Gamers Logo"
              width={220}
              height={60}
              priority
              className="w-[220px]"
            />
          </div>

          {/* Quote Box */}
          <div>
            <div className="rounded-xl border border-blue-200 p-8 max-w-md bg-white">
              <blockquote className="mb-4 text-[15px] leading-relaxed text-gray-600">
                <span className="text-2xl text-blue-500"></span>Work, connect,
                and collaborate in a virtual office that feels real. Step into
                your 2D Metaverse workspace where productivity meets presence.
              </blockquote>
              <p className="text-blue-500 font-medium">GatherTown</p>
            </div>
          </div>

          {/* 3D Joystick */}
          <div>
            <Image
              src="/joystick.png"
              alt="Gaming Joystick"
              width={280}
              height={280}
              className="drop-shadow-xl"
            />
          </div>
        </div>

        {/* Right Column - Registration Form */}
        <div className="flex w-full flex-col justify-center p-8 md:p-16 lg:w-1/2">
          <div className="mx-auto w-full max-w-md">
            {/* Heading */}
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold mb-2">
                Step into your virtual office!
              </h1>
              <p className="text-gray-500">
                Work, meet, and collaborate in an immersive online workspace
              </p>
            </div>

            {/* Divider */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">or</span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmitsignIn} className="space-y-6">
              
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Write your email"
                  className="w-full rounded-xl border border-gray-200 p-4 text-gray-600 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

             

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Choose a password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-200 p-4 pr-12 text-gray-600 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    <Eye size={20} />
                  </button>
                </div>
                {/* Password Strength Indicator */}
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                    I agree to{" "}
                    <Link href="#" className="text-blue-500 underline">
                      terms & conditions
                    </Link>
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="newsletter"
                    className="ml-3 text-sm text-gray-600"
                  >
                    I&apos;d like being informed about latest news and tips
                  </label>
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 p-4 text-center text-lg font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Sign up for free
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600">
                Do you already have an account?{" "}
                <Link href="#" className="text-blue-500 underline">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
