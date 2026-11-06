"use client";

// Adapted from React Bits SplitText (David Haz). See LICENSE.md in this folder.
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(GSAPSplitText, useGSAP);

type SplitTextProps = {
    text: string;
    className?: string;
    startDelay?: number;
};

export default function SplitText({
    text,
    className = "",
    startDelay = 0,
}: SplitTextProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        let active = true;
        document.fonts.ready.then(() => {
            if (active) setFontsLoaded(true);
        });
        return () => {
            active = false;
        };
    }, []);

    useGSAP(
        () => {
            const element = ref.current;
            if (!element || !fontsLoaded) return;

            const media = gsap.matchMedia();
            media.add("(prefers-reduced-motion: no-preference)", () => {
                const split = new GSAPSplitText(element, {
                    type: "words",
                    smartWrap: true,
                    wordsClass: "split-word",
                    reduceWhiteSpace: false,
                    onSplit: (self) =>
                        gsap.fromTo(
                            self.words,
                            { opacity: 0, y: 20 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.65,
                                delay: startDelay,
                                stagger: 0.09,
                                ease: "power3.out",
                                clearProps: "opacity,transform",
                            },
                        ),
                });
                return () => split.revert();
            });
            return () => media.revert();
        },
        { dependencies: [text, fontsLoaded, startDelay], scope: ref, revertOnUpdate: true },
    );

    return (
        <span key={text} ref={ref} className={`split-parent ${className}`}>
            {text}
        </span>
    );
}
