import { Button } from "@/components/ui/button";
import { Message } from "@/providers/intl/IntlMessage";
import useMutateRequest from "@/lib/fetch/useMutateRequest";
import { Loader2, Trash2 } from "lucide-react";
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
import { Food } from "@/pages/user/home/schema"; // Adjust the import based on your schema location
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const FoodCard = ({ foodLog }: { foodLog: Food }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteFoodLog, isPending: isDeleting } =
    useMutateRequest({
      method: "DELETE",
      url: `/food-logs/${foodLog.id}`, // Adjust the endpoint as needed
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["/food-logs"],
          exact: true,
        });
      },
    });

  const onDelete = async () => {
    await deleteFoodLog({});
  };

  return (
    <Card className="sm:w-[min(400px,100%)] w-full">
      <CardHeader>
        <CardTitle>{foodLog.foodItem}</CardTitle>
      </CardHeader>
      <CardContent className="text-start space-y-2">
        <div className="flex gap flex-wrap gap-2">
          <p className="text-muted-foreground">
            <Message>Calories:</Message>
          </p>
          <p>{foodLog.calories}</p>
        </div>
        <div className="flex gap flex-wrap gap-2">
          <p className="text-muted-foreground">
            <Message>Protein:</Message>
          </p>
          <p>{foodLog.protein}g</p>
        </div>
        <div className="flex gap flex-wrap gap-2">
          <p className="text-muted-foreground">
            <Message>Carbs:</Message>
          </p>
          <p>{foodLog.carbs}g</p>
        </div>
        <div className="flex gap flex-wrap gap-2">
          <p className="text-muted-foreground">
            <Message>Fat:</Message>
          </p>
          <p>{foodLog.fat}g</p>
        </div>
        <div className="flex gap flex-wrap gap-2">
          <p className="text-muted-foreground">
            <Message>Date:</Message>
          </p>
          <p>{new Date(foodLog.date).toLocaleDateString()}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end items-center gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="w-5 h-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <Message>Delete Food Log</Message>
              </AlertDialogTitle>
              <AlertDialogDescription>
                <Message>Are you sure you want to delete this food log entry?</Message>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Message exactly>Common.close</Message>
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>
                <Loader2
                  className={`w-4 h-4 animate-spin mr-2 ${!isDeleting && "hidden"}`}
                />
                <Message>Delete</Message>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export const LoadingFoodLogCard = () => {
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

export default FoodCard;
