"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  // useEffect only runs on the client, so we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or null on the server to avoid mismatch
    return <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />;
  }

  const isDark = theme === "dark";

  const toggleTheme = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">☀️</span>
      <Switch checked={isDark} onCheckedChange={toggleTheme} aria-label="Toggle theme" />
      <span className="text-sm">🌙</span>
    </div>
  );
}
