import Button from "@/components/ui/button";
import { useAuth } from "@/contexts/authContext";
import { Text, View } from "react-native";

export default function Profile() {
  const { loading, signOut } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className=''>Profile Screen</Text>
      <Button loading={loading} onPress={() => signOut()}>Logout</Button>
    </View>
  );
}
