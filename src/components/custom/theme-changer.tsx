"use client";
import * as React from "react";

import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export const ThemeChanger = () => {
  const { setTheme } = useTheme();

  return (
    <Select onValueChange={(value) => setTheme(value)}>
      <SelectTrigger className="w-[100px] lg:w-[180px] border-foreground/70 text-foreground dark:text-foreground">
        <SelectValue
          placeholder="Select theme"
          className="!text-foreground/80 dark:!text-white/80"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
      </SelectContent>
    </Select>
  );
};
