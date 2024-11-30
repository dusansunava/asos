import { SpanSkeleton } from "@/components/ui/skeleton";
import { useIntlMessagePathContext } from "./IntlMessagePath";
import { useLanguage } from "./IntlProvider";

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

  if (messages[key]) {
    return buildMessage(messages[key], language, args)
  }

  return key
};

export function buildMessage(message: string, locale: string, args?: {
  [key: string]: Date | number | string
}): string {
  if (!args) {
    return message
  }
  const handledArgs = Object.entries(args)
    .reduce((obj, [key, value]) => {
      if (value instanceof Date) {
        obj[key] = new Intl.DateTimeFormat(locale, {year: 'numeric', month: 'short', day: 'numeric'})
          .format(new Date(value))
      } else {
        obj[key] = value.toString()
      }

      return obj
    }, {} as { [key: string]: string })

  const injected = message.split(/{(\w+)}/g)
    .map(part => part in handledArgs ? handledArgs[part] : part)

  return injected.join('')
}

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
