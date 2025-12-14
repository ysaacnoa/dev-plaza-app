import React from 'react';
import { Text } from 'react-native';

// Mock component for Ionicons
const Ionicons = React.forwardRef(({ name, size = 12, color, style, ...props }, ref) => (
  <Text
    ref={ref}
    style={[
      {
        fontSize: size,
        color: color || 'black',
      },
      style,
    ]}
    {...props}
    testID={`icon-${name}`}
  >
    {name}
  </Text>
));

Ionicons.displayName = 'Ionicons';

export { Ionicons };
