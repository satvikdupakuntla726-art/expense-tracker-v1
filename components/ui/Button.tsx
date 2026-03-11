"use client";
import { motion, MotionProps } from "framer-motion";
import clsx from "clsx";
import React from "react";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & MotionProps;

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  ...props
}) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    className={clsx(
      "rounded-lg px-4 py-2 font-semibold bg-emerald-600 text-white shadow transition hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] focus:outline-none focus:ring-2 focus:ring-emerald-400",
      className
    )}
    {...props}
  >
    {children}
  </motion.button>
);
// Why: Framer Motion adds delightful, modern micro-interactions.
