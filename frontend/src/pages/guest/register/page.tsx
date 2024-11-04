import { Button } from "@/components/ui/button";
import { RegistrationFormSchema, RegistrationForm, ErrorData } from "./schema";
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
import { AxiosError } from "axios";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import { Message, useMessage } from "@/providers/intl/IntlMessage";
import useMutateRequest from "@/lib/fetch/useMutateRequest";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const emailTakenMessage = useMessage({
    value: "Register.email.alreadyTaken",
  });
  const usernameTakenMessage = useMessage({
    value: "Register.username.alreadyTaken",
  });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const form = useForm<RegistrationForm>({
    resolver: zodResolver(RegistrationFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const {
    setError,
    formState: { errors },
  } = form;
  const { mutateAsync, isPending } = useMutateRequest({
    method: "POST",
    url: "/register",
    onError: (error: AxiosError<any, ErrorData>) => {
      if (error.response?.status === 400) {
        if (error.response.data?.username) {
          setError("username", { message: usernameTakenMessage });
        } else if (error.response.data?.email) {
          setError("email", { message: emailTakenMessage });
        }
      }
    },
    onSuccess: () => setOpen(true),
    throwOnError: false,
  });

  const onSubmit = async (data: RegistrationForm) => {
    await mutateAsync({
      email: data.email,
      username: data.username,
      password: data.password,
    });
  };

  return (
    <IntlMessagePathProvider value="Register" override>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <Message>success.title</Message>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <Message>success.description</Message>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => navigate("/login")}>
              <Message exactly>Common.close</Message>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="w-full flex justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="border w-[min(800px,100%)] sm:rounded-lg p-6"
          >
            <h1 className="flex justify-center text-xl font-bold">
              <Message>title</Message>
            </h1>
            <div className="grid sm:grid-cols-2 gap-6 py-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input {...field} error={error} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>username</FormLabel>
                    <FormControl>
                      <Input {...field} error={error} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} error={error} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>confirmPassword</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} error={error} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-sm font-medium text-red-600 dark:text-red-600">
                {errors.root && errors.root.message}
              </p>
            </div>
            <div className="flex items-center w-full justify-end">
              <Button
                isLoading={isPending}
                disabled={isPending}
                className="w-full sm:w-40"
                variant="default"
                type="submit"
              >
                <Message>button.register</Message>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </IntlMessagePathProvider>
  );
};

export default RegisterPage;
