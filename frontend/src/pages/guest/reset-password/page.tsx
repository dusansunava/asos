import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Message } from "@/providers/intl/IntlMessage";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetPasswordForm, ResetPasswordFormSchema } from "./schema";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useMutateRequest from "@/lib/fetch/useMutateRequest";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BadgeAlert, BadgeCheck } from "lucide-react";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const [open, setOpen] = useState(false);

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  });

  const { mutateAsync, isPending, error } = useMutateRequest({
    method: "POST",
    url: "/passwordReset",
    onSettled: () => setOpen(true),
    throwOnError: false,
  });

  useEffect(() => {
    if (searchParams.get("resetToken")) {
      sessionStorage.setItem(
        "resetToken",
        searchParams.get("resetToken") as string
      );
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.delete("resetToken");
      navigate({ search: `?${updatedSearchParams.toString()}` });
    }
  }, [searchParams]);

  const onSubmit = async (data: ResetPasswordForm) => {
    await mutateAsync({
      token: sessionStorage.getItem("resetToken"),
      password: data.password,
    });
  };

  return (
    <IntlMessagePathProvider value="ResetPassword" override>
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
              <Message>form.title</Message>
            </h1>
            <div className="flex flex-col gap-6 py-6">
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
            </div>
            <div className="flex items-center w-full justify-end">
              <Button
                isLoading={isPending}
                disabled={isPending}
                className="w-full sm:w-40"
                variant="default"
                type="submit"
              >
                <Message>form.button</Message>
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <Message>{error ? "fail.title" : "success.title"}</Message>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <Message>
                {error ? "fail.description" : "success.description"}
              </Message>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="items-end flex-row">
            <div className="flex-grow flex justify-center">
              {error ? (
                <BadgeAlert className="w-20 h-20" />
              ) : (
                <BadgeCheck className="w-20 h-20" />
              )}
            </div>
            <Button variant="outline" className="p-0">
              <Link className="py-2 px-4" to="/login">
                <Message>login</Message>
              </Link>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </IntlMessagePathProvider>
  );
};

export default ResetPasswordPage;
