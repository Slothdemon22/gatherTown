import type React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import SignUpForm from '../components/signUpform';

export default function RegistrationPage() {
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
            Unlock a world of gaming experiences and be part of our community.
          </p>
          <blockquote className="text-lg italic opacity-90 mt-8 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            "In this digital space, every interaction is a moment of connection, shaping the
            experience of our shared virtual world"
            <footer className="mt-2 text-sm font-medium text-right">- Gather Town</footer>
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

          <h1 className="text-3xl font-bold text-gray-800 mb-3">Register Individual Account!</h1>
          <p className="text-gray-500 mb-8">
            Join the gaming community and enjoy exclusive benefits.
          </p>

          <SignUpForm></SignUpForm>
        </div>
      </div>
    </div>
  );
}
