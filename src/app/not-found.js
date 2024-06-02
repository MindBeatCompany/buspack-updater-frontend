import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 'var(--spacing-4)',
      }}
    >
      <h1 variant='displayLarge'>404</h1>
      <p variant='bodyBold'>Página no encontrada</p>
      <Link href='/'>
        <p>Volver al inicio</p>
      </Link>
    </div>
  );
}
