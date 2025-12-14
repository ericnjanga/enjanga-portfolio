'use client';
import dynamic from "next/dynamic";

const ActionsInner = dynamic(() => import("./GlobalActionsInner.tsx"), {
  ssr: false,
  loading: () => null,
});

export const GlobalActions = () => <ActionsInner />;