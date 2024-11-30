import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Message } from "@/providers/intl/IntlMessage";
import { Exercise } from "../exercise/schema";
import { Badge } from "@/components/ui/badge";

export const ExerciseCard = ({
  exercise,
}: {
  exercise: Exercise;
}) => {
  return (
    <Card className="sm:w-[min(400px,100%)] w-full pt-6">
      <CardContent className="flex justify-between items-end">
        <div className="text-left space-y-2">
          <CardTitle>{exercise.name}</CardTitle>
          <div className="flex gap flex-wrap gap-2">
            <div className="text-muted-foreground">
              <Message exactly>Exercise.type.label</Message>:
            </div>
            <div>
              {exercise.type}
            </div>
          </div>
          <div className="flex gap flex-wrap gap-2">
            <div className="text-muted-foreground">
              <Message exactly>Exercise.intensity.label</Message>:
            </div>
            <div>
              <Badge>{exercise.intensity}</Badge>
            </div>
          </div>
          <div className="flex gap flex-wrap gap-2">
            <div className="text-muted-foreground">
              <Message exactly>Exercise.bodyPart.label</Message>:
            </div>
              {exercise.bodyPart}
          </div>
        </div>
        <Button variant="outline" className="p-0">
          <Link to={`/exercises/detail/${exercise.id}`} className="px-4 py-2">
            <Search className="w-6 h-6" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export const LoadingExerciseCard = () => {
  return (
    <Card className="sm:w-[min(400px,100%)] w-full pt-6">
      <CardContent className="flex justify-between items-end">
        <div className="text-left space-y-2">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-6 w-36" />
        </div>
        <Skeleton className="h-10 w-14" />
      </CardContent>
    </Card>
  );
};
