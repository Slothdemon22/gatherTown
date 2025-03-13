"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FormEvent, useCallback } from "react";
import { toast } from "sonner";

export default function RegistrationPage() {
  const handleSubmitSignUp = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = e.target as HTMLFormElement;
      const email = (form.elements.namedItem("email") as HTMLInputElement)
        ?.value;
      const password = (form.elements.namedItem("password") as HTMLInputElement)
        ?.value;
      const repeatPassword = (
        form.elements.namedItem("repeat-password") as HTMLInputElement
      )?.value;
      console.log(email);
      console.log(password);
      console.log(repeatPassword);
      const name = "houhwdouqoqjd";
      try {
        const res: any = await fetch(
          "http://localhost:5000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              // Authorization:
            },
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
            }),
          }
        )
          .then((res) => {
            console.log(res);

            if (!res.ok) {
              throw new Error("Skibidi");
            }

            return res.json();
          })
          .then((data) => {
              console.log(data);
              toast.success("Account created successfully");    
          });
      } catch (error) {
          console.log(error);
          toast.error("Account creation failed");
      }
    },
    []
  );

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Column - Visual & Branding (45%) */}
      <div className="relative flex w-full flex-col justify-between bg-[#0052cc] p-8 text-white md:w-[45%]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <Image
            src="/SignIn-bg.png"
            alt="Gaming controller background"
            fill
            className="object-contain object-center opacity-30 scale-125"
            priority
          />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <Image
              src="/SignIn-logo.png"
              alt="Gamers Logo"
              width={40}
              height={40}
            />
            <span className="text-xl font-bold">Gamers</span>
          </div>
        </div>

        {/* Quote */}
        <div className="relative z-10 mx-auto max-w-md rounded-lg bg-[#0046ad]/30 p-6">
          <p className="text-lg font-light leading-relaxed">
            In this digital space, every interaction is a moment of connection,
            shaping the experience of our shared virtual world
          </p>
          <p className="mt-4 text-right text-sm font-medium">Gather Town</p>
        </div>

        {/* Decorative Corner Bracket */}
        <div className="relative z-10 self-end">
          <div className="h-8 w-8 border-b-2 border-r-2 border-white opacity-50"></div>
        </div>
      </div>

      {/* Right Column - Registration Form (55%) */}
      <div className="flex w-full flex-col bg-white p-4 md:w-[55%] md:px-52 md:py-30">
        {/* Back Button */}
        <Link
          href="#"
          className="mb-12 flex items-center text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Back</span>
        </Link>

        {/* Form Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">
            Register Individual Account!
          </h1>
          <p className="text-gray-500">
            For the purpose of gamers regulation, your details are required.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmitSignUp} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block font-medium">
              Email address<span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter email address"
              className="w-full rounded-md border p-3"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block font-medium">
              Create password<span className="text-red-500">*</span>
            </label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              className="w-full rounded-md border p-3"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="repeat-password" className="block font-medium">
              Repeat password<span className="text-red-500">*</span>
            </label>
            <Input
              id="repeat-password"
              type="password"
              name="repeat-password"
              placeholder="Repeat password"
              className="w-full rounded-md border p-3"
              required
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              name="terms"
              id="terms"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-[#0052cc]"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to terms & conditions
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0052cc] py-3 text-white transition-all hover:bg-[#0041a3] hover:scale-[1.02]"
          >
            Register Account
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">Or</span>
            </div>
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white p-3 text-gray-700 shadow-sm transition-all hover:shadow-md"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path
                  fill="#4285F4"
                  d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                />
                <path
                  fill="#34A853"
                  d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                />
                <path
                  fill="#FBBC05"
                  d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                />
                <path
                  fill="#EA4335"
                  d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                />
              </g>
            </svg>
            <span>Register with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
}