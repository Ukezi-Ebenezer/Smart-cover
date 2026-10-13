import { useEffect, useState } from "react";

export function useMotionPreference() {
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [isSystemReduced, setIsSystemReduced] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateFromSystem = () => {
      const systemReduce = mediaQuery.matches;
      setIsSystemReduced(systemReduce);

      let savedPreference = "on";
      try {
        savedPreference = localStorage.getItem("smartcover-motion") || "on";
      } catch (_) {}

      const effectiveMotion = !systemReduce && savedPreference !== "off";
      setMotionEnabled(effectiveMotion);

      root.classList.toggle("motion-enabled", effectiveMotion);
      root.classList.toggle("motion-off", !effectiveMotion);
    };

    updateFromSystem();

    const handleSystemChange = () => updateFromSystem();
    mediaQuery.addEventListener("change", handleSystemChange);

    const handleCustomChange = () => {
      updateFromSystem();
    };
    window.addEventListener("smartcover:motion", handleCustomChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
      window.removeEventListener("smartcover:motion", handleCustomChange);
    };
  }, []);

  const toggleMotion = () => {
    if (isSystemReduced) return;
    const nextState = !motionEnabled;
    setMotionEnabled(nextState);
    try {
      localStorage.setItem("smartcover-motion", nextState ? "on" : "off");
    } catch (_) {}
    const root = document.documentElement;
    root.classList.toggle("motion-enabled", nextState);
    root.classList.toggle("motion-off", !nextState);
    window.dispatchEvent(new Event("smartcover:motion"));
  };

  return { motionEnabled, isSystemReduced, toggleMotion };
}
