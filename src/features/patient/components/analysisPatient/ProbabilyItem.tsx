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
};

export function ProbabilyItem({ prob }: ProbabilyItemProps) {
  return (
    <div className={`flex items-center gap-3 p-2.5 rounded-lg border`}>
      <div className="flex-1 flex items-center gap-3">
        <span className={`text-sm font-medium`}>{prob.label}</span>
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
              width: `${prob.value}%`,
            }}
          />
        </div>
      </div>
      <span className={`text-base font-medium `}>{prob.value}%</span>
    </div>
  );
}
