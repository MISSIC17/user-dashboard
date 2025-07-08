"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setFilter } from "@/lib/features/todo/todo-slice";
import { AppDispatch } from "@/lib/store";
import { TFilterStatus } from "@/types/todos";
import { useDispatch } from "react-redux";
export function StatusFilter() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Select
      onValueChange={(value) => dispatch(setFilter(value as TFilterStatus))}
    >
      <SelectTrigger className="lg:w-[120px] border-foreground/70 text-foreground">
        <SelectValue
          placeholder="Status"
          className="!text-foreground dark:!text-white"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
      </SelectContent>
    </Select>
  );
}
