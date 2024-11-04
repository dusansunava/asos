import { Button } from "@/components/ui/button";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import { Message } from "@/providers/intl/IntlMessage";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link, useSearchParams } from "react-router-dom";
import useQueryRequest from "@/lib/fetch/useQueryRequest";
import { BadgeAlert, BadgeCheck, Loader2 } from "lucide-react";

const VerifyEmailPage = () => {
  const [open, setOpen] = useState(true);
  const [searchParams, _] = useSearchParams();
  const { isLoading, data, isError, error } = useQueryRequest({
    url: "/email/verify",
    method: "POST",
    enabled: !!searchParams.get("verifyToken"),
    body: {
      token: searchParams.get("verifyToken"),
    },
    throwOnError: false,
  });

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setOpen(true);
    }
  }, []);

  return (
    <IntlMessagePathProvider value="VerifyEmail" override>
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
      <div
        className={`${
          open && "hidden"
        } w-full h-full flex flex-col justify-center items-center`}
      >
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <h2 className="text-lg">
            <Message>verifying</Message>
          </h2>
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      </div>
    </IntlMessagePathProvider>
  );
};

export default VerifyEmailPage;
