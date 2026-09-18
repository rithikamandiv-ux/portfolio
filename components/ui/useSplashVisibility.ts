"use client";

import { useSyncExternalStore, useCallback, useState } from "react";

const SESSION_KEY = "hasVisitedPortfolio";

export function useSplashVisibility() {
  const [dismissed, setDismissed] = useState(false);

  // useSyncExternalStore is designed for reading from external (non-React) stores
  // in an SSR-safe way. It takes three arguments:
  //   1. subscribe      — how to listen for changes (we never change externally, so a no-op)
  //   2. getSnapshot    — read the value on the CLIENT
  //   3. getServerSnapshot — read the value on the SERVER
  // React guarantees the server snapshot is used for SSR and the initial hydration
  // render, then swaps to the client snapshot — without a mismatch warning.
  const hasVisited = useSyncExternalStore(
    () => () => { },                                    // subscribe (no-op)
    () => sessionStorage.getItem(SESSION_KEY) !== null, // client snapshot
    () => true                                          // server snapshot: assume visited → no splash
  );

  const dismiss = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setDismissed(true);
  }, []);

  return { shouldShow: !hasVisited && !dismissed, dismiss } as const;
}