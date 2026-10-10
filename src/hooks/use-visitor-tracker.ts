import { useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sessionId = sessionStorage.getItem("smartcover_session_id");
  if (!sessionId) {
    sessionId = "sess_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now();
    sessionStorage.setItem("smartcover_session_id", sessionId);
  }
  return sessionId;
}

function getDeviceType(): string {
  if (typeof window === "undefined") return "Desktop";
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "Tablet";
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
    return "Mobile";
  }
  return "Desktop";
}

function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function useVisitorTracker() {
  const location = useLocation();
  const visitIdRef = useRef<string | null>(null);
  const maxScrollRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sessionId = getSessionId();
    const pagePath = location.pathname || "/";
    const deviceType = getDeviceType();
    const referrer = document.referrer || "Direct";
    const visitId = generateUUID();
    visitIdRef.current = visitId;
    startTimeRef.current = Date.now();
    maxScrollRef.current = 0;

    // 1. Log initial visit into Supabase
    async function initVisit() {
      try {
        const { error } = await supabase
          .from("page_visits" as any)
          .insert([
            {
              id: visitId,
              session_id: sessionId,
              page_path: pagePath,
              device_type: deviceType,
              referrer: referrer,
              max_scroll_depth: 0,
              time_spent_seconds: 0,
            },
          ] as any);

        if (error) {
          console.warn("[Analytics Tracker] Supabase message:", error.message);
        } else {
          console.debug("[Analytics Tracker] Successfully logged visit:", visitId);
        }
      } catch (err) {
        console.debug("[Analytics Tracker] Network notice:", err);
      }
    }

    initVisit();

    // 2. Debounced Scroll Tracking
    let scrollTimeout: number | undefined;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const currentScrollPercent = Math.round(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));

      if (currentScrollPercent > maxScrollRef.current) {
        maxScrollRef.current = currentScrollPercent;

        if (scrollTimeout) window.clearTimeout(scrollTimeout);
        scrollTimeout = window.setTimeout(async () => {
          if (!visitIdRef.current) return;
          try {
            const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
            await supabase
              .from("page_visits" as any)
              .update({
                max_scroll_depth: maxScrollRef.current,
                time_spent_seconds: timeSpent,
                updated_at: new Date().toISOString(),
              } as any)
              .eq("id", visitIdRef.current);
          } catch (e) {
            // Ignore background update errors
          }
        }, 800);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // 3. Finalize on page unload or route change
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) window.clearTimeout(scrollTimeout);

      if (visitIdRef.current) {
        const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
        supabase
          .from("page_visits" as any)
          .update({
            max_scroll_depth: maxScrollRef.current,
            time_spent_seconds: timeSpent,
            updated_at: new Date().toISOString(),
          } as any)
          .eq("id", visitIdRef.current)
          .then(() => {})
          .catch(() => {});
      }
    };
  }, [location.pathname]);
}
