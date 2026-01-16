export default function StatCard({ title, value }) {
  return (
    <div className="bg-blue-100 dark:bg-blue-900/20 p-5 rounded-3xl shadow-sm border border-blue-200/50 dark:border-blue-900/30 transition-colors">
      <p className="text-[10px] md:text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">{title}</p>
      <h2 className="text-2xl md:text-3xl font-black mt-1 text-gray-800 dark:text-slate-100">{value}</h2>
    </div>
  );
}