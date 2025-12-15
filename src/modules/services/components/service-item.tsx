import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Item, theme } from 'react-native-hooks';
import { Icon } from '@shared/components';
import { ServiceItem } from '../constants/services.constants';
import { HomeStackParamList } from '@navigation/constants/navigation.constants';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'Services'>;

export interface ServiceItemRowProps {
  item: ServiceItem;
}

export function ServiceItemRow({ item }: ServiceItemRowProps) {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('ServiceDetail', { serviceId: item.id });
  };

  return (
    <Item
      testID={`service-item-row-${item.id}`}
      title={item.title}
      iconLeft={
        <Icon name={item.icon} size={28} color={theme.colors.primary} />
      }
      iconRight={<Icon name="chevron-forward" size={24} color="#999" />}
      onPress={handlePress}
    />
  );
}
