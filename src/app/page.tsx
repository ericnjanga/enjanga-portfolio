import LandingPage from './home/page';

export default function Page() {
  console.log('Rendering on:', typeof window === 'undefined' ? 'server' : 'client');
  return <LandingPage />;
}
