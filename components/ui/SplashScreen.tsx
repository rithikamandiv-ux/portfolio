"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSplashVisibility } from "./useSplashVisibility";
import StrokeText from "./StrokeText";

/**
 * Full-screen splash overlay that draws "Rithika" in Dancing Script using
 * the React Bits StrokeText component, then fades out and unmounts.
 *
 * - Uses sessionStorage (via useSplashVisibility) so it only appears once per
 *   browser tab session.
 * - Dismissal is driven by StrokeText's onComplete callback, which fires when
 *   the draw + fill animation finishes (~3.5 s at current settings), or
 *   immediately if the user has prefers-reduced-motion enabled.
 * - A 6 s failsafe timeout guards against getBBox measurement failures inside
 *   StrokeText that would prevent onComplete from ever firing.
 */
export default function SplashScreen() {
  const { shouldShow, dismiss } = useSplashVisibility();

  // Fallback only. Normal dismissal comes from StrokeText's onComplete.
  // Guards against the animation never reporting completion.
  useEffect(() => {
    if (!shouldShow) return;
    const failsafe = setTimeout(dismiss, 6000);
    return () => clearTimeout(failsafe);
  }, [shouldShow, dismiss]);

  if (!shouldShow) {
    return null;
  }

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "var(--color-background)" }}
          aria-hidden="true"
        >
          <StrokeText
            text="Rithika"
            className="font-[family-name:var(--font-dancing-script)]"
            strokeColor="#f2e9e4"
            fillColor="#f2e9e4"
            strokeWidth={1}
            fontSize={128}
            fontWeight={700}
            letterSpacing={0}
            drawDuration={2.2}
            fillDelay={0.2}
            stagger={0.04}
            ease="power2.out"
            trigger="mount"
            fillMode="wipe"
            onComplete={dismiss}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
