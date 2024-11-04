import path from "path";
import fs from "fs";
import { IntlMessageFormat } from "intl-messageformat";

/**
 * Return all translations in js object
 * @param {string} language Language code (from req.language)
 * @returns {Promise<{ [key: string]: string }>} Key, value object with translations
 * @example let translations = intl("en")
 *          let translation = translations["Common.close"] 
 */
export function intl(language: string): Promise<{ [key: string]: string }> {
  return new Promise((resolve, reject) => {
    const filePath = path.join(
      path.resolve(),
      "src",
      "locales",
      language + ".json"
    );
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

/**
 * Replace all {arg} in specific translation
 * @param {{}} args Object with properties which values will be substitute to value
 * @param {string} value Specific translation
 * @param {string} language Language code (from req.language)
 * @returns {string} Translation with full substituted args
 * @example intlArgs({ date: new Date }, "Today is {date}.", "en")
 *          => "Today is xx.xx. xxxxx."
 */
export const intlArgs = (
  args: {},
  value: string,
  language: string = "en"
): string => {
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
  return value
    ? (new IntlMessageFormat(value, language).format(args) as string)
    : "";
};

/**
 * Replace all {{arg}} in html file
 * @param {{ [key: string]: string }} args Key, value object with properties which values will be substitute to html
 * @param {string} html Stringify html file content
 * @returns {string} Html with full substituted args
 * @example ...<div>{{arg}}</div>... => <div>Hello</div>
 */
export const replacedHtml = (
  args: { [key: string]: string },
  html: string
): string => {
  return html.replace(/{{([^}]+)}}/g, (match, p1) => {
    if (!args[p1]) {
      return match;
    }
    return args[p1];
  });
};
