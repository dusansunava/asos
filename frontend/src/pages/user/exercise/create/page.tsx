import { BackButton, Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Message, useMessage } from "@/providers/intl/IntlMessage";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import {
  CreateExerciseSchema,
  ErrorData,
  ExerciseItensity,
  CreateExercise
} from "@/pages/user/exercise/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import useMutateRequest from "@/lib/fetch/useMutateRequest";
import { AxiosError } from "axios";
import PageTitle from "@/components/PageTitle";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CreateExercisePage = () => {
  const nameTakenMessage = useMessage({
    value: "Exercises.name.alreadyTaken",
  });

  const form = useForm<CreateExercise>({
    resolver: zodResolver(CreateExerciseSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "",
      bodyPart: "",
      intensity: "LOW",
      logo: ""
    },
  });
  const { setError, handleSubmit } = form;
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutateRequest({
    method: "POST",
    url: "/exercises",
    onSuccess: () => {
      navigate("/exercises/owned")
    },
    onError: (error: AxiosError<any, ErrorData>) => {
      if (error.response?.status === 400 && error.response.data?.name) {
        setError("name", { message: nameTakenMessage });
      }
    },
  });

  const onSubmit = async (data: CreateExercise) => {
    if (data.description.trim().length === 0) {
      data.description = useMessage({
        value: "Exercises.description.notProvided",
      });
    }
    console.log(data)
    await mutateAsync(data);
  };

  return (
    <IntlMessagePathProvider value="Exercise" override>
      <PageTitle>
        <Message>create.pageTitle</Message>
      </PageTitle>
      <div className="text-start">
        <BackButton to="/exercises" />
      </div>
      <div className="flex justify-center mt-6">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border shadow dark:shadow-lg dark:shadow-card w-[min(500px,100%)] sm:rounded-lg p-6"
          >
            <div className="flex flex-col gap-6 pb-6 text-start">
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel exactly>Exercise.name.label</FormLabel>
                    <FormControl>
                      <Input {...field} error={error} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel exactly>Exercise.type.label</FormLabel>
                    <FormControl>
                      <Input {...field} error={error} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bodyPart"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel exactly>Exercise.bodyPart.label</FormLabel>
                    <FormControl>
                      <Input {...field} error={error} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="intensity"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel exactly>Exercise.intensity.label</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger error={ error} >
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="LOW">
                              {"LOW"}
                            </SelectItem>
                            <SelectItem value="MEDIUM">
                              {"MEDIUM"}
                            </SelectItem>
                            <SelectItem value="HIGH">
                              {"HIGH"}
                            </SelectItem>
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel exactly>Common.description</FormLabel>
                    <FormControl>
                      <Textarea {...field} error={error} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full text-end">
              <Button isLoading={isPending} disabled={isPending} type="submit">
                <Message>button.create</Message>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </IntlMessagePathProvider>
  );
};

export default CreateExercisePage;
