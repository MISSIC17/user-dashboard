import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TTodo } from "@/types/todos";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getTodos: builder.query<TTodo[], number>({
      query: (limit) => `/todos?_limit=${limit}`,
    }),
  }),
});
export const { useGetTodosQuery } = todosApi;
