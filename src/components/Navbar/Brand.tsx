
import Link from 'next/link';

export function Brand() {
  return (
    <Link href="/" className="-m-1.5 flex items-center gap-2 p-1.5">
      <span className="sr-only">Eric Njanga</span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-8 text-indigo-500"
      >
        <path
          fill="currentColor"
          d="M12 2 3.5 6.75v10.5L12 22l8.5-4.75V6.75L12 2Zm0 3.18 5.5 3.08v6.98L12 18.32l-5.5-3.08V8.26L12 5.18Z"
        />
      </svg>
      <span className="text-sm font-semibold text-gray-900">Eric Njanga</span>
    </Link>
  );
}