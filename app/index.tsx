import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/(home)/home" />;
  }
  
  return <Redirect href="/login" />;
}