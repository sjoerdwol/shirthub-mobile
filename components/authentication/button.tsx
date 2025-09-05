import { AuthButtonProps } from "@/types/authButtonProps";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export default function AuthButton({ children, loading, onPress }: AuthButtonProps) {
  return (
    <TouchableOpacity
      className="w-full bg-dark-accent rounded-lg py-3 mb-4"
      disabled={loading}
      onPress={loading ? undefined : onPress}
      testID='auth_button'
    >
      {loading ? (
        <ActivityIndicator color="#e0e5eb" size="small" />
      ) : (
        <Text className="text-center text-dark-text-400 text-lg font-bold">{children}</Text>
      )}
    </TouchableOpacity>
  );
}