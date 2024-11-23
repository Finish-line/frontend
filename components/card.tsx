import { useThemeColor } from '@/hooks/useThemeColor';
import { View, ViewProps } from 'react-native';

export default function Card(props: ViewProps) {
  const { colors } = useThemeColor();

  return (
    <View
      style={[
        {
          backgroundColor: colors.primary,
          borderRadius: 20,
          padding: 15,
        },
        props.style,
      ]}>
      {props.children}
    </View>
  );
}
