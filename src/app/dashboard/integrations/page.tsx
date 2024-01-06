import IssuesTable from "./components/IssuesTable";

const Page = async () => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Integrations</h2>
          <p className="text-muted-foreground">
            Here you can select items for chat context
          </p>
        </div>
      </div>
      <IssuesTable />
    </div>
  );
};

export default Page;
