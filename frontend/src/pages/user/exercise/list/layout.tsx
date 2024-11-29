import { Link, Outlet, useLocation } from "react-router-dom";
import { Message } from "@/providers/intl/IntlMessage";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import PageTitle from "@/components/PageTitle";

const ExercisesLayout = () => {
  return (
    <IntlMessagePathProvider value="Exercises" override>
      <PageTitle />
      <Outlet />
    </IntlMessagePathProvider>
  );
};

export const ExercisesTabs = () => {
  return (
    <Tabs
    >
      <TabsList>
        <TabsTrigger value="exercises" className="p-0">
          <Link to="/exercises" className="px-3 py-[6px]">
            <Message exactly>Common.exercises</Message>
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ExercisesLayout;
