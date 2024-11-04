import { z } from "zod";
import { fromUnixTime } from "date-fns";

const zodErrorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case "invalid_string":
      if (issue.validation === "email") {
        return { message: "Common.validations.email" };
      }
      break;
    case "too_small":
      if (issue?.minimum === 1) {
        return { message: "Common.validations.required" };
      } else if (issue.type === "string") {
        return { message: `Common.validations.string.min|${issue.minimum}` };
      } else if (issue.type === "number") {
        return { message: `Common.validations.number.min|${issue.minimum}` };
      } else if (issue.type === "date") {
        return {
          message: `Common.validations.date.min|${fromUnixTime(
            (issue.minimum as number) / 1000
          )}`,
        };
      }
      break;
    case "too_big":
      if (issue.type === "string") {
        return { message: `Common.validations.string.max|${issue.maximum}` };
      } else if (issue.type === "number") {
        return { message: `Common.validations.number.max|${issue.maximum}` };
      } else if (issue.type === "date") {
        return {
          message: `Common.validations.date.min|${fromUnixTime(
            (issue.maximum as number) / 1000
          )}`,
        };
      }
      break;
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(zodErrorMap);

export default z;
