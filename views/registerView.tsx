import PrimaryButton from "@/components/buttons/primaryButton";
import SingleIconInput from "@/components/inputs/singleIconInput";
import SingleIconInputWithButton from "@/components/inputs/singleIconInputWithButton";
import { useAuth } from "@/contexts/authContext";
import { useState } from "react";
import { Text, View } from "react-native";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";

export default function RegisterView() {
  const [securePassword, setSecurePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, signUp } = useAuth();

  return (
    <Animated.View
      className='px-6 w-full'
      entering={SlideInRight.duration(500)}
      exiting={SlideOutRight.duration(500)}
    >
      <Text className="text-white/80 text-2xl font-LexendBold pb-4">Trete uns bei</Text>
      <View className="w-full px-1 mb-5">
        <Text className="text-white/50 text-base font-semibold font-Lexend pb-2">Email Adresse</Text>
        <SingleIconInput
          firstIcon="mail"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="name@beispiel.de"
          value={email}
        />
      </View>
      <View className="w-full px-1">
        <View className="w-full flex-row justify-between items-center pb-2">
          <Text className="text-white/50 text-base font-semibold font-Lexend">Passwort</Text>
        </View>
        <SingleIconInputWithButton
          buttonState={securePassword}
          firstIcon="lock-closed"
          keyboardType="default"
          onChangeText={setPassword}
          placeholder="Lege dein Passwort fest ..."
          secureTextEntry={securePassword}
          secondIcon={securePassword ? 'eye' : 'eye-off'}
          setButtonState={setSecurePassword}
          value={password}
        />
      </View>
      <View className="my-10 px-1">
        <PrimaryButton text="Registrieren" onPress={() => signUp(email, password)} loading={loading} />
      </View>
      <View className="mb-10 mx-1 h-px bg-dark-border" />
    </Animated.View>
  );
}