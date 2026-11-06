"use client";

import type { ComponentPropsWithoutRef } from "react";

type ScrollButtonProps = ComponentPropsWithoutRef<"button"> & {
    targetId: string;
};

export default function ScrollButton({ targetId, onClick, children, ...props }: ScrollButtonProps) {
    return (
        <button
            {...props}
            type="button"
            data-scroll-to={targetId}
            onClick={(event) => {
                onClick?.(event);
                if (event.defaultPrevented) return;

                // Let a mobile menu close before measuring the sticky header.
                requestAnimationFrame(() => {
                    const target = document.getElementById(targetId);
                    if (!target) return;
                    const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
                    const top = targetId === "beranda" || targetId === "main"
                        ? 0
                        : Math.max(0, window.scrollY + target.getBoundingClientRect().top - headerHeight - 24);
                    window.scrollTo({
                        top,
                        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
                    });
                    if (targetId === "main") target.focus({ preventScroll: true });
                });
            }}
        >
            {children}
        </button>
    );
}
