"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full bg-coral-100 text-coral-600 font-extrabold text-sm flex items-center justify-center hover:bg-coral-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-400"
        aria-label="User menu"
      >
        U
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-lg border border-stone-100 py-1.5 z-20 animate-scale-in">
            <button
              onClick={() => {
                setOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-red-500 transition-colors font-medium"
            >
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
