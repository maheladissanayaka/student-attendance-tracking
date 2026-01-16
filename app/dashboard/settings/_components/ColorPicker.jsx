"use client";
import { useState } from "react";
import { Check } from "lucide-react";

const colors = [
  { name: "Blue", value: "221.2 83.2% 53.3%", tw: "bg-blue-600" },
  { name: "Emerald", value: "142.1 76.2% 36.3%", tw: "bg-emerald-600" },
  { name: "Violet", value: "262.1 83.3% 57.8%", tw: "bg-violet-600" },
  { name: "Rose", value: "346.8 77.2% 49.8%", tw: "bg-rose-600" },
  { name: "Amber", value: "37.9 94.1% 52.7%", tw: "bg-amber-500" },
];

export default function ColorPicker() {
  const [activeColor, setActiveColor] = useState("Blue");

  const changeColor = (color) => {
    setActiveColor(color.name);
    document.documentElement.style.setProperty("--primary", color.value);
  };

  return (
    <div className="flex flex-wrap gap-3 md:gap-4">
      {colors.map((color) => (
        <button
          key={color.name}
          onClick={() => changeColor(color)}
          className={`group relative h-10 w-10 md:h-12 md:w-12 rounded-full ${color.tw} transition-all hover:scale-110 active:scale-95 ring-offset-2 focus:ring-2 focus:ring-blue-400 dark:ring-offset-slate-900`}
        >
          {activeColor === color.name && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <Check className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}