"use client";
import * as React from "react";

import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Select value={theme || "dark"} onValueChange={(value) => setTheme(value)}>
      <SelectTrigger className="w-[100px] lg:w-[180px] border-foreground/70 text-foreground">
        <SelectValue
          placeholder="Select theme"
          className="!text-foreground dark:!text-white"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
