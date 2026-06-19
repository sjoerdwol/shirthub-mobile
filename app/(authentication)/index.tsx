import LoginView from "@/views/loginView";
import RegisterView from "@/views/registerView";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from "react-native-reanimated";

export default function AuthIndex() {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <View className="flex-1 bg-dark-background">
      <View className="items-center pt-16 pb-12 px-6">
        <View className="w-20 h-20 bg-dark-secondaryBackground rounded-2xl items-center justify-center mb-6 mt-16">
          <Ionicons name="football" color='rgb(255, 255, 255, 0.7)' size={48} />
        </View>
        <Text className="text-white/80 text-4xl font-LexendBold leading-tight tracking-tight">ShirtHub</Text>
        <Text className="text-white/70 mt-2 font-LexendSemiBold">Die ultimative Community der Trikotsammler!</Text>
      </View>
      {
        mode === 'login'
          ? <LoginView />
          : <RegisterView />
      }
      {
        mode === 'login'
          ? <Animated.View
            className='items-center'
            key='loginSwitch'
            entering={SlideInLeft.duration(500)}
            exiting={SlideOutLeft.duration(500)}
          >
            <TouchableOpacity onPress={() => setMode('register')}>
              <Text className="text-white/70 text-base font-Lexend">Noch keinen Account? <Text className="text-dark-highlight text-base font-LexendBold">Jetzt registrieren!</Text></Text>
            </TouchableOpacity>
          </Animated.View>
          : <Animated.View
            className='items-center'
            key='registerSwitch'
            entering={SlideInRight.duration(500)}
            exiting={SlideOutRight.duration(500)}
          >
            <TouchableOpacity onPress={() => setMode('login')}>
              <Text className="text-white/70 text-base font-Lexend">Bereits einen Account? <Text className="text-dark-highlight text-base font-LexendBold">Jetzt anmelden!</Text></Text>
            </TouchableOpacity>
          </Animated.View>
      }
    </View>
  );
}