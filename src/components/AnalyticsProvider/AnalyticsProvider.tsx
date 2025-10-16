"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import * as gtag from "@/libs/gtag";

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams}` : "");
    gtag.pageview(url);
  }, [pathname, searchParams]);

  return null;
}
