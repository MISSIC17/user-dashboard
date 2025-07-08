"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addTodo } from "@/lib/features/todo/todo-slice";
import { AppDispatch } from "@/lib/store";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
export function AddButton() {
  const [value, setValue] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const submitHandler = () => {
    if (value && value.length > 0) {
      dispatch(addTodo(value.trim()));
      toast.success("Todo added successfully!");
      setValue("");
    }
  };
  return (
    <span className="flex items-center gap-x-2 flex-1 lg:flex-auto">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitHandler();
            e.preventDefault();
          }
        }}
        id="todo-input"
        placeholder="Add a new todo..."
        className="lg:w-64 w-48 lg:text-base text-sm md:py-1 py-0.5 max-w-64 flex-1 text-foreground dark:placeholder:!text-foreground/70 border-foreground"
      />
      <Button
        onClick={submitHandler}
        className="font-bold gap-x-1  bg-blue-600 text-background dark:text-foreground hover:bg-blue-700 cursor-pointer"
        disabled={!value || value.length === 0}
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </span>
  );
}
