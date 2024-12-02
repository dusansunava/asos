import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import apiService from "@/lib/fetch/apiService"; // Tvoj servis na axios
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";
import { Message } from "@/providers/intl/IntlMessage";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import useQueryRequest from "@/lib/fetch/useQueryRequest";
import { Exercise } from "@/pages/user/exercise/schema";

type WorkoutExercise = {
  exerciseId: string;
  sets: number;
  reps: number;
  rest: number;
};

const CreateWorkoutPlan = () => {
  const { data: exercises, isLoading } = useQueryRequest<Exercise[]>({
    url: "/exercises",
  });

  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [workoutDate, setWorkoutDate] = useState(""); // Pridaný stav pre dátum tréningu
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate } = useMutation({
    mutationFn: async (payload: { name: string; description: string; date: string; exercises: WorkoutExercise[] }) => {
      const { data } = await apiService.post("http://localhost:7080/api/training-plans", payload);
      return data;
    },
    onError: (error: any) => {
      console.error("Error submitting workout plan:", error);
      alert("An error occurred while submitting the workout plan.");
    },
    onSuccess: () => {
      alert("Workout plan saved successfully!");
    },
  });

  const handleAddExercise = () => {
    setSelectedExercises((prev) => [
      ...prev,
      { exerciseId: "", sets: 0, reps: 0, rest: 0 },
    ]);
  };

  const handleExerciseChange = (index: number, field: keyof WorkoutExercise, value: any) => {
    const updated = [...selectedExercises];
    updated[index] = { ...updated[index], [field]: value };
    setSelectedExercises(updated);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const exercises = selectedExercises.map((exercise) => ({
      exerciseId: exercise.exerciseId,
      sets: exercise.sets,
      reps: exercise.reps,
      rest: exercise.rest,
    }));

    const payload = {
      name: workoutName,
      description: workoutDescription,
      date: workoutDate, // Zahrnutý dátum tréningu
      exercises,
    };

    console.log("Submitting workout plan:", payload);

    mutate(payload);
    setIsSubmitting(false);
  };

  return (
    <IntlMessagePathProvider value="WorkoutPlan" override>
      <PageTitle />
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-4">
          <Message>Create Workout Plan</Message>
        </h1>

        <div className="mb-4">
          <label className="block mb-2">
            <Message>Workout Name</Message>
          </label>
          <input
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            <Message>Description</Message>
          </label>
          <textarea
            value={workoutDescription}
            onChange={(e) => setWorkoutDescription(e.target.value)}
            className="border p-2 w-full"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            <Message>Workout Date</Message>
          </label>
          <input
            type="date" // Input pre výber dátumu
            value={workoutDate}
            onChange={(e) => setWorkoutDate(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <h2 className="text-lg font-bold mb-2">
          <Message>Exercises</Message>
        </h2>
        {selectedExercises.map((exercise, index) => (
          <div key={index} className="border p-2 mb-2">
            <select
              value={exercise.exerciseId}
              onChange={(e) => handleExerciseChange(index, "exerciseId", e.target.value)}
              className="border p-2 w-full mb-2"
              disabled={isLoading}
            >
              <option value="">{isLoading ? "Loading..." : "Select Exercise"}</option>
              {exercises?.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))}
            </select>
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Sets"
                value={exercise.sets}
                onChange={(e) => handleExerciseChange(index, "sets", parseInt(e.target.value))}
                className="border p-2 w-full"
              />
              <input
                type="number"
                placeholder="Reps"
                value={exercise.reps}
                onChange={(e) => handleExerciseChange(index, "reps", parseInt(e.target.value))}
                className="border p-2 w-full"
              />
              <input
                type="number"
                placeholder="Rest (seconds)"
                value={exercise.rest}
                onChange={(e) => handleExerciseChange(index, "rest", parseInt(e.target.value))}
                className="border p-2 w-full"
              />
            </div>
          </div>
        ))}

        <div className="mt-4 flex gap-4">
          <Button variant="outline" onClick={handleAddExercise}>
            <Message>Add Exercise</Message>
          </Button>
          <Button variant="default" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? <Message>Saving...</Message> : <Message>Save Workout Plan</Message>}
          </Button>
        </div>
      </div>
    </IntlMessagePathProvider>
  );
};

export default CreateWorkoutPlan;
