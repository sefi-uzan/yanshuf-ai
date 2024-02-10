import AssistantTable from "./components/AssistantTable";
import CreateAssistantButton from "./components/CreateAssistantButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="p-6">
        <div className="flex flex-row justify-between items-end">
          <div className="space-y-0.5">
            <div className="flex flex-row justify-start items-center space-x-4">
              <h2 className="text-2xl font-bold tracking-tight">Assistants</h2>
            </div>
            <p className="text-muted-foreground">
              Here you can manage or create assistants.
            </p>
          </div>
          <CreateAssistantButton />
        </div>
        <div
          role="none"
          className="shrink-0 bg-border h-[1px] w-full my-6"
        ></div>
        <div className="flex lg:flex-row md:flex-col">{children}</div>
      </div>
    </>
  );
}
