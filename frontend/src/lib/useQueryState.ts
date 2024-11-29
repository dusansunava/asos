import { useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import z from "@/lib/zod";
import { stringify, parse } from "qs";
import { castObjectBySchema } from "./utils";

export function useQueryState<T>({
  schema,
  defaultValues,
}: {
  schema: z.ZodSchema;
  defaultValues: T;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, _] = useSearchParams();

  const defaultState = defaultValues;

  const state = useMemo(() => {
    try {
      const parseObj = castObjectBySchema(
        parse(searchParams.toString()),
        schema
      );
      schema.parse(parseObj);
      return parseObj;
    } catch (ex) {
      return defaultState;
    }
  }, [searchParams]);

  function update(stateUpdated: T | ((old: T) => T)) {
    let href = location.pathname;
    if (stateUpdated instanceof Function) stateUpdated = stateUpdated(state);

    if (JSON.stringify(stateUpdated) === JSON.stringify(state)) return;

    if (JSON.stringify(stateUpdated) !== JSON.stringify(defaultState)) {
      href += "?" + stringify(stateUpdated, { encodeValuesOnly: true });
    }

    navigate(href, { replace: true, preventScrollReset: true });
  }

  return [state, update];
}
