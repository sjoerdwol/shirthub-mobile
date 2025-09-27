import AuthInput from '@/components/authentication/input';
import Button from '@/components/ui/button';
import { useAuth } from '@/contexts/authContext';
import { useState } from 'react';
import { Text, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, signIn } = useAuth();

  return (
    <View className='justify-center items-center'>
      <Text className="text-dark-text-400 text-4xl font-bold">Login</Text>
      <View className='w-full justify-center items-center mb-4 mt-8'>
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
      <Button loading={loading} onPress={() => signIn(email, password)}>Log In</Button>
    </View>
  );
} 