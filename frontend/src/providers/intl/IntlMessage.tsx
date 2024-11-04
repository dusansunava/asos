import { SpanSkeleton } from "@/components/ui/skeleton";
import { useIntlMessagePathContext } from "./IntlMessagePath";
import { useLanguage } from "./IntlProvider";
import { IntlMessageFormat } from "intl-messageformat";

type UseMessageProps = {
  value: string;
  exactly?: boolean;
  args?: {};
};

export const useMessage = ({
  value,
  exactly = false,
  args,
}: UseMessageProps) => {
  const { messages, language, isLoading } = useLanguage();
  const { current } = useIntlMessagePathContext();

  if (isLoading) return "";

  let _key = value;
  let key = _key;

  if (current && !exactly) key = current + "." + _key;

  if (args) {
    for (const [key, value] of Object.entries(args)) {
      if (value instanceof Date) {
        args = {
          ...args,
          [key]: new Intl.DateTimeFormat(language, {
            dateStyle: "short",
            timeStyle: "short",
          }).format(value),
        };
      } else if (typeof value === "string" && Date.parse(value)) {
        args = {
          ...args,
          [key]: new Intl.DateTimeFormat(language, {
            dateStyle: "short",
            timeStyle: "short",
          }).format(new Date(value)),
        };
      }
    }
  }

  let message = messages[key]
    ? (new IntlMessageFormat(messages[key], language).format(args) as string)
    : null;
  return message || key;
};

type MessageProps = {
  children: string | number;
  exactly?: boolean;
  args?: {};
};

export const Message = ({ children, exactly, args }: MessageProps) => {
  const message = useMessage({ value: String(children), exactly, args });

  if (message === "") return <SpanSkeleton className="w-24 my-1 h-4" />;

  return message;
};
