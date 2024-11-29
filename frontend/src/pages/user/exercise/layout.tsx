import { Link, Outlet } from "react-router-dom";
import { Message } from "@/providers/intl/IntlMessage";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

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
