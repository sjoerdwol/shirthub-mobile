import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from "react-native-reanimated";
import LoginScreen from "./login";
import RegisterScreen from "./register";

export default function AuthIndex() {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <View className="flex-1 justify-center items-center bg-dark-background-400 p-5">
      {mode === 'login'
        ? <Animated.View
          className='bg-dark-background-300 w-full rounded-2xl shadow-lg p-8'
          key='login'
          entering={SlideInLeft.duration(500)}
          exiting={SlideOutLeft.duration(500)}
        >
          <LoginScreen />
        </Animated.View>
        : <Animated.View
          className='bg-dark-background-300 w-full rounded-2xl shadow-lg p-8'
          key='register'
          entering={SlideInRight.duration(500)}
          exiting={SlideOutRight.duration(500)}
        >
          <RegisterScreen />
        </Animated.View>
      }
      {mode === 'login'
        ? <Animated.View
          className='justify-center mt-6'
          key='loginSwitch'
          entering={SlideInLeft.duration(500)}
          exiting={SlideOutLeft.duration(500)}
        >
          <TouchableOpacity onPress={() => setMode('register')}>
            <Text className="text-dark-primary text-base">No account yet? Sign up!</Text>
          </TouchableOpacity>
        </Animated.View>
        : <Animated.View
          className='justify-center mt-6'
          key='registerSwitch'
          entering={SlideInRight.duration(500)}
          exiting={SlideOutRight.duration(500)}
        >
          <TouchableOpacity onPress={() => setMode('login')}>
            <Text className="text-dark-primary text-base">Already have an account? Log in!</Text>
          </TouchableOpacity>
        </Animated.View>
      }
    </View>
  );
}