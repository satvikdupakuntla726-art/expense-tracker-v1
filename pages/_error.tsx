export default function CustomError() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#fff' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>An error occurred</h1>
      <p>Sorry, we couldn't load the page. Please try again later.</p>
    </div>
  );
}
