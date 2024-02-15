"use client";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  router.replace("/dashboard/threads");
  return <></>;
};

export default Page;
