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
  const { data, isLoading } = useQueryRequest<Food[]>({
    url: "/food",
  });

  const [storedValue, setValue] = useLocalStorage("foodlogs-count", 0);
  const [foodByDate, setFoodByDate] = useState<
    Record<
      string,
      { items: Food[]; calories: number; protein: number; carbohydrates: number; fat: number }
    >
  >({});

  // Funkcia na formátovanie dátumu do požadovaného formátu "Deň - dd.mm.yyyy"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Zoskupiť jedlá podľa dátumu a vypočítať štatistiky
  useEffect(() => {
    if (data && !isLoading) {
      setValue(data.length);

      const groupedByDate = data.reduce((acc, item) => {
        const date = new Date(item.date).toISOString().split("T")[0]; // Extrahovať dátum
        if (!acc[date]) {
          acc[date] = { items: [], calories: 0, protein: 0, carbohydrates: 0, fat: 0 };
        }
        acc[date].items.push(item);
        acc[date].calories += item.calories || 0;
        acc[date].protein += item.protein || 0;
        acc[date].carbohydrates += item.carbs || 0;
        acc[date].fat += item.fat || 0;
        return acc;
      }, {} as Record<
        string,
        { items: Food[]; calories: number; protein: number; carbohydrates: number; fat: number }
      >);

      setFoodByDate(groupedByDate);
    }
  }, [data, isLoading]);

  // Zaokrúhlenie hodnôt na dve desatinné miesta
  const formatValue = (value: number, unit: string = "") =>
    value % 1 === 0 ? `${value}${unit}` : `${value.toFixed(2)}${unit}`;

  return (
    <IntlMessagePathProvider value="FoodLogs" override>
      <PageTitle />
      {/* Tlačidlo na vytvorenie nového jedla zarovnané dolava */}
      <div className="mb-6 flex justify-start">
        <Button variant="outline" className="p-0">
          <Link to="/food/create" className="px-4 py-2 flex">
            <PlusCircle className="mr-2" />
            <Message>create</Message>
          </Link>
        </Button>
      </div>
      {/* Štatistiky podľa dní, zarovnané dolava */}
      <div className="mb-6">
        {Object.entries(foodByDate).map(
          ([date, { items, calories, protein, carbohydrates, fat }]) => (
            <div key={date} className="mb-4 p-4 border rounded shadow">
              <h2 className="text-xl font-bold"><Message>Day</Message> - {formatDate(date)}</h2> {/* Zobrazenie formátovaného dátumu */}
              <p className="text-left">
                <strong><Message>Calories</Message>:</strong> {formatValue(calories)}
              </p>
              <p className="text-left">
                <strong><Message>Protein</Message>:</strong> {formatValue(protein, "g")}
              </p>
              <p className="text-left">
                <strong><Message>Carbs</Message>:</strong> {formatValue(carbohydrates, "g")}
              </p>
              <p className="text-left">
                <strong><Message>Fat</Message>:</strong> {formatValue(fat, "g")}
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                {items.map((foodLog, index) => (
                  <FoodLogCard key={index} foodLog={foodLog} />
                ))}
              </div>
            </div>
          )
        )}
      </div>
      {/* Načítavanie */}
      {isLoading &&
        [...Array(storedValue)].map((_, index) => (
          <Fragment key={index}>
            <LoadingFoodLogCard />
          </Fragment>
        ))}
    </IntlMessagePathProvider>
  );
};

export default FoodPage;
