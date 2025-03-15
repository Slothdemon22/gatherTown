"use client";

import type React from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { userSchemaSignUp } from "@/app/schemas/userSchema";
import { ArrowLeft } from "lucide-react";

// Define the schema

export default function RegistrationPage() {
   const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = new FormData(e.currentTarget);

      // Extract individual fields
      const name = form.get("name") as string;
      const email = form.get("email") as string;
      const password = form.get("password") as string;

      const nameValidation = userSchemaSignUp
         .pick({ name: true })
         .safeParse({ name });
      const emailValidation = userSchemaSignUp
         .pick({ email: true })
         .safeParse({ email });
      const passwordValidation = userSchemaSignUp
         .pick({ password: true })
         .safeParse({ password });

      // Handle validation errors
      if (!nameValidation.success) {
         toast.error("Name is required");
         return;
      }

      if (!emailValidation.success) {
         toast.error("Not a valid email format", {
            style: { backgroundColor: "#FF5252", color: "white" },
            duration: 6000,
         });
         return;
      }

      if (!passwordValidation.success) {
         toast.error("Password must be at least 8 characters long");
         return;
      }

      try {
         const response = await fetch(
            "http://localhost:5000/api/auth/register",
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ name, email, password }),
            },
         );

         if (!response.ok) {
            throw new Error("Failed to register");
         }

         const data = await response.json();
         toast.success("Account created successfully!", {
            style: { backgroundColor: "#66C266", color: "white" },
         });
         console.log(data);
      } catch (error) {
         console.error(error);
         toast.error("Account creation failed");
      }
   };

   return (
      <div className="flex min-h-screen flex-col md:flex-row">
         {/* Left Column - Visual & Branding (45%) */}
         <div className="relative w-full md:w-[45%] bg-gray-900 text-white flex flex-col justify-center items-center p-8">
            {/* Background Image */}
            <Image
               src="/SignUp-bg.png"
               alt="Gaming controller background"
               fill
               className="object-cover absolute"
               priority
            />
            <div className="relative z-10 text-center max-w-md px-4">
               <h1 className="text-4xl font-bold mb-6">Join Us Today!</h1>
               <p className="text-xl mb-8">
                  Unlock a world of gaming experiences and be part of our
                  community.
               </p>
               <blockquote className="text-lg italic opacity-90 mt-8 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                  "In this digital space, every interaction is a moment of
                  connection, shaping the experience of our shared virtual
                  world"
                  <footer className="mt-2 text-sm font-medium text-right">
                     - Gather Town
                  </footer>
               </blockquote>
            </div>
         </div>

         {/* Right Column - Registration Form (55%) */}
         <div className="flex flex-col items-center justify-center w-full p-8 md:p-10 lg:p-16 md:w-[55%] bg-white">
            <div className="w-full max-w-md">
               <Link
                  href="/"
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8 group"
               >
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-[-2px] transition-transform" />
                  Back
               </Link>

               <h1 className="text-3xl font-bold text-gray-800 mb-3">
                  Register Individual Account!
               </h1>
               <p className="text-gray-500 mb-8">
                  Join the gaming community and enjoy exclusive benefits.
               </p>

               <form className="space-y-6" onSubmit={handleSubmitSignUp}>
                  <div className="space-y-4">
                     <div>
                        <label
                           htmlFor="name"
                           className="block text-sm font-medium text-gray-700 mb-1"
                        >
                           Full Name
                        </label>
                        <Input
                           id="name"
                           name="name"
                           placeholder="Your Name"
                           className="h-12 text-base"
                           required
                        />
                     </div>

                     <div>
                        <label
                           htmlFor="email"
                           className="block text-sm font-medium text-gray-700 mb-1"
                        >
                           Email Address
                        </label>
                        <Input
                           id="email"
                           type="email"
                           name="email"
                           placeholder="Enter email address"
                           className="h-12 text-base"
                           required
                        />
                     </div>

                     <div>
                        <label
                           htmlFor="password"
                           className="block text-sm font-medium text-gray-700 mb-1"
                        >
                           Password
                        </label>
                        <Input
                           id="password"
                           type="password"
                           name="password"
                           placeholder="Enter password"
                           className="h-12 text-base"
                           required
                        />
                     </div>

                     <div>
                        <label
                           htmlFor="repeat-password"
                           className="block text-sm font-medium text-gray-700 mb-1"
                        >
                           Confirm Password
                        </label>
                        <Input
                           id="repeat-password"
                           type="password"
                           name="repeat-password"
                           placeholder="Repeat password"
                           className="h-12 text-base"
                           required
                        />
                     </div>
                  </div>

                  <div className="flex items-center space-x-2 py-2">
                     <Checkbox id="terms" name="terms" required />
                     <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the{" "}
                        <Link
                           href="/terms"
                           className="text-blue-600 hover:underline"
                        >
                           terms & conditions
                        </Link>
                     </label>
                  </div>

                  <Button
                     className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white"
                     type="submit"
                  >
                     Create Account
                  </Button>

                  <div className="mt-6 text-center text-sm">
                     <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link
                           href="/signin"
                           className="text-blue-600 font-medium hover:underline"
                        >
                           Sign in
                        </Link>
                     </p>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}
