type Props = {
  label: string;
  value: string | null;
};
function InfoItem({ label, value }: Props) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-400 w-20 shrink-0">
        {label}
      </span>
      <span className="text-gray-100 font-medium">
        {value ?? "-"}
      </span>
    </div>
  );
}

export default InfoItem;