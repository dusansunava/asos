import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import apiService from "@/lib/fetch/apiService";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import useQueryRequest from "@/lib/fetch/useQueryRequest";
import { Exercise } from "@/pages/user/exercise/schema";
import { Message } from "@/providers/intl/IntlMessage";
import { useNavigate } from "react-router-dom";

const workoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  exercises: z.array(
    z.object({
      exerciseId: z.string().min(1, "Exercise is required"),
      sets: z.number().min(1, "Sets must be greater than 0"),
      reps: z.number().min(1, "Reps must be greater than 0"),
      rest: z.number().min(1, "Rest must be greater than 0"),
    })
  ),
});

type WorkoutFormValues = z.infer<typeof workoutSchema>;

const CreateWorkoutPlan = () => {
  const { data: exercises, isLoading } = useQueryRequest<Exercise[]>({
    url: "/exercises",
  });

  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      name: "",
      description: "",
      date: "",
      exercises: [{ exerciseId: "", sets: 1, reps: 1, rest: 1 }],
    },
  });

  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (payload: WorkoutFormValues) => {
      const { data } = await apiService.post("http://localhost:7080/api/training-plans", payload);
      console.log("Submitting payload:", payload);
      return data;
    },
    onError: () => {
      alert("An error occurred while submitting the workout plan.");
    },
    onSuccess: () => {
      navigate("/training")
    },
  });

  const onSubmit = async (data: WorkoutFormValues) => {
    mutate(data);
  };

  return (
    <IntlMessagePathProvider value="WorkoutPlan" override>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 max-w-2xl mx-auto">
          <h1 className="text-xl font-bold mb-4"><Message>Create Workout Plan</Message></h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Workout Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter workout name" />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter workout description" />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Workout Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          {form.watch("exercises").map((_, index) => (
            <div key={index} className="border p-4 my-4">
              <FormField
                control={form.control}
                name={`exercises.${index}.exerciseId`}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Exercise</FormLabel>
                    <FormControl>
                      <Select
                        value={String(field.value)}
                        onValueChange={field.onChange}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={isLoading ? "Loading..." : "Select Exercise"} />
                        </SelectTrigger>
                        <SelectContent>
                          {exercises?.map((ex) => (
                            <SelectItem key={ex.id} value={ex.id}>
                              {ex.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`exercises.${index}.sets`}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Sets</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`exercises.${index}.reps`}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Reps</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`exercises.${index}.rest`}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Rest (seconds)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
          ))}
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() =>
                form.setValue("exercises", [
                  ...form.getValues("exercises"),
                  { exerciseId: "", sets: 1, reps: 1, rest: 1 },
                ])
              }
            >
              <Message>AddExercise</Message>
            </Button>
            <Button variant="default" type="submit">
              <Message>CreatePlan</Message>
            </Button>
          </div>
        </form>
      </Form>
    </IntlMessagePathProvider>
  );
};

export default CreateWorkoutPlan;
