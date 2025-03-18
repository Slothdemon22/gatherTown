'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { userSchemaSignUp } from '../schemas/userSchema';

export default function SignUpForm() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = form.get('name') as string;
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    const nameValidation = userSchemaSignUp.pick({ name: true }).safeParse({ name });
    const emailValidation = userSchemaSignUp.pick({ email: true }).safeParse({ email });
    const passwordValidation = userSchemaSignUp.pick({ password: true }).safeParse({ password });

    if (!nameValidation.success) {
      toast.error('Name is required');
      return;
    }
    if (!emailValidation.success) {
      toast.error('Not a valid email format', { duration: 6000 });
      return;
    }
    if (!passwordValidation.success) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    if (!acceptedTerms) {
      toast.error('You must accept the terms and conditions.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) throw new Error('Failed to register');

      const data = await response.json();
      toast.success('Account created successfully!');
      console.log(data);
    } catch (error) {
      console.error(error);
      toast.error('Account creation failed');
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmitSignUp}>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
          <label htmlFor="repeat-password" className="block text-sm font-medium text-gray-700 mb-1">
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

      {/* ✅ Fixed Checkbox */}
      <div className="flex items-center space-x-2 py-2">
        <Checkbox.Root
          id="terms"
          checked={acceptedTerms}
          onCheckedChange={(checked) => setAcceptedTerms(!!checked)}
          className="w-5 h-5 border border-gray-300 rounded-md flex items-center justify-center data-[state=checked]:bg-blue-600"
        >
          <Checkbox.Indicator>
            <Check className="w-4 h-4 text-white" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label htmlFor="terms" className="text-sm text-gray-600">
          I agree to the{' '}
          <Link href="/terms" className="text-blue-600 hover:underline">
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
          Already have an account?{' '}
          <Link href="/signin" className="text-blue-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}
