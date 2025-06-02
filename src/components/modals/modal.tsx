"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

interface ModalOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const ModalOverlay = React.forwardRef<HTMLDivElement, ModalOverlayProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-gray-500/40",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ModalOverlay.displayName = "ModalOverlay";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  open?: boolean;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ className, children, open = false, ...props }, ref) => {
    return (
      <AnimatePresence initial={false}>
        {open ? (
          <ModalOverlay>
            <motion.div
              ref={ref}
              initial={{ y: 800 }}
              animate={{
                y: 0,
                transition: {
                  type: "spring",
                  duration: 0.1,
                  bounce: 0.25,
                },
              }}
              exit={{
                y: 800,
                transition: {
                  type: "spring",
                  duration: 0.5,
                  bounce: 0.25,
                },
              }}
              className={cn(
                "bg-background border-border shadow-light-menu fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-4 p-4 pt-6 shadow-lg duration-200 sm:rounded-lg lg:rounded-2xl",
                className,
              )}
            >
              {children}
            </motion.div>
          </ModalOverlay>
        ) : null}
      </AnimatePresence>
    );
  },
);
Modal.displayName = "Modal";

export { Modal, ModalOverlay };
