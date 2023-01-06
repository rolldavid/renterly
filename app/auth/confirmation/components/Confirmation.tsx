"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getSession } from '@/lib/db-utils';
import Spinner from '@/lib/utils/Spinner';

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
        <Spinner />
      ) : !data.session ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-2xl sm:text-4xl font-bold mt-4">
            You&apos;re logged in!
          </h1>
          <p className="text-lg sm:text-2xl mt-4">
            Please close this window and go back to your original tab. If you&apos;ve closed the original tab, you can click{' '}
            <Link href="/">
                this link
            </Link>{' '}
            to go back to the homepage and search for your property - you&apos;re review should still be loaded.
          </p>
        </>
      )}
    </div>
  );
};