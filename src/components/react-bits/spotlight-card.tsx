"use client";

// Adapted from React Bits SpotlightCard (David Haz). See LICENSE.md in this folder.
import type { ComponentPropsWithoutRef, CSSProperties, PointerEvent } from "react";

type SpotlightCardProps = Omit<ComponentPropsWithoutRef<"button">, "onPointerMove"> & {
    spotlightColor?: string;
};

function moveSpotlight(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== "mouse") return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
}

export default function SpotlightCard({
    children,
    className = "",
    spotlightColor = "rgba(0, 151, 200, 0.12)",
    style,
    type = "button",
    ...props
}: SpotlightCardProps) {
    return (
        <button
            {...props}
            type={type}
            className={`spotlight-card ${className}`}
            onPointerMove={moveSpotlight}
            style={{ "--spotlight-color": spotlightColor, ...style } as CSSProperties}
        >
            {children}
            <span className="spotlight-card__light" aria-hidden="true" />
        </button>
    );
}
