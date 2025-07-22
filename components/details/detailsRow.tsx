import { PropsWithChildren } from "react";
import { View } from "react-native";

export default function DetailsRow({ children }: PropsWithChildren) {
  return (
    <View className="flex-row gap-x-4">
      {children}
    </View>
  );
}