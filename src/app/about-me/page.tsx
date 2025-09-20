import { redirect } from "enjanga-core-setup/next";

/**
 * Redirect users at a very specific section of the home page
 */
export default function BestWorkRoot() {
  redirect('/?section=about-me');
}
