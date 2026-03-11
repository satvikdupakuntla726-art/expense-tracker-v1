"use client";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useEffect, useState } from "react";

export const CountUp: React.FC<{ value: number; duration?: number; className?: string }> = ({
  value,
  duration = 1,
  className,
}) => {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const start = motionValue.get();
    const change = value - start;
    const startTime = performance.now();
    let frameId: number;

    function animate(now: number) {
      const elapsed = (now - startTime) / 1000;
      if (elapsed < duration) {
        const current = start + change * (elapsed / duration);
        motionValue.set(current);
        frameId = requestAnimationFrame(animate);
      } else {
        motionValue.set(value);
      }
    }
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  useAnimationFrame(() => {
    setDisplay(motionValue.get());
  });

  return (
    <motion.span className={className}>
      {Math.round(display)}
    </motion.span>
  );
};
// Why: Animated numbers signal live, dynamic data.
