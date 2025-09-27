import AuthInput from '@/components/authentication/input';
import Button from '@/components/ui/button';
import { useAuth } from '@/contexts/authContext';
import { useState } from 'react';
import { Text, View } from 'react-native';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { loading, signUp } = useAuth();

  return (
    <View className="justify-center items-center">
      <Text className="text-dark-text-400 text-4xl font-bold">Sign Up</Text>
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
      <Button loading={loading} onPress={() => signUp(email, password, username)}>Register</Button>
    </View>
  );
} 