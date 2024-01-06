import { useState } from "react";

export const useSetOpen = () => {
  const [open, setOpen] = useState(false);

  return { open, setOpen };
};
