import { AppRouter } from "@/app/api/trpc";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>({});
