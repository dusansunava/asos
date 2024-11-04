import { Message } from "@/providers/intl/IntlMessage";
import { useLanguage } from "@/providers/intl/IntlProvider";

type Format = "full" | "long" | "medium" | "short";
type FormatWithUndefined = Format | undefined;

type DateProps = {
  children: string | Date;
  timeFormat?: FormatWithUndefined;
  dateFormat?: Format;
};

export const DateFormat = ({
  children,
  timeFormat = undefined,
  dateFormat = "short",
}: DateProps) => {
  const { language } = useLanguage();

  try {
    return new Intl.DateTimeFormat(language, {
      dateStyle: dateFormat,
      timeStyle: timeFormat,
    }).format(new Date(children ?? null));
  } catch (e) {
    console.warn(e);
    return <Message exactly>Common.invalidDate</Message>;
  }
};

export const TimeFormat = ({
  children,
  timeFormat = "short",
}: {
  children: string;
  timeFormat?: Format;
}) => {
  const { language } = useLanguage();

  // valid format hh:mm:ss (e.g. 10:23:00)
  const timeRegex = /^(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)$/gm;
  if (!timeRegex.test(children)) {
    return <Message exactly>Common.invalidTime</Message>;
  }

  const [hours, minutes, seconds] = children.split(":");
  let date = new Date();
  date.setHours(Number(hours), Number(minutes), Number(seconds));

  return new Intl.DateTimeFormat(language, {
    timeStyle: timeFormat,
  }).format(date);
};
