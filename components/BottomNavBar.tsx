import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { Home, Heart, Plus, Tv } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'expo-router';
export default function BottomNavBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const { colors, primary, isDark } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const currentRoute = state.routes[state.index];
  const shouldHideTabBar = currentRoute.name === '(shorts)';

  if (shouldHideTabBar) {
    return null;
  }

  const getIcon = (routeName: string, isFocused: boolean) => {
    const color = isFocused ? primary : colors.textSecondary;
    const size = 24;

    switch (routeName) {
      case '(home)':
        return <Home size={size} color={color} />;
      case '(matching)':
        return <Heart size={size} color={color} fill={isFocused ? color : 'none'} />;
      case '(shows)':
        return <Tv size={size} color={color} />;
      case '(profile)':
        return (
          <Image
            source={{ uri: user?.avatar || 'https://ui-avatars.com/api/?name=User&background=78706B&color=fff&size=200' }}
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              borderWidth: isFocused ? 2 : 0,
              borderColor: primary,
            }}
          />
        );
      default:
        return null;
    }
  };



  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingBottom: insets.bottom + 8,
      paddingTop: 12,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    blurContainer: {
      borderRadius: 100,
      overflow: 'hidden',
    },
    tabBarContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: Platform.OS === 'web' ? colors.inputBackground : 'transparent',
      borderRadius: 100,
      paddingVertical: 4,
      paddingHorizontal: 4,
    },
    tabButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    createButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const renderTabBar = () => (
    <View style={styles.tabBarContent}>
      {state.routes.filter((route: any) => ['(home)', '(matching)', '(shows)', '(profile)'].includes(route.name)).map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={styles.tabButton}
          >
            {getIcon(route.name, isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      {Platform.OS !== 'web' ? (
        <BlurView
          intensity={80}
          tint={isDark ? 'dark' : 'light'}
          style={styles.blurContainer}
        >
          {renderTabBar()}
        </BlurView>
      ) : (
        renderTabBar()
      )}
      
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => {
          if (pathname.includes('/shows')) {
            router.push('/upload-video');
          } else {
            router.push('/create-post');
          }
        }}
        accessibilityRole="button"
        accessibilityLabel={pathname.includes('/shows') ? 'Upload video' : 'Create a post'}
      >
        <Plus size={28} color={colors.background} />
      </TouchableOpacity>
    </View>
  );
}
