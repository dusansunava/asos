import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import apiService from "@/lib/fetch/apiService";
import { AxiosError } from "axios";

type useMutateRequestProps<Response> = {
  url: string;
  method: "PUT" | "POST" | "DELETE" | "GET";
} & UseMutationOptions<Response, AxiosError, unknown>;

const useMutateRequest = <Response = unknown>({
  url,
  method,
  ...props
}: useMutateRequestProps<Response>) => {
  return useMutation({
    mutationFn: async (body: unknown) => {
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

export default useMutateRequest;
