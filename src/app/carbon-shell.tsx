/**
 * Move the Carbon imports + the Carbon wrapper markup into their own component.
 * (CarbonShell component that wraps its children with Carbon Design System's Theme and Content components.)
 */
// "use client";

import { ReactNode } from "react";
import { Content, Theme } from "@carbon/react";

export default function CarbonShell({ children }: { children: ReactNode }) {
  return (
    <Theme theme="g10">
      <main id="main-content">
        <Content>{children}</Content>
      </main>
    </Theme>
  );
}
