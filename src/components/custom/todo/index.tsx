"use client";

import {
  selectFilteredTodos,
  toggleStatus,
} from "@/lib/features/todo/todo-slice";

import { AddButton } from "@/components/custom/todo/add-button";
import { StatusFilter } from "@/components/custom/todo/status-filter";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useGetTodosQuery } from "@/lib/services/todos";
import { AppDispatch } from "@/lib/store";
import { cn } from "@/lib/utils";
import { TTodo } from "@/types/todos";
import { ListCheckIcon } from "lucide-react";
import { useDispatch } from "react-redux";

export function TodoComponent() {
  const { isLoading } = useGetTodosQuery(15);
  const todos = useAppSelector(selectFilteredTodos);
  return (
    <section
      id="todo"
      className="relative table-scrollbar prose rounded-lg md:rounded-3xl border-4 border-red-400 dark:border-red-900 h-[calc(100dvh-80px-var(--header-height))] overflow-auto mx-auto mt-5"
    >
      {/* //* Header */}
      <div className="bg-background z-10 px-2 py-2 md:px-4 md:py-2 sticky md:flex-row flex-col top-0 left-0 w-full h-30 max-[400px]:h-40 md:h-20 flex gap-y-4 lg:items-center md:justify-between">
        <span className="flex items-center gap-x-2 md:justify-start justify-center">
          <span className="p-1 rounded-md bg-red-100 text-red-900 dark:bg-red-800 dark:text-red-50">
            <ListCheckIcon />
          </span>
          <h2 className="prose-h2 !m-0 text-foreground text-lg lg:text-2xl">
            TASKS
          </h2>
        </span>
        <span className="flex items-center gap-2 flex-wrap w-full md:w-fit">
          <StatusFilter />
          <AddButton />
        </span>
      </div>
      <div className="space-y-4 px-4 py-4">
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 10 }, (_, index) => (
              <Skeleton
                key={index}
                className="h-14 w-full flex items-center gap-x-4 dark:bg-accent/70 px-4 bg-muted-foreground/20"
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
          todos
            .sort((a, b) => b.id - a.id)
            ?.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
    </section>
  );
}

function TodoItem({ todo }: { todo: TTodo }) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Label
      key={todo.id}
      htmlFor={`todo-${todo.id}`}
      className={cn(
        "border border-gray-500 p-1.5 md:p-3 relative rounded-sm md:rounded-xl grid grid-cols-[10%_auto] hover:bg-foreground/5 cursor-pointer transition-colors ease-in-out",
        todo.completed && "opacity-50",
      )}
    >
      <Checkbox
        id={`todo-${todo.id}`}
        className="place-self-center border-muted-foreground cursor-pointer"
        checked={todo.completed}
        onCheckedChange={() => {
          dispatch(toggleStatus({ id: todo.id }));
        }}
      />
      <h3
        className={cn(
          "text-foreground !m-0 font-grotesk font-medium text-sm md:text-lg",
          todo.completed && "line-through",
        )}
      >
        {todo.title}
      </h3>
    </Label>
  );
}
