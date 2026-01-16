"use client";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const modes = [
    { name: "light", icon: Sun, label: "Light" },
    { name: "dark", icon: Moon, label: "Dark" },
    { name: "system", icon: Monitor, label: "System" },
  ];

  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {modes.map((mode) => (
        <button
          key={mode.name}
          onClick={() => setTheme(mode.name)}
          className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2.5 rounded-xl border transition-all text-sm font-semibold
            ${theme === mode.name
              ? "bg-blue-700 text-white border-blue-700 shadow-lg shadow-blue-200 dark:shadow-none"
              : "bg-transparent text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800"
            }`}
        >
          <mode.icon className="w-4 h-4 md:w-[18px] md:h-[18px]" />
          <span>{mode.label}</span>
        </button>
      ))}
    </div>
  );
}