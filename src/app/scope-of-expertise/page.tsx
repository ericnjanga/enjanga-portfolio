import { redirect } from 'next/navigation';

/**
 * Redirect users at a very specific section of the home page
 */
export default function BestWorkRoot() {
  redirect('/?section=scope-of-expertise');
}
