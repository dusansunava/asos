import { BackButton, Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Message, useMessage } from "@/providers/intl/IntlMessage";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import {
  CreateFoodSchema,
  CreateFood,
  ErrorData,
} from "@/pages/user/food/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import useMutateRequest from "@/lib/fetch/useMutateRequest";
import { AxiosError } from "axios";
import PageTitle from "@/components/PageTitle";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const CreateFoodPage = () => {
  const nameTakenMessage = useMessage({
    value: "Food.name.alreadyTaken",
  });
  const queryClient = useQueryClient();

  const form = useForm<CreateFood>({
    resolver: zodResolver(CreateFoodSchema),
    defaultValues: {
      name: "",
      value: 0,
      description: "",
    },
  });
  const { setError, handleSubmit, getValues, watch } = form;
  const navigate = useNavigate();
  const [deposit, setDeposit] = useState(0);

  const { mutateAsync, isPending } = useMutateRequest({
    method: "POST",
    url: "/food",
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/food"],
        exact: false
      });
      navigate("/food");
    },
    onError: (error: AxiosError<any, ErrorData>) => {
      if (error.response?.status === 400 && error.response.data?.name) {
        setError("name", { message: nameTakenMessage });
      }
    },
  });

  useEffect(() => {
    setDeposit(getValues("value"));
  }, [watch("value")]);



  return (
    <IntlMessagePathProvider value="Food" override>
      <PageTitle>
        <Message>create.pageTitle</Message>
      </PageTitle>
      <div className="text-start">
        <BackButton to="/food" />
      </div>
      <div className="flex justify-center mt-6">
        <Form {...form}>
          <form
            className="border shadow dark:shadow-lg dark:shadow-card w-[min(500px,100%)] sm:rounded-lg p-6"
          >
            <div className="flex flex-col gap-6 pb-6 text-start">
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel exactly>Food.name.label</FormLabel>
                    <FormControl>
                      <Input {...field} error={error} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel exactly>Food.value.label</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} error={error} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      
                    </FormDescription>
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

export default CreateFoodPage;
