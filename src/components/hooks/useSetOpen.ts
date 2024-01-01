import { useState } from "react";
import { useRouter } from "next/navigation";

export const useSetOpen = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return { open, setOpen };
};
