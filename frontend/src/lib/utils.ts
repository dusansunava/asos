import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "@/lib/zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sets the value at a given path in the provided object.
 * @param {T} object - The object to set the value in.
 * @param {any} value - The value to set at the given path.
 * @param {string} path - The path where the value should be set, separated by dots.
 * @returns {T} - The modified object with the value set at the specified path.
 */
export function setByPath<T>(object: T, value: any, path: string): T {
  let keys = path.split(".");
  object = structuredClone(object);
  let parent = object;

  let i = 0;

  for (; i < keys.length - 1; i++) {
    // @ts-ignore
    parent = parent[keys[i]];
  }
  // @ts-ignore
  parent[keys[i]] = value;

  return object;
}

/**
 * Cast all primitive values and dates from strings to the Zod schema type.
 * @param {T} obj - The object whose values will be cast.
 * @param {z.ZodSchema<T>} schema - Schema to which the object will be cast.
 * @returns {T} - Object with casted values.
 */
export function castObjectBySchema<T extends { [key: string]: any }>(
  obj: T,
  schema: z.ZodSchema<T>
): T {
  // Helper function to cast string values to their intended types
  function strToOriginalType(value: any, fieldSchema: z.ZodTypeAny): any {
    if (typeof value === "string") {
      switch (fieldSchema._def.typeName) {
        case "ZodBoolean":
          if (value === "true" || value === "false") {
            return value === "true";
          }
          break;
        case "ZodNumber":
          const num = Number(value);
          if (!isNaN(num)) {
            return num;
          }
          break;
        case "ZodDate":
          const date = new Date(value);
          if (!isNaN(date.getTime())) {
            return date;
          }
          break;
      }
    }
    return value; // Return the value unchanged if no conversion applies
  }

  // Iterate over the schema fields and cast the object values
  const castedObject: any = {};
  const schemaShape = (schema as any).shape; // Access schema's shape to iterate fields

  for (const key of Object.keys(obj)) {
    const fieldSchema = schemaShape?.[key];
    if (fieldSchema) {
      castedObject[key] = strToOriginalType(obj[key], fieldSchema);
    } else {
      castedObject[key] = obj[key]; // Retain the value if no schema is defined for the field
    }
  }

  return schema.parse(castedObject);
}
