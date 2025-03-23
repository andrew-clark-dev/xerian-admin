'use client'; // This tells Next.js this is a client-side component

import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth"

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    const signOutUser = async () => {
      try {
        await signOut(); // Directly sign out using Amplify
        router.replace('/'); // Redirect to home page
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

    signOutUser();
  }, [router]);

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="text-gray-200 animate-spin stroke-brand-500 dark:text-gray-800">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="24"
            cy="24"
            r="22"
            stroke="currentColor"
            strokeWidth="4"
          />
          <mask id="path-2-inside-1_3755_26214" fill="white">
            <path d="M46.0051 24C47.1068 24 48.0086 23.1053 47.9172 22.0073C47.5452 17.5426 45.9291 13.2565 43.2335 9.64482C40.139 5.4986 35.7874 2.4634 30.8274 0.991599C25.8674 -0.480201 20.5646 -0.309788 15.7094 1.47744C11.4802 3.03423 7.78776 5.74518 5.04079 9.28438C4.36525 10.1547 4.63305 11.3965 5.55649 11.9975C6.47993 12.5984 7.70826 12.3295 8.39813 11.4705C10.6656 8.64692 13.6659 6.48122 17.0877 5.22166C21.1357 3.73155 25.557 3.58947 29.6924 4.81659C33.8278 6.04371 37.456 8.57434 40.0361 12.0313C42.217 14.9533 43.5504 18.405 43.9108 22.0083C44.0205 23.1046 44.9033 24 46.0051 24Z" />
          </mask>
          <path
            d="M46.0051 24C47.1068 24 48.0086 23.1053 47.9172 22.0073C47.5452 17.5426 45.9291 13.2565 43.2335 9.64482C40.139 5.4986 35.7874 2.4634 30.8274 0.991599C25.8674 -0.480201 20.5646 -0.309788 15.7094 1.47744C11.4802 3.03423 7.78776 5.74518 5.04079 9.28438C4.36525 10.1547 4.63305 11.3965 5.55649 11.9975C6.47993 12.5984 7.70826 12.3295 8.39813 11.4705C10.6656 8.64692 13.6659 6.48122 17.0877 5.22166C21.1357 3.73155 25.557 3.58947 29.6924 4.81659C33.8278 6.04371 37.456 8.57434 40.0361 12.0313C42.217 14.9533 43.5504 18.405 43.9108 22.0083C44.0205 23.1046 44.9033 24 46.0051 24Z"
            stroke="currentStroke"
            strokeWidth="8"
            mask="url(#path-2-inside-1_3755_26214)"
          />
        </svg>
      </div>
    </div>
  ); // Return full page spinner
}