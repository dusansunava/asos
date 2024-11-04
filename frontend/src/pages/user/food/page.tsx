import PageTitle from "@/components/PageTitle";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import useQueryRequest from "@/lib/fetch/useQueryRequest";
import { Fragment, useEffect } from "react";

import { useLocalStorage } from "@/lib/useLocalStorage";
import { Message } from "@/providers/intl/IntlMessage";

import { Food } from "../home/schema";


const FoodPage = () => {
  const { data, isLoading, isPending } = useQueryRequest<Food[]>({
    url: "/portfolios",
  });
  const [storedValue, setValue] = useLocalStorage("portfolios-count", 0);

  useEffect(() => {
    if (data && !isLoading) {
      setValue(data.length);
    }
  }, [data, isLoading]);

  return (
    <IntlMessagePathProvider value="Food" override>
      <PageTitle />
      <div className="mb-6 flex">
        <Button variant="outline" className="p-0">
          <Link to="/portfolios/create" className="px-4 py-2 flex">
            <PlusCircle className="mr-2" />
            <Message>create</Message>
          </Link>
        </Button>
      </div>
      
    </IntlMessagePathProvider>
  );
};

export default FoodPage;
