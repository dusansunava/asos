import PageTitle from "@/components/PageTitle";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tab } from "@/components/ui/tab";
import { Message } from "@/providers/intl/IntlMessage";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { MousePointerClick } from "lucide-react";
import useQueryRequest from "@/lib/fetch/useQueryRequest";
import { Exercise } from "../exercise/schema";
import { Fragment } from "react";
import { ExerciseCard, LoadingExerciseCard } from "./ExerciseCard";

const HomePage = () => {
  const { data: exercises, isLoading: loadingExercises } = useQueryRequest<
    Exercise[]
  >({
    url: "/exercises",
  });

  const colors = ["#0000ff", "#4cac10", "#1aaf99", "#1aa0ff"];

  const foodData = [
    { name: 'halušky', calories: 100 },
    { name: 'bryndza', calories: 150 },
    { name: 'chlieb', calories: 200 },
    { name: 'rožok', calories: 20000 },
    { name: 'horalka', calories: 100 }
  ]

  return (
    <IntlMessagePathProvider value="Home" override>
      <PageTitle />
      <Card className="w-full p-10">
        <CardContent className="">
          <div className="text-left m-2">
            <Message>overview</Message>
            <div className="flex flex-wrap -mx-2">
              
              
            </div>
          </div>
          <Separator className="my-4" />
          <div className="text-left m-2">
            <Message>food</Message>
            <div className="flex flex-wrap -mx-2">
              {foodData.slice(0, 5).map((crypto, index) => (
                <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4">
                  <Tab name={crypto.name} value={crypto.calories} backgroundColor={colors[index]} />
                </div>
              ))}
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4">
                <Link to="/food"
                      className={buttonVariants({ variant: "secondary" })}>
                  <MousePointerClick />
                  <Message>button.viewFood</Message>
                </Link>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <Message>exercise</Message>
          <div className="flex flex-wrap gap-4 justify-center">
            {exercises && !loadingExercises && (
              <>
                {exercises.length !== 0 ? (
                  exercises.slice(0, 3).map((exercise, index) => (
                    <Fragment key={index}>
                      <ExerciseCard exercise={exercise}></ExerciseCard>
                    </Fragment>
                  ))
                ) : (
                  <div className="text-xl text-muted-foreground">
                    <Message exactly>Exercise.noData</Message>
                  </div>
                )}
              </>
            )}
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4">
                <Link to="/exercises/owned"
                      className={buttonVariants({ variant: "secondary" })}>
                  <MousePointerClick />
                  <Message>button.viewExercise</Message>
                </Link>
              </div>
            {loadingExercises &&
              [...Array(3)].map((_, index) => (
                <Fragment key={index}>
                  <LoadingExerciseCard />
                </Fragment>
              ))}
            <Separator className="my-4" />
          </div>
        </CardContent>
      </Card>
    </IntlMessagePathProvider>
  );
};

export default HomePage;
