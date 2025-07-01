import AuthInput from '@/components/authentication/input';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="flex-1 justify-center items-center bg-dark-background-400 px-5">
      <Text className="text-dark-text text-4xl font-bold">Sign Up</Text>
      <View className='w-full justify-center items-center mb-4 mt-8'>
        <AuthInput
          onChangeText={setUsername}
          placeholder='Username'
          value={username}
        />
        <AuthInput
          keyboardType='email-address'
          onChangeText={setEmail}
          placeholder='Email'
          value={email}
        />
        <AuthInput
          onChangeText={setPassword}
          placeholder='Password'
          secureTextEntry
          value={password}
        />
      </View>
      <TouchableOpacity className="w-full bg-dark-accent rounded-lg py-3 mb-4" onPress={() => { }}>
        <Text className="text-center text-dark-text text-lg font-bold">Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-dark-primary text-base underline">Already have an account? Log in!</Text>
      </TouchableOpacity>
    </View>
  );
} 