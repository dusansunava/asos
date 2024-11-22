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
import { FoodSuggestion } from "../schema";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const FoodSuggestionCard = ({ foodSuggestion }: { foodSuggestion: FoodSuggestion }) => {
  const [amount, setAmount] = useState("");

  const { mutateAsync: postFoodLog, isPending: isLoading } =
    useMutateRequest({
      method: "POST",
      url: `/food`,
    });

  const handleSelect = async () => {
    await postFoodLog({});
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{foodSuggestion.name}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-center items-center gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>
              <Message>Select</Message>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <Message>Specify the amount</Message>
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="mt-4">
                  <Input
                    type="number"
                    placeholder="Amount (grams)"
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
                disabled={isLoading || !amount}
              >
                <Button onClick={handleSelect}>
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Message>Select</Message>
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
