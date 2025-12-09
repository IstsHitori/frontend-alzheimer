export const InfoField = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="pb-3 border-b border-gray-100 last:border-0">
    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
      {label}
    </p>
    <p className="text-sm font-semibold text-gray-900 mt-1">{value}</p>
  </div>
);
