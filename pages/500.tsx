export default function Custom500() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#fff' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>500 - Server-side error occurred</h1>
      <p>Sorry, something went wrong. Please try again later.</p>
    </div>
  );
}
