import { Stack } from 'expo-router';

export default function MessagesLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="messages" 
        options={{ 
          title: 'Messages',
        }} 
      />
      <Stack.Screen 
        name="[chatId]" 
        options={{ 
          title: '',
        }} 
      />
    </Stack>
  );
}