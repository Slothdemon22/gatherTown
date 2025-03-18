import Image from 'next/image';
import SigninForm from '../components/signInForm';

export default function RegistrationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-7xl flex-col md:flex-row shadow-lg rounded-xl overflow-hidden">
        {/* Left Column - Brand Identity - Centered Content */}
        <div className="flex w-full flex-col items-center justify-center p-8 md:p-16 lg:w-1/2 bg-gray-50 gap-12">
          {/* Logo */}
          <div></div>

          {/* Quote Box */}
          <div>
            <div className="rounded-xl border border-blue-200 p-8 max-w-md bg-white">
              <blockquote className="mb-4 text-[15px] leading-relaxed text-gray-600">
                <span className="text-2xl text-blue-500"></span>Work, connect, and collaborate in a
                virtual office that feels real. Step into your 2D Metaverse workspace where
                productivity meets presence.
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
              <h1 className="mb-2 text-3xl font-bold mb-2">Step into your virtual office!</h1>
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
            <SigninForm />
          </div>
        </div>
      </div>
    </div>
  );
}
