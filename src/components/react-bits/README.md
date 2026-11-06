# React Bits adaptations

Source: [React Bits](https://github.com/DavidHDev/react-bits), fetched 2026-11-06.
The original license is included in `LICENSE.md`.

- [SplitText](https://reactbits.dev/r/SplitText-TS-CSS.json): retains GSAP SplitText's word splitting, font readiness, staggered reveal, and cleanup. Scoped to a one-time hero entrance, with live reduced-motion support and visible server-rendered text.
- [SpotlightCard](https://reactbits.dev/r/SpotlightCard-TS-CSS.json): retains the pointer-positioned radial light, scoped to product buttons. Uses the existing card styling, a subtle cyan overlay, CSS hover/focus states, and direct style updates without React renders. Touch and reduced-motion modes keep the plain card.
- [ScrollStack](https://reactbits.dev/r/ScrollStack-TS-CSS.json): informed the hero product showcase's layered scaling. Adapted to a five-second automatic cycle with no scroll input, wheel interception, or visible rear cards. The outgoing product shrinks and fades while the next scales forward; only one card remains visible between transitions.
