import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

export default function Index() {
  const { isAuthenticated } = useAuth();
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    setIsReady(true);
  }, []);
  
  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
  
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/(home)/home" />;
  }
  
  return <Redirect href="/login" />;
}