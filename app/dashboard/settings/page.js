"use client";

import { useEffect, useState } from "react";
import SettingsCard from "./_components/SettingsCard";
import ThemeToggle from "./_components/ThemeToggle";
import ColorPicker from "./_components/ColorPicker";
import AttendanceRulesForm from "../school-settings/_components/AttendanceRulesForm"; // Adjust path as needed
import GlobalApi from "@/app/api/_services/GlobalApi";

export default function SettingsPage() {
  const [rules, setRules] = useState(null);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const res = await GlobalApi.GetAttendanceRules();
      setRules(res.data);
    } catch (err) {
      console.error("Failed to fetch settings:", err);
    }
  };

  return (
    <div className="p-5 md:p-10 max-w-4xl min-h-screen transition-colors duration-300 bg-white dark:bg-slate-950">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        Settings
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm md:text-base">
        Manage your attendance system preferences and appearance.
      </p>

      <div className="space-y-4 md:space-y-6">
        {/* THEME SECTION */}
        <SettingsCard 
          title="Interface Theme" 
          description="Choose how the application looks to you."
        >
          <ThemeToggle />
        </SettingsCard>

        {/* BRAND COLOR SECTION */}
        <SettingsCard 
          title="Brand Personalization" 
          description="Select the primary accent color for buttons and highlights."
        >
          <ColorPicker />
        </SettingsCard>

        {/* ATTENDANCE RULES SECTION */}
        <SettingsCard 
          title="Attendance Rules" 
          description="Set the late threshold and working days."
        >
          {/* Form now replaces the "coming soon" placeholder */}
          <AttendanceRulesForm 
            initialData={rules} 
            onSave={fetchRules} 
          />
        </SettingsCard>
      </div>
    </div>
  );
}