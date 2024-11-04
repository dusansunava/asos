import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LoginFormSchema,
  LoginForm,
  LoginResponse,
  VerifyEmailFormSchema,
  VerifyEmailForm,
  LoginError,
  SendResetPasswordEmail,
  SendResetPasswordEmailSchema,
} from "./schema";
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
import { AxiosError } from "axios";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import { Message, useMessage } from "@/providers/intl/IntlMessage";
import useMutateRequest from "@/lib/fetch/useMutateRequest";
import { useAuthContext } from "@/providers/auth";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";

const LoginPage = () => {
  const invalidCredentialsMessage = useMessage({
    value: "Login.invalidCredentials",
  });
  const notVerifiedEmailMessage = useMessage({
    value: "Login.notVerified",
  });

  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const {
    setError,
    formState: { errors },
  } = form;
  const { setToken } = useAuthContext();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useMutateRequest<LoginResponse>({
    method: "POST",
    url: "/login",
    onError: (error: AxiosError<any, LoginError>) => {
      if (error.response?.data?.credentials === "not_matching") {
        setError("username", { message: invalidCredentialsMessage });
      } else if (error.response?.data?.email === "not_verified") {
        setError("username", { message: notVerifiedEmailMessage });
      }
    },
    onSuccess: (data) => {
      setToken(data.token);
      navigate("/home");
    },
    throwOnError: false,
  });

  const onSubmit = async (data: LoginForm) => {
    await mutateAsync(data);
  };

  return (
    <IntlMessagePathProvider value="Login" override>
      <div className="w-full flex justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.stopPropagation();
              form.handleSubmit(onSubmit)(e);
            }}
            id="login-form"
            className="border w-[min(500px,100%)] sm:rounded-lg p-6"
          >
            <h1 className="flex justify-center text-xl font-bold">
              <Message>title</Message>
            </h1>
            <div className="flex flex-col gap-6 py-6">
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
              <p className="text-sm font-medium text-red-600 dark:text-red-600">
                {errors.root && errors.root.message}
              </p>
            </div>
            <div className="flex sm:flex-row gap-y-4 flex-col items-center w-full justify-between">
              <div className="flex flex-row gap-x-4 justify-start items-center leading-4">
                <VerifyEmailRequestForm />
                <ResetPasswordRequestForm />
              </div>

              <Button
                form="login-form"
                isLoading={isPending}
                disabled={isPending}
                className="sm:w-40 w-full"
                variant="default"
                type="submit"
              >
                <Message>button.login</Message>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </IntlMessagePathProvider>
  );
};

const VerifyEmailRequestForm = () => {
  const form = useForm<VerifyEmailForm>({
    resolver: zodResolver(VerifyEmailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync, isPending, isSuccess } = useMutateRequest({
    url: "/email/sendVerification",
    method: "POST",
  });

  const onSubmit = async (data: VerifyEmailForm) => {
    await mutateAsync(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-7">
          <Message>verifyEmail</Message>
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-y-6">
        <DialogHeader>
          <DialogTitle>
            <Message>verifyEmail.title</Message>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.stopPropagation();
              form.handleSubmit(onSubmit)(e);
            }}
            id="verify-email-form"
          >
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
          </form>
        </Form>
        <DialogFooter>
          <Button
            type="submit"
            disabled={isPending}
            isLoading={isPending}
            form="verify-email-form"
          >
            <Check
              className={`w-4 h-4 ${isSuccess ? "block" : "hidden"} mr-2`}
            />
            <Message exactly>Common.submit</Message>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ResetPasswordRequestForm = () => {
  const form = useForm<SendResetPasswordEmail>({
    resolver: zodResolver(SendResetPasswordEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync, isPending, isSuccess } = useMutateRequest({
    url: "/email/sendResetPassword",
    method: "POST",
  });

  const onSubmit = async (data: SendResetPasswordEmail) => {
    await mutateAsync(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-7">
          <Message>resetPassword</Message>
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-y-6">
        <DialogHeader>
          <DialogTitle>
            <Message>resetPassword.title</Message>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.stopPropagation();
              form.handleSubmit(onSubmit)(e);
            }}
            id="password-reset-email-form"
          >
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
          </form>
        </Form>
        <DialogFooter>
          <Button
            type="submit"
            disabled={isPending}
            isLoading={isPending}
            form="password-reset-email-form"
          >
            <Check
              className={`w-4 h-4 ${isSuccess ? "block" : "hidden"} mr-2`}
            />
            <Message exactly>Common.submit</Message>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPage;
