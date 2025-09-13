import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

type IconName = keyof typeof MaterialIcons.glyphMap;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: any;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = colors.darkGray,
  style 
}) => {
  return (
    <MaterialIcons 
      name={name} 
      size={size} 
      color={color}
      style={style}
    />
  );
};