import UserAuthForm from "@/app/auth/components/UserAuthForm";
import MaxWidthWrapper from "@/app/components/providers/MaxWidthWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  return (
    <MaxWidthWrapper className="flex max-h-screen justify-center items-center">
      <Card className="sm: mx-2 block md:flex md:flex-col max-w-sm self-center">
        <CardHeader className="flex flex-col space-y-4">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Please select one of the options to sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuthForm />
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  );
};

export default Page;
