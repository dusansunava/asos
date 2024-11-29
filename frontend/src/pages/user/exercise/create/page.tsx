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
  CreateCompetitionSchema,
  CreateCompetition,
  ErrorData,
  Competition,
  CompetitionType
} from "@/pages/user/competitions/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import useMutateRequest from "@/lib/fetch/useMutateRequest";
import { AxiosError } from "axios";
import PageTitle from "@/components/PageTitle";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Money } from "@/providers/intl/IntlMoney";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const CreateCompetitionPage = () => {
  const nameTakenMessage = useMessage({
    value: "Competitions.name.alreadyTaken",
  });

  const form = useForm<CreateCompetition>({
    resolver: zodResolver(CreateCompetitionSchema),
    defaultValues: {
      name: "",
      start: new Date(new Date().setDate(new Date().getDate() +1)),
      end: new Date(new Date().setDate(new Date().getDate() + 2)),
      startValue: 1000,
      participants_limit: 1,
      description: "",
      competition_type: ""
    },
  });
  const { setError, handleSubmit, getValues, watch } = form;
  const navigate = useNavigate();
  const [portfoliosCapital, setPortfoliosCapital] = useState(1000);
  const [open, setOpen] = useState(false);
  const [accessCode, setAccessCode] = useState("none");

  const { mutateAsync, isPending } = useMutateRequest({
    method: "POST",
    url: "/competitions",
    onSuccess: (createdCompetition: Competition) => {
      if(createdCompetition.competitionType == CompetitionType.PRIVATE) {
        setAccessCode(createdCompetition.code)
        setOpen(true)
      } else {
        navigate("/competitions/upcoming")
      }
    },
    onError: (error: AxiosError<any, ErrorData>) => {
      if (error.response?.status === 400 && error.response.data?.name) {
        setError("name", { message: nameTakenMessage });
      }
    },
  });

  useEffect(() => {
    setPortfoliosCapital(getValues("startValue"));
  }, [watch("startValue")]);

  const onSubmit = async (data: CreateCompetition) => {
    if (data.description.trim().length === 0) {
      data.description = null;
    }
    await mutateAsync(data);
  };

  return (
    <IntlMessagePathProvider value="Competitions" override>
      <PageTitle>
        <Message>create.pageTitle</Message>
      </PageTitle>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <Message>privateCode.title</Message>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <Message>privateCode.message</Message>
            </AlertDialogDescription>
          </AlertDialogHeader>
          {accessCode}
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => {navigate("/competitions/upcoming");}}>
              <Message exactly>Common.close</Message>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="text-start">
        <BackButton to="/competitions/upcoming" />
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
                    <FormLabel exactly>Competitions.name.label</FormLabel>
                    <FormControl>
                      <Input {...field} error={error} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="start"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel exactly>Competitions.start.label</FormLabel>
                      <DatePicker
                        disablePast={true}
                        onValueChange={value => {
                          field.onChange(value);
                        }}
                        value={field.value}
                        error={error}
                      />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel exactly>Competitions.end.label</FormLabel>
                    <FormControl typeof="date">
                      <DatePicker
                        disablePast={true}
                        onValueChange={value => {
                          field.onChange(value);
                        }}
                        value={field.value}
                        error={error}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startValue"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel exactly>Competitions.portfoliosCapital.label</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} error={error} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      <Money>{portfoliosCapital}</Money>
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="participants_limit"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel exactly>Competitions.maxParticipants.label</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} error={error} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="competition_type"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel exactly>Competitions.competitionType.label</FormLabel>
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
                            <SelectItem value="PUBLIC">
                              {"PUBLIC"}
                            </SelectItem>
                            <SelectItem value="PRIVATE">
                              {"PRIVATE"}
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

export default CreateCompetitionPage;
