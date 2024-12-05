import { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import { Message } from "@/providers/intl/IntlMessage";
import { LoadingTrainingPlanCard } from "@/pages/user/trainings/TrainingPlanCard";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { TrainingPlan, Exercise } from "@/pages/user/trainings/schema";
import apiService from "@/lib/fetch/apiService";
import useQueryRequest from "@/lib/fetch/useQueryRequest";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


const TrainingPlansPage = () => {
  const { data: plansData, isLoading: isPlansLoading } = useQueryRequest<TrainingPlan[]>({
    url: "/training-plans",
  });

  const { data: exercisesData } = useQueryRequest<Exercise[]>({
    url: "/exercises",
  });

  const [storedValue, setValue] = useLocalStorage("training-plans-count", 0);

  useEffect(() => {
    if (plansData && !isPlansLoading) {
      setValue(plansData.length);
    }
  }, [plansData, isPlansLoading]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const findExerciseDetails = (exerciseId: string) => {
    return exercisesData?.find((exercise) => exercise.id === exerciseId) || null;
  };

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async (payload: String) => {
      const { data } = await apiService.delete(`${import.meta.env.VITE_BASE_URL}/training-plans/${payload}`);
      console.log("Submitting payload:", payload);
      return data;
    },
    onError: () => {
      alert("An error occurred while deleting the workout plan.");
    },
    onSuccess: () => {
      navigate(0)
    },
  });

  const onDelete = async (id: String) => {
    mutate(id);
  };

  return (
    <IntlMessagePathProvider value="TrainingPlans" override>
      <PageTitle />
      <div className="mb-6 flex justify-start">
        <Button variant="outline" className="p-0">
          <Link to="/plan" className="px-4 py-2 flex">
            <PlusCircle className="mr-2" />
            <Message>create</Message>
          </Link>
        </Button>
      </div>
      <div className="mb-6">
        {plansData &&
          plansData.map((plan) => (
            <div key={plan.id} className="mb-4 p-4 border rounded shadow">
              <h2 className="text-xl font-bold">{plan.name}</h2>
              <p className="text-left">
                <strong>
                  <Message>createdDate</Message>
                </strong>{" "}
                {formatDate(plan.createdAt)}
              </p>
              <p className="text-left">
                <strong>
                  <Message>trainingDate</Message>
                </strong>{" "}
                {formatDate(plan.date)}
              </p>
              <p className="text-left">
                <strong>
                  <Message>description</Message>
                </strong>{" "}
                {plan.description}
              </p>
              <Button
                variant="destructive"
                onClick={() => onDelete(plan.id)}
                className="mt-4"
              >
                <Message>delete</Message>
              </Button>
              <div className="flex flex-wrap gap-4 mt-4">
                {plan.exercises && plan.exercises.length > 0 ? (
                  plan.exercises.map((exercise) => {
                    const exerciseDetails = findExerciseDetails(exercise.exerciseId);
                    return (
                      <div
                        key={exercise.exerciseId}
                        className="p-4 border rounded shadow -100 w-[calc(33.33%-1rem)]"
                      >
                        <h3 className="text-lg font-semibold text-center">
                          {exerciseDetails?.name || <Message>nameUnavailable</Message>}
                        </h3>
                        <div className="text-left">
                          <p>
                            <strong>
                              <Message>description</Message>
                            </strong>{" "}
                            {exerciseDetails?.description || "N/A"}
                          </p>
                          <p>
                            <strong>
                              <Message>bodyPart</Message>
                            </strong>{" "}
                            {exerciseDetails?.bodyPart || "N/A"}
                          </p>
                          <p>
                            <strong>
                              <Message>type</Message>
                            </strong>{" "}
                            {exerciseDetails?.type || "N/A"}
                          </p>
                          <p>
                            <strong>
                              <Message>intensity</Message>
                            </strong>{" "}
                            {exerciseDetails?.intensity || "N/A"}
                          </p>
                          <p>
                            <strong>
                              <Message>sets</Message>
                            </strong>{" "}
                            {exercise.sets}
                          </p>
                          <p>
                            <strong>
                              <Message>reps</Message>
                            </strong>{" "}
                            {exercise.reps}
                          </p>
                          <p>
                            <strong>
                              <Message>restDuration</Message>
                            </strong>{" "}
                            {exercise.rest} <Message>seconds</Message>
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>
                    <Message>noExercises</Message>
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
      {isPlansLoading &&
        [...Array(storedValue)].map((_, index) => (
          <Fragment key={index}>
            <LoadingTrainingPlanCard />
          </Fragment>
        ))}
    </IntlMessagePathProvider>
  );
};

export default TrainingPlansPage;
