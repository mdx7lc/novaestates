import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6">
        Error 404
      </p>
      <h1 className="font-heading text-5xl lg:text-7xl text-text mb-6">
        Page Not Found
      </h1>
      <p className="text-text/60 max-w-md mb-10">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-8 py-4 bg-text text-bg text-sm tracking-[0.2em] uppercase hover:bg-gold hover:text-text transition-all duration-500"
      >
        Return Home
      </Link>
    </div>
  );
}
