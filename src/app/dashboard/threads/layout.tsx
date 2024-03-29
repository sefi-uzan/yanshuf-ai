import { getAuthSession } from "@/config/auth-options";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (!session) return new Response("Unauthorized", { status: 401 });
  return (
    <>
      <div className="p-6">
        <div className="space-y-0.5">
          <div className="flex flex-row justify-start items-center space-x-4">
            <h2 className="text-2xl font-bold tracking-tight">Chats</h2>
            <div className="md:hidden block"></div>
          </div>
          <p className="text-muted-foreground">
            This is where you can chat with your created assistants.
          </p>
        </div>
        <div
          role="none"
          className="shrink-0 bg-border h-[1px] w-full my-6"
        ></div>
        {children}
      </div>
    </>
  );
}
