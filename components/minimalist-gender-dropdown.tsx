"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MinimalistGenderDropdown() {
  return (
    <Select>
      <SelectTrigger className="border-none shadow-none p-0 focus:ring-0 focus:ring-offset-0">
        <SelectValue
          placeholder="SELECT GENDER"
          className="text-muted-foreground"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="male">Male</SelectItem>
        <SelectItem value="female">Female</SelectItem>
        <SelectItem value="unisex">Unisex</SelectItem>
      </SelectContent>
    </Select>
  );
}
