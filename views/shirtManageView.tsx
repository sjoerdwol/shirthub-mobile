import ShirtManageForm from "@/components/forms/shirtManageForm";
import ShirtImage from "@/components/ui/shirtImage";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
        >
          <ShirtImage
            imageSrc={require('../assets/images/exampleshirt.png')}
            type="detailAndManage"
          />
          <ShirtManageForm data={data} mode={mode} shirt={shirt} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Animated.View>
  );
}