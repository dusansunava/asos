import { SetStateAction, useState } from "react";
import { BackButton, Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Message } from "@/providers/intl/IntlMessage";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import PageTitle from "@/components/PageTitle";
import useMutateRequest from "@/lib/fetch/useMutateRequest";
import FoodSuggestionCard from "./FoodSuggestionCard";
import { FoodSuggestion, FoodSuggestionResponse } from "../schema";

const CreateFoodPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [foodSuggestions, setFoodSuggestions] = useState<FoodSuggestion[]>([]);

  const { mutateAsync, isPending } = useMutateRequest<FoodSuggestionResponse>({
    url: `/spoonacular/foodSuggestion`,
    method: "POST",
  });

  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await mutateAsync({
        searchExpression: inputValue,
      });
      setFoodSuggestions(response.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <IntlMessagePathProvider value="Food" override>
      <PageTitle>
        <Message>create.pageTitle</Message>
      </PageTitle>
      <div className="text-start">
        <BackButton to="/food" />
      </div>
      <div className="flex justify-center mt-6 gap-x-6">
        <Input
          type="text"
          placeholder="namePlaceholder"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button onClick={handleSearch} isLoading={isPending} disabled={isPending}>
          <Message>button.search</Message>
        </Button>
      </div>

      <div className="mt-8">
        {foodSuggestions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {foodSuggestions.map((food) => (
              <FoodSuggestionCard key={food.id} foodSuggestion={food} />
            ))}
          </div>
        ) : (
          <p className="text-center mt-4">
            <Message>noResults</Message>
          </p>
        )}
      </div>
    </IntlMessagePathProvider>
  );
};

export default CreateFoodPage;
