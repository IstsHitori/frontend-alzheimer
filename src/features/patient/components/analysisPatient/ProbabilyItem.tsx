type Probabilty = {
  label: string;
  value: number;
  severity: number;
  color: string;
  bgColor: string;
  borderColor: string;
};
type ProbabilyItemProps = {
  prob: Probabilty;
  idx: number;
};

export function ProbabilyItem({ prob, idx }: ProbabilyItemProps) {
  return (
    <div
      className={`flex items-center gap-3 p-2.5 rounded-lg border ${
        idx === 0
          ? `${prob.bgColor} ${prob.borderColor} border-2`
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex-1 flex items-center gap-3">
        <span
          className={`text-sm font-semibold ${
            idx === 0 ? prob.color : "text-gray-700"
          } w-28`}
        >
          {prob.label}
        </span>
        <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              prob.severity === 0
                ? "bg-green-600"
                : prob.severity === 1
                ? "bg-blue-600"
                : prob.severity === 2
                ? "bg-amber-600"
                : "bg-red-600"
            }`}
            style={{
              width: `${prob.value * 100}%`,
            }}
          />
        </div>
      </div>
      <span
        className={`text-base font-bold ${
          idx === 0 ? prob.color : "text-gray-700"
        } w-14 text-right`}
      >
        {prob.value}%
      </span>
    </div>
  );
}
