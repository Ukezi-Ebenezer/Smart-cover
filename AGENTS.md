# Architecture rules
- Keep portrait-caption animations in the global stylesheet and disable them for reduced-motion preferences, so the identity remains readable without motion.
- Implement the homepage typed headline as a one-time in-view React interaction with global motion styling and a reduced-motion fallback, so timing is reliable and accessible.