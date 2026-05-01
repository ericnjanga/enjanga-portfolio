import { redirect } from 'next/navigation';

/**
 * Redirect users at a very specific section of the home page
 */
export default function ExperienceRoot() {
  redirect('/?section=expertise');
}
