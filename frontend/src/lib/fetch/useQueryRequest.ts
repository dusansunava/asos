import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import apiService from "@/lib/fetch/apiService";
import { AxiosError } from "axios";

type useQueryRequestProps<Response> = {
  url: string;
  queryKey?: string[];
  method?: "PUT" | "POST" | "DELETE" | "GET";
  body?: unknown;
} & Omit<UseQueryOptions<Response, AxiosError>, "queryKey">;

const useQueryRequest = <Response = unknown>({
  url,
  queryKey = [],
  body = {},
  method = "GET",
  ...props
}: useQueryRequestProps<Response>) => {
  return useQuery({
    queryKey: queryKey.length !== 0 ? queryKey : [url],
    queryFn: async () => {
      if (method === "DELETE") {
        const { data } = await apiService.delete(url);
        return data as Response;
      } else if (method === "PUT") {
        const { data } = await apiService.put(url, body);
        return data as Response;
      } else if (method === "GET") {
        const { data } = await apiService.get(url);
        return data as Response;
      }
      const { data } = await apiService.post(url, body);
      return data as Response;
    },
    retry: 0,
    throwOnError: (error: AxiosError) => error.response?.status === 500,
    ...props,
  });
};

export default useQueryRequest;
