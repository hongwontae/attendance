type Props = {
  label : string;
  value : string | null;
}

function InfoItem({ label, value } : Props) {
  return (
      <div className="flex justify-between border-b border-gray-600 pb-2">
      <span className="text-gray-400">{label}</span>
      <span className="font-medium">{value || '-'}</span>
    </div>
  );
}

export default InfoItem;