import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default function TabBarIcon({ name, color, size }: React.ComponentProps<typeof Ionicons>) {
  return (
    <Ionicons
      name={name}
      color={color}
      size={size}
    />
  );
}
