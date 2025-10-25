"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (savedTheme) {
        setIsDark(savedTheme === "dark");
        document.documentElement.setAttribute("data-theme", savedTheme);
      } else {
        setIsDark(prefersDark);
        document.documentElement.setAttribute(
          "data-theme",
          prefersDark ? "dark" : "light"
        );
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">🌙</span>
      <Switch checked={isDark} onCheckedChange={toggleTheme} />
      <span className="text-sm">☀️</span>
    </div>
  );
}
