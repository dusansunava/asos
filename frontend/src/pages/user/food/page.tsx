import { Button } from "@/components/ui/button";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import { Message } from "@/providers/intl/IntlMessage";
import { Fragment, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import PageTitle from "@/components/PageTitle";
import { Link } from "react-router-dom";
import FoodLogCard, { LoadingFoodLogCard } from "@/pages/user/food/FoodCard"; // Assuming you have a FoodLogCard component
import { useLocalStorage } from "@/lib/useLocalStorage";
import { Food } from "../home/schema";
import useMutateRequest from "@/lib/fetch/useMutateRequest";
import { useQueryClient } from "@tanstack/react-query";

const dummyData: Food[] = [
  {
    id: "1",
    foodItem: "Apple",
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fat: 0.3,
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    foodItem: "Banana",
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.3,
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    foodItem: "Chicken Breast",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Add more dummy food logs as needed
];

const FoodPage = () => {
  // Comment out the API fetching and use dummy data instead
  // const { data, isLoading, isPending } = useQueryRequest<Food[]>({
  //   url: "/food-logs", // Adjust the endpoint as needed
  // });
  
  // Use dummy data directly
  const data = dummyData; // Use dummy data instead of fetched data
  const isLoading = false; // Set loading state to false
  const isPending = false; // Set pending state to false
  const [storedValue, setValue] = useLocalStorage("foodlogs-count", 0);
  const { mutateAsync } = useMutateRequest({
    url: `/food`,
    method: "GET",
    onSuccess: () => {
      console.log("mam jedlo")
    }
  });

  useEffect(() => {
    if (data) {
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
        <Button onClick={mutateAsync}variant="outline" className="p-0">
            <PlusCircle className="mr-2" />
            <Message>get</Message>
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
