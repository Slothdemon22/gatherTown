'use client';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function HeroBanner() {
  const [showBanner, setShowBanner] = useState(true);
  return (
    <>
      {showBanner && (
        <div className="bg-[#3850FF] text-white py-4 px-6 flex items-center justify-between">
          <p className="text-sm sm:text-base">
            We&apos;re building a brand new version of Gather, redesigned from the ground up. Want
            early access?
          </p>
          <div className="flex items-center gap-4">
            <Button variant="secondary" className="text-[#3850FF] bg-white hover:bg-white/90">
              Join the Waitlist
            </Button>
            <button onClick={() => setShowBanner(false)} className="text-white hover:text-white/80">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
