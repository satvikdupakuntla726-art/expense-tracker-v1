"use client";
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen text-center text-white bg-slate-900">
        <h1 className="text-5xl font-bold mb-4">Something went wrong</h1>
        <p className="text-xl mb-8">{error.message}</p>
        <a href="/" className="text-emerald-400 underline">Go back home</a>
      </body>
    </html>
  );
}
