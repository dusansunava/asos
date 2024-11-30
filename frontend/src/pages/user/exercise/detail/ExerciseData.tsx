import { Message } from "@/providers/intl/IntlMessage";
import { Exercise } from "../schema";
import { Link, useParams } from "react-router-dom";
import { MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";
import useQueryRequest from "@/lib/fetch/useQueryRequest";
import { Loader } from "@/components/ui/loader";
import { Badge } from "@/components/ui/badge";

export const ExerciseData = () => {
  const { id } = useParams();
  const { data: exercise, isLoading } = useQueryRequest<Exercise>({
    url: "/exercises/" + id,
  });

  return (
    <div className="flex flex-wrap justify-evenly items-center gap-6">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {exercise ? <DataFormatting exercise={exercise} /> : <div></div>}
        </>
      )}
    </div>
  );

};

const DataFormatting = ({ exercise }: { exercise: Exercise }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold text-start mb-4">
        <Message>exerciseData</Message>
      </h2>
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        <p className="text-muted-foreground">
          <Message exactly>Common.name</Message>:
        </p>
        {exercise.name}
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        <div className="flex items-center">
          <p className="text-muted-foreground">
            <Message>intensity.label</Message>:
          </p>
        </div>
        <div className="flex items-center">
          <Badge>{exercise.intensity}</Badge>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        <p className="text-muted-foreground md:text-justify">
          <Message>type.label</Message>:
        </p>
          {exercise.type}
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        <p className="text-muted-foreground">
          <Message>bodyPart.label</Message>:
        </p>
          {exercise.bodyPart}
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        <p className="text-muted-foreground">
          <Message exactly>Common.description</Message>:
        </p>
          {exercise.description}
      </div>
    </div>
  );
};
