"use client";

import { Button } from "@/components/ui/button";
// import {
//   decrement,
//   increment,
//   changeBy,
// } from "@/lib/features/counter/counter-slice";
import { addTodo } from "@/lib/features/todo/todo-slice";
import * as z from "zod/v4";
const TodoInput = z.object({
  name: z.string(),
  description: z.string().optional(),
  status: z.enum(["todo", "in-progress", "done"]),
});
type TTodoInput = z.infer<typeof TodoInput>;

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetTodosQuery } from "@/lib/services/todos";
import { AppDispatch } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { TTodo } from "@/types/todos";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";

export function TodoComponent() {
  // const count = useSelector((state: RootState) => state.counter.value);
  // const todos = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm({
    resolver: zodResolver(TodoInput),
    defaultValues: {
      name: "",
      description: "",
      status: "todo" as const,
    },
  });
  const onSubmit = (data: TTodoInput) => {
    console.log(data);
    dispatch(addTodo({ name: data.name, description: data.description }));
    form.reset();
  };

  return (
    <section>
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="todo">todo</SelectItem>
                    <SelectItem value="in-progress">in-progress</SelectItem>
                    <SelectItem value="done">done</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form> */}

      <TodoList />
    </section>
  );
}

function TodoList() {
  const { data: todos, isLoading } = useGetTodosQuery(10);
  return (
    <section
      id="todo"
      className="relative table-scrollbar prose rounded-3xl border-4 border-red-400 dark:border-red-600 h-[calc(100dvh-80px-var(--header-height))] overflow-auto mx-auto mt-5"
    >
      <div className="bg-background z-10 px-4 py-2 sticky top-0 left-0 w-full h-20 flex items-center">
        <h2 className="prose-h2 !m-0 text-foreground">TODO&apos;S</h2>
      </div>
      <div className="space-y-4 px-4">
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 6 }, (_, index) => (
              <Skeleton
                key={index}
                className="h-24 w-full flex items-center gap-x-4 dark:bg-accent/70 px-4 bg-muted-foreground/80"
              >
                <Skeleton className="size-6 bg-accent" />
                <Skeleton className="w-full h-10" />
              </Skeleton>
            ))}
          </div>
        ) : !todos?.length || todos?.length === 0 ? (
          <div className="text-center text-gray-500">
            No todos found. Please add some todos.
          </div>
        ) : (
          todos?.map((todo) => (
            <div
              key={todo.id}
              className="border border-gray-500 p-3 space-y-2 relative border-dashed rounded-2xl grid grid-cols-[10%_auto]"
            >
              <Checkbox className="place-self-center" />
              <h3 className="text-foreground !m-0">{todo.title}</h3>
            </div>
          ))
        )}

        {/* <span className="absolute top-10 right-2">
              <Button
                variant="destructive"
                onClick={() => dispatch(deleteTodo({ id: todo.id }))}
              >
                Delete
              </Button>

              <Button
                variant="outline"
                onClick={() => dispatch(deleteTodo({ id: todo.id }))}
              >
                Edit
              </Button>
            </span> */}
      </div>
    </section>
  );
}
