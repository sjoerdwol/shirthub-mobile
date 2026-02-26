import LoginView from "@/views/loginView";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from "react-native-reanimated";
import RegisterScreen from "./register";

export default function AuthIndex() {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <View className="flex-1 bg-vanillaCream">
      <View className="items-center pt-16 pb-12 px-6">
        <View className="w-20 h-20 bg-mutedOlive/30 rounded-2xl items-center justify-center mb-6 mt-16">
          <Ionicons name="football" color='#6C584C' size={48} />
        </View>
        <Text className="text-ashBrown text-4xl font-LexendBold leading-tight tracking-tight">ShirtHub</Text>
        <Text className="text-ashBrown/70 mt-2 font-semibold font-Lexend">Die ultimative Community der Trikotsammler!</Text>
      </View>
      {
        mode === 'login'
          ? <LoginView />
          : <Animated.View
            className='bg-dark-background-300 w-full rounded-2xl shadow-lg p-8'
            key='register'
            entering={SlideInRight.duration(500)}
            exiting={SlideOutRight.duration(500)}
          >
            <RegisterScreen />
          </Animated.View>
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
              <Text className="text-ashBrown/70 text-base font-Lexend">Noch keinen Account? <Text className="text-ashBrown text-base font-bold font-Lexend">Jetzt registrieren!</Text></Text>
            </TouchableOpacity>
          </Animated.View>
          : <Animated.View
            className='items-center'
            key='registerSwitch'
            entering={SlideInRight.duration(500)}
            exiting={SlideOutRight.duration(500)}
          >
            <TouchableOpacity onPress={() => setMode('login')}>
              <Text className="text-ashBrown/70 text-base font-Lexend">Bereits einen Account? <Text className="text-ashBrown text-base font-bold font-Lexend">Jetzt anmelden!</Text></Text>
            </TouchableOpacity>
          </Animated.View>
      }
    </View>
  );
}