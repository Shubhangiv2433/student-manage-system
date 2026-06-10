// Animated gradient statistics card for the dashboard
const StatsCard = ({
  title,
  value,
  icon,
  gradient = "from-indigo-500 to-purple-600",
  trend,
  delay = 0,
}) => {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={`animate-fade-in-up group relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-5 text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
    >
      {/* Decorative blobs */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20 blur-2xl transition-transform duration-500 group-hover:scale-125" />
      <div className="absolute -bottom-8 -left-4 h-20 w-20 rounded-full bg-white/10 blur-2xl" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-white/80">{title}</p>
          <h3 className="mt-2 text-3xl font-extrabold tracking-tight">
            {value}
          </h3>
          {trend && (
            <p className="mt-2 text-xs font-medium text-white/80">{trend}</p>
          )}
        </div>
        <div className="rounded-xl bg-white/20 backdrop-blur-sm p-3 text-white shadow-inner">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
