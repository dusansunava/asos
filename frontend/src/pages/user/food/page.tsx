import { Button } from "@/components/ui/button";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import { Message } from "@/providers/intl/IntlMessage";
import { Fragment, useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import PageTitle from "@/components/PageTitle";
import { Link } from "react-router-dom";
import FoodLogCard, { LoadingFoodLogCard } from "@/pages/user/food/FoodCard";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { Food } from "../home/schema";
import useQueryRequest from "@/lib/fetch/useQueryRequest";

const FoodPage = () => {
  const { data, isLoading, isPending } = useQueryRequest<Food[]>({
    url: "/food"
  });
  const [storedValue, setValue] = useLocalStorage("foodlogs-count", 0);
  
  const [food, setFood] = useState<Food[]>();

  useEffect(() => {
    if (data && !isLoading) {
      setFood(data);
      setValue(data.length);
    }
  }, [data]);

  return (
    <IntlMessagePathProvider value="FoodLogs" override>
      <PageTitle />
      <div className="mb-6 flex">
        <Button variant="outline" className="p-0">
          <Link to="/food/create" className="px-4 py-2 flex">
            <PlusCircle className="mr-2" />
            <Message>create</Message>
          </Link>
        </Button>
      </div>
      <div className="flex flex-wrap gap-6 justify-center items-center">
        {!isLoading && !isPending && data && (
          <>
            {food && food.length !== 0 ? (
              food.map((foodLog, index) => (
                <Fragment key={index}>
                  <FoodLogCard foodLog={foodLog} />
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
              <LoadingFoodLogCard />
            </Fragment>
          ))}
      </div>
    </IntlMessagePathProvider>
  );
};

export default FoodPage;
