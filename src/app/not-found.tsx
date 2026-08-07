import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="label-eyebrow">404</p>
      <h1 className="display-h mt-4 text-6xl text-ivory">Lost in the loom</h1>
      <p className="mt-4 text-ivory/70">That page doesn't exist. The weaver may have moved.</p>
      <Link href="/" className="wax-button mt-8">Return to the journey</Link>
    </div>
  );
}
