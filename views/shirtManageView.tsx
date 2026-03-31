import ShirtManageForm from "@/newComponents/forms/shirtManageForm";
import { Image, KeyboardAvoidingView, Platform, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function ShirtManageView({ data, mode, shirt }: { data: ReferenceData, mode: 'add' | 'edit', shirt: Shirt | null }) {
  return (
    <Animated.View
      className="flex-1 p-4 mt-2"
      entering={FadeIn.duration(500)}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View className="overflow-hidden h-72 w-full rounded-xl border border-dark-border">
          <Image
            source={require('../assets/images/exampleshirt.png')}
            className="w-full h-full object-cover"
          />
        </View>
        <ShirtManageForm data={data} mode={mode} shirt={shirt} />
      </KeyboardAvoidingView>
    </Animated.View>
  );
}