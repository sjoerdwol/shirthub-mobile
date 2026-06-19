import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { Pressable } from "react-native";

export default function IconButton({ deleteButton, icon, onPress }: { deleteButton?: boolean, icon: Extract<React.ComponentProps<typeof FontAwesome6>, { iconStyle: "solid" }>["name"], onPress: () => void }) {
  return (
    <>
      {
        deleteButton
          ? <Pressable
            className="bg-red-600 rounded-full w-14 h-14 items-center justify-center"
            onPress={onPress}
            testID="icon_button_delete"
          >
            <FontAwesome6 iconStyle="solid" name={icon} size={24} color='#fff' />
          </Pressable>
          : <Pressable
            className="bg-dark-highlight rounded-full w-14 h-14 items-center justify-center"
            onPress={onPress}
            testID="icon_button_normal"
          >
            <FontAwesome6 iconStyle="solid" name={icon} size={24} color='#fff' />
          </Pressable>
      }
    </>
  );
}