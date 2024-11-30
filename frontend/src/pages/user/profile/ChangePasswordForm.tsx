import {
  Dialog,
  DialogContent, DialogFooter,
  DialogHeader,
  DialogTitle, DialogTrigger,
} from "@/components/ui/dialog.tsx"
import {useState} from "react";
import {Message, useMessage} from "@/providers/intl/IntlMessage.tsx";
import {useAuthContext} from "@/providers/auth.tsx";
import {useQueryClient} from "@tanstack/react-query";
import useMutateRequest from "@/lib/fetch/useMutateRequest.ts";
import {useForm} from "react-hook-form";
import {ChangePasswordForm, ChangePasswordFormSchema} from "@/pages/user/profile/shcema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {AxiosError} from "axios";
import {LoginError} from "@/pages/guest/login/schema.ts";
import {KeyRound} from "lucide-react";

export const ChangePasswordModal = () => {
  const [open, setOpen] = useState(false)
  const invalidPasswordMessage = useMessage({
    value: "Error.invalidPassword", exactly: true
  });

  const {setToken} = useAuthContext();
  const queryClient = useQueryClient();

  const {mutateAsync, isPending} = useMutateRequest({
    method: "POST",
    url: "/passwordChange",
    onError: (error: AxiosError<any, LoginError>) => {
      if (error.response?.data?.credentials === "not_matching") {
        form.setError("oldPassword", {
          message: invalidPasswordMessage,
        });
      }
    },
    onSuccess: () => {
      setOpen(false)
      setToken(null);
      queryClient.clear();
    },
  });

  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    await mutateAsync({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(_open) => setOpen(_open)}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="rounded-tr-none rounded-bl-none absolute px-2 py-0 h-7 bottom-0 right-0">
          <KeyRound className="w-4 h-4 mr-2" />
          <Message exactly>Menu.passwordChange</Message>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="text-center">
                <Message exactly>Menu.passwordChange</Message>
              </DialogTitle>
              <div className="flex flex-col gap-6 py-6">
                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({field, fieldState: {error}}) => (
                    <FormItem>
                      <FormLabel>oldPassword</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} error={error}/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({field, fieldState: {error}}) => (
                    <FormItem>
                      <FormLabel>newPassword</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} error={error}/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({field, fieldState: {error}}) => (
                    <FormItem>
                      <FormLabel>confirmPassword</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} error={error}/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>
            </DialogHeader>
            <DialogFooter>
              <Button className="w-full" isLoading={isPending} disabled={isPending} type="submit">
                <Message exactly>Common.submit</Message>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}