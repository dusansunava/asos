import { Button } from "@/components/ui/button";
import { Message } from "@/providers/intl/IntlMessage";
import useMutateRequest from "@/lib/fetch/useMutateRequest";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { FoodNutrients, FoodSuggestion } from "../schema";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const FoodSuggestionCard = ({ foodSuggestion, onFoodLogged }: { foodSuggestion: FoodSuggestion; onFoodLogged: () => void }) => {
  const [amount, setAmount] = useState("");
  const [nutrients, setNutrients] = useState<FoodNutrients | null>(null);
  const [isLoadingNutrients, setIsLoadingNutrients] = useState(false);

  const { mutateAsync: postFoodLog, isPending: isLogging } = useMutateRequest({
    method: "POST",
    url: `/food`,
  });

  const { mutateAsync: fetchNutrientInfo } = useMutateRequest<FoodNutrients>({
    method: "POST",
    url: `/spoonacular/foodInfo`,
  });

  const handleSelect = async () => {
    setIsLoadingNutrients(true);
    try {
      const response = await fetchNutrientInfo({ id: foodSuggestion.id });
      setNutrients(response);
    } catch (error) {
      console.error("Failed to fetch nutrient info:", error);
    } finally {
      setIsLoadingNutrients(false);
    }
  };

  const handleLogFood = async () => {
    try {
      await postFoodLog({ id: foodSuggestion.id, amount: parseInt(amount, 10), foodInfo: nutrients });
      onFoodLogged();
    } catch (error) {
      console.error("Failed to log food:", error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{foodSuggestion.name}</CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-col items-center gap-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button onClick={handleSelect}>
              <Message>Select</Message>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <Message>howMuchBro</Message>
              </AlertDialogTitle>
              <AlertDialogDescription>
                {isLoadingNutrients ? (
                  <div className="mt-4">
                    <Skeleton className="h-4 w-24" />
                  </div>
                ) : nutrients ? (
                  <div className="mt-4">
                    <p className="font-bold">{nutrients.name} (100g)</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li><strong><Message>Calories</Message>:</strong> {nutrients.nutrients.calories} kcal</li>
                      <li><strong><Message>Protein</Message>:</strong> {nutrients.nutrients.protein} g</li>
                      <li><strong><Message>Carbohydrates</Message>:</strong> {nutrients.nutrients.carbohydrates} g</li>
                      <li><strong><Message>Fat</Message>:</strong> {nutrients.nutrients.fat} g</li>
                    </ul>
                  </div>
                ) : (
                  <p className="mt-4">No nutrient data available</p>
                )}
                <div className="mt-4">
                  <Input
                    type="number"
                    placeholder="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    className="w-full"
                  />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Message exactly>Common.close</Message>
              </AlertDialogCancel>
              <AlertDialogAction
                asChild
                disabled={isLogging || !amount}
              >
                <Button onClick={handleLogFood}>
                  {isLogging ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Message>logFood</Message>
                  )}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export const LoadingFoodSuggestionCard = () => {
  return (
    <Card className="sm:w-[min(400px,100%)] w-full">
      <CardHeader className="flex justify-center items-center">
        <Skeleton className="h-6 w-36" />
      </CardHeader>
      <CardContent className="flex justify-between items-end">
        <div className="text-left space-y-2">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-6 w-36" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end items-center gap-2">
        <Skeleton className="h-10 w-14" />
      </CardFooter>
    </Card>
  );
};

export default FoodSuggestionCard;
