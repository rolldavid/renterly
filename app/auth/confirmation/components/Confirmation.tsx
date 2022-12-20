"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getSession } from '@/lib/db-utils';

export default function Confirmation() {
  const router = useRouter();
  const {data, status} = useQuery(["session"], () => {
    return getSession()
  })

  if (status !== "loading" && !data) {
    router.push('/auth');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-12 max-w-md mx-auto">
      {status === "loading" ? (
        <p>Loading...</p>
      ) : !data.session ? (
        <p>Redirecting...</p>
      ) : (
        <>
          <h1 className="text-2xl sm:text-4xl font-bold mt-4">
            You&apos;re logged in!
          </h1>
          <p className="text-lg sm:text-2xl mt-4">
            Go back to your original tab.
          </p>
          <p className="text-normal sm:text-lg text-gray-500 mt-6">
            You can close this window or click{' '}
            <Link href="/">
                this link
            </Link>{' '}
            to go back to the homepage.
          </p>
        </>
      )}
    </div>
  );
};