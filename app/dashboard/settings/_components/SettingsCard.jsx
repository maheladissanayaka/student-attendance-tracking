export default function SettingsCard({ title, description, children }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-4 md:p-6 shadow-sm transition-all">
      <div className="mb-4">
        <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="pt-2">{children}</div>
    </div>
  );
}