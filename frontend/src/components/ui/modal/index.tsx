import { ModalVariant, useModalContext } from "@/components/ui/modal/provider";
import { Button } from "@/components/ui/button";
import { Message } from "@/providers/intl/IntlMessage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export function Modal() {
  const {
    open,
    setOpen,
    modalProps: { onModalSubmit, variant, title, description, withSubmit },
  } = useModalContext();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    onModalSubmit()
      .then(() => setOpen(false))
      .finally(() => setLoading(false));
  };

  return (
    <Dialog open={open} onOpenChange={(_open) => setOpen(_open)}>
      <DialogContent>
        <DialogHeader>
          {title && (
            <DialogTitle>
              <Message exactly>{title}</Message>
            </DialogTitle>
          )}
          {description && (
            <DialogDescription>
              <Message exactly>{description}</Message>
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            <Message exactly>Common.close</Message>
          </Button>
          {withSubmit && (
            <Button
              variant={variant as ModalVariant}
              onClick={onSubmit}
              isLoading={loading}
              disabled={loading}
            >
              <Message exactly>Common.submit</Message>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}