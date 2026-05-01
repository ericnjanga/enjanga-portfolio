import { redirect } from 'next/navigation';

/**
 * Redirect users to the experience section of the home page
 */
export default function ExperienceRoot() {
  redirect('/?section=experience');
}
