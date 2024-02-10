import { createUploadthing, type FileRouter } from "uploadthing/next";

import { getAuthSession } from "@/config/auth-options";
import { getUserSubscriptionPlan } from "@/lib/stripe";

const f = createUploadthing();

const middleware = async () => {
  const session = await getAuthSession();

  if (!session?.user) throw new Error("Unauthorized");

  const subscriptionPlan = await getUserSubscriptionPlan();

  return { subscriptionPlan, userId: session.user.id };
};

const uploadComplete = async () => {
  console.log("upload complete");
  return;
};

export const ourFileRouter = {
  fileUploader: f({ pdf: { maxFileSize: "16MB" } })
    .middleware(middleware)
    .onUploadComplete(uploadComplete),
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(middleware)
    .onUploadComplete(uploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
