import { Link, Outlet, useLocation } from "react-router-dom";
import { Message } from "@/providers/intl/IntlMessage";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ExercisesLayout = () => {
  return (
    <IntlMessagePathProvider value="Exercise.list" override>
      <PageTitle />
      <div className="mb-6 flex">
        <Button variant="outline" className="p-0">
          <Link to="/exercise/create" className="px-4 py-2 flex">
            <PlusCircle className="mr-2" />
            <Message exactly>Exercise.create.pageTitle</Message>
          </Link>
        </Button>
      </div>
      <Outlet />
    </IntlMessagePathProvider>
  );
};

export default ExercisesLayout;

export const ExercisesTabs = () => {
  const location = useLocation();

  return (
    <Tabs
      defaultValue={
        location.pathname.includes("owned") ? "owned" :
        "all"
      }
    >
      <TabsList>
        <TabsTrigger value="owned" className="p-0">
          <Link to="/exercises/owned" className="px-3 py-[6px]">
            <Message exactly>Exercise.owned</Message>
          </Link>
        </TabsTrigger>
        <TabsTrigger value="all" className="p-0">
          <Link to="/exercises/all" className="px-3 py-[6px]">
            <Message exactly>Exercise.all</Message>
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};