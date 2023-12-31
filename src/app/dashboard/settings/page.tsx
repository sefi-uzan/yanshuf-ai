"use client";

import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  router.push("/dashboard/settings/profile");
  return <></>;
};

export default Page;
