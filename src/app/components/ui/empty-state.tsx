import { Ghost } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="mt-16 flex flex-col items-center gap-2 mb-4">
      <Ghost className="h-8 w-8" />
      <h3 className="font-semibold text-xl">Pretty empty around here</h3>
      <p>Let&apos;s create your first chat.</p>
    </div>
  );
};

export default EmptyState;
