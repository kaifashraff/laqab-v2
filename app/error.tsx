'use client';

import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="error-page">
      <div className="container">
        <h1>Something went wrong</h1>
        <p>{error.message}</p>
        <div className="error-actions">
          <button onClick={reset} className="btn btn-primary">
            Try Again
          </button>
          <Link href="/" className="btn btn-outline">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
