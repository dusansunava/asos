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
import { TrainingPlan } from "@/pages/user/trainings/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";

const TrainingPlanCard = ({ trainingPlan }: { trainingPlan: TrainingPlan }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteTrainingPlan, isPending: isDeleting } = useMutateRequest({
    method: "DELETE",
    url: `/training-plans/${trainingPlan.id}`,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/training-plans"],
        exact: true,
      });
    },
  });

  const onDelete = async () => {
    try {
      await deleteTrainingPlan({});
    } catch (error) {
      console.error("Failed to delete training plan:", error);
    }
  };

  return (
    <Card className="sm:w-[min(400px,100%)] w-full">
      <CardHeader>
        <CardTitle>{trainingPlan.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-start space-y-2">
        <div className="flex gap flex-wrap gap-2">
          <p className="text-muted-foreground">
            <Message>Duration</Message>:
          </p>
          <p>{trainingPlan.duration} weeks</p>
        </div>
        <div className="flex gap flex-wrap gap-2">
          <p className="text-muted-foreground">
            <Message>Type</Message>:
          </p>
          <p>{trainingPlan.type}</p>
        </div>
        <div className="flex gap flex-wrap gap-2">
          <p className="text-muted-foreground">
            <Message>Start Date</Message>:
          </p>
          <p>{new Date(trainingPlan.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex gap flex-wrap gap-2">
          <p className="text-muted-foreground">
            <Message>End Date</Message>:
          </p>
          <p>{new Date(trainingPlan.updatedAt).toLocaleDateString()}</p>
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
                <Message>deleteTrainingPlan</Message>
              </AlertDialogTitle>
              <AlertDialogDescription>
                <Message>uSureBroDelete</Message>
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

export const LoadingTrainingPlanCard = () => {
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

export default TrainingPlanCard;
