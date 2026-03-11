export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center text-white bg-slate-900">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Sorry, the page you are looking for could not be found.</p>
      <a href="/" className="text-emerald-400 underline">Go back home</a>
    </div>
  );
}
