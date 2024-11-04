import { Button } from "@/components/ui/button";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import { Message } from "@/providers/intl/IntlMessage";
import useQueryRequest from "@/lib/fetch/useQueryRequest";
import { Fragment, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import PageTitle from "@/components/PageTitle";
import { Link } from "react-router-dom";
import FoodLogCard, { LoadingFoodLogCard } from "@/pages/user/food/FoodCard"; // Assuming you have a FoodLogCard component
import { useLocalStorage } from "@/lib/useLocalStorage";
import { Food } from "../home/schema";

const FoodPage = () => {
  const { data, isLoading, isPending } = useQueryRequest<Food[]>({
    url: "/food-logs", // Adjust the endpoint as needed
  });
  const [storedValue, setValue] = useLocalStorage("foodlogs-count", 0);

  useEffect(() => {
    if (data && !isLoading) {
      setValue(data.length);
    }
  }, [data, isLoading]);

  return (
    <IntlMessagePathProvider value="FoodLogs" override>
      <PageTitle />
      <div className="mb-6 flex">
        <Button variant="outline" className="p-0">
          <Link to="/food-logs/create" className="px-4 py-2 flex">
            <PlusCircle className="mr-2" />
            <Message>create</Message>
          </Link>
        </Button>
      </div>
      <div className="flex flex-wrap gap-6 justify-center items-center">
        {!isLoading && !isPending && data && (
          <>
            {data.length !== 0 ? (
              data.map((foodLog, index) => (
                <Fragment key={index}>
                  <FoodLogCard foodLog={foodLog} /> {/* Render your FoodLogCard component here */}
                </Fragment>
              ))
            ) : (
              <p className="text-xl text-muted-foreground">
                <Message>noData</Message>
              </p>
            )}
          </>
        )}
        {isLoading &&
          [...Array(storedValue)].map((_, index) => (
            <Fragment key={index}>
              <LoadingFoodLogCard /> {/* Render your loading component here */}
            </Fragment>
          ))}
      </div>
    </IntlMessagePathProvider>
  );
};

export default FoodPage;
