import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable } from "react-native";

export default function IconButton({ deleteButton, icon, onPress }: { deleteButton?: boolean, icon: React.ComponentProps<typeof FontAwesome6>["name"], onPress: () => void }) {
  return (
    <>
      {
        deleteButton
          ? <Pressable
            className="bg-red-600 rounded-full w-[4.5rem] h-[4.5rem] items-center justify-center"
            onPress={onPress}
          >
            <FontAwesome6 name={icon} size={28} color='#fff' />
          </Pressable>
          : <Pressable
            className="bg-mutedOlive rounded-full w-[4.5rem] h-[4.5rem] items-center justify-center"
            onPress={onPress}
          >
            <FontAwesome6 name={icon} size={28} color='#fff' />
          </Pressable>
      }
    </>
  );
}