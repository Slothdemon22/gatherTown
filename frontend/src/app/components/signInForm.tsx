'use client';
import { FormEvent, useCallback } from 'react';
import { toast } from 'sonner';
import { userSchemaSignIn } from '../schemas/userSchema';
import { Eye } from 'lucide-react';

export default function SigninForm() {
  const handleSubmitsignIn = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    console.log(email, password);

    const emailValidation = userSchemaSignIn.pick({ email: true }).safeParse({ email });
    const passwordValidation = userSchemaSignIn.pick({ password: true }).safeParse({ password });

    if (!emailValidation.success) {
      toast.error('Not a valid email format', {
        style: { backgroundColor: '#FF5252', color: 'white' },
        duration: 6000,
      });
    }
    if (!passwordValidation.success) {
      toast.error('Password must be at least 8 characters', {
        style: { backgroundColor: '#FF5252', color: 'white' },
        duration: 6000,
      });
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error(res.statusText);

      toast.success('Login successful', { style: { backgroundColor: '#66C266', color: 'white' } }); 
      const result =await res.json();
      console.log(result);
      localStorage.setItem("token", result.token);
      
     
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!', {
        style: { backgroundColor: '#FF5252', color: 'white' },
      });
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmitsignIn} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
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

        {/* Password */}
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
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
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
              I agree to{' '}
              <a href="#" className="text-blue-500 underline">
                terms & conditions
              </a>
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="newsletter"
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="newsletter" className="ml-3 text-sm text-gray-600">
              I&apos;d like to be informed about the latest news and tips
            </label>
          </div>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 p-4 text-center text-lg font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Sign in
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="text-blue-500 underline">
            Sign up
          </a>
        </p>
      </form>
    </>
  );
}
